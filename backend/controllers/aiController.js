const Income = require("../models/IncomeModel");
const Expense = require("../models/ExpenseModel");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Google AI API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.getFinancialTips = async (req, res) => {
    try {
        const { userId } = req.query;

        // Fetch user's income & expenses from MongoDB
        const incomes = await Income.find({ userId }).lean();
        const expenses = await Expense.find({ userId }).lean();

        // Categorize spending
        const expenseCategories = expenses.reduce((acc, { title, amount }) => {
            if (!acc[title]) acc[title] = 0;
            acc[title] += parseFloat(amount);
            return acc;
        }, {});

        // AI Prompt
        const prompt = `
            The user has the following spending data:
            ${JSON.stringify(expenseCategories, null, 2)}

            Provide 3 personalized financial tips based on their spending habits.
        `;

        // Call Google Generative AI API
        const result = await model.generateContent(prompt);
        const aiResponse = await result.response;
        const text = aiResponse.text();

        res.json({ tips: text.split("\n") }); // Convert AI response into list
    } catch (error) {
        console.error("Error fetching AI tips:", error);
        res.status(500).json({ error: "Failed to generate financial tips" });
    }
};
