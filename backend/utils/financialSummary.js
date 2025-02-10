const Income = require("../models/IncomeModel");
const Expense = require("../models/ExpenseModel");
const mongoose = require("mongoose");

//Get user's financial summary for AI
async function getFinancialSummary(userId) {
    try {
        // Validate userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid user ID format");
        }

        //Get date range (Last 30 days)
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        //Fetch income & expenses for the last month
        const incomes = await Income.find({ userId, date: { $gte: lastMonth } });
        const expenses = await Expense.find({ userId, date: { $gte: lastMonth } });

        //Calculate Total Income & Expenses
        const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
        const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

        //Calculate Savings Rate
        const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

        //Identify Biggest Expense Category
        const categoryTotals = {};
        expenses.forEach(exp => {
            categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
        });
        const biggestExpenseCategory = Object.keys(categoryTotals).reduce((a, b) => 
            categoryTotals[a] > categoryTotals[b] ? a : b, 
            Object.keys(categoryTotals)[0]
        );

        //detect Spending Anomalies (e.g., Sudden Increase in Expenses)
        let spendingAnomaly = "No major spending changes detected.";
        if (totalExpenses > totalIncome * 0.9) { // If spending is 90%+ of income
            spendingAnomaly = "Warning: Your expenses are nearly equal to your income!";
        } else if (totalExpenses > totalIncome * 1.2) { // If expenses exceed income
            spendingAnomaly = "You spent more than you earned last month! Consider cutting unnecessary costs.";
        }

        //Format summary for AI
        return {
            summary: `Financial Summary:
- Total Income: $${totalIncome}
- Total Expenses: $${totalExpenses}
- Savings Rate: ${savingsRate.toFixed(2)}%
- Biggest Expense Category: ${biggestExpenseCategory || "N/A"}
- Spending Anomaly: ${spendingAnomaly}`,

            rawData: {
                totalIncome,
                totalExpenses,
                savingsRate,
                biggestExpenseCategory,
                spendingAnomaly
            }
        };
    } catch (error) {
        console.error("Error generating financial summary:", error);
        return { summary: "Error generating financial summary.", rawData: {} };
    }
}

module.exports = { getFinancialSummary };
