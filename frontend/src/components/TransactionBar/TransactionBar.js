import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DeleteIcon from '@mui/icons-material/Delete';
const TransactionBar = ({ triggerRefresh, userId }) => {
    const [transactions, setTransactions] = useState({}); // Store transactions grouped by date

    useEffect(() => {
        if (userId) {
            fetchTransactions();
        }
    }, [userId]);

    const fetchTransactions = async () => {
        try {
            // Fetch incomes & expenses, handle 404 errors gracefully
            const [incomeRes, expenseRes] = await Promise.allSettled([
                fetch(`https://budgeme.onrender.com/api/v1/get-incomes/${userId}`),
                fetch(`https://budgeme.onrender.com/api/v1/get-expenses/${userId}`)
            ]);

            // Handle failed fetches
            const incomes = incomeRes.status === "fulfilled" && incomeRes.value.ok
                ? await incomeRes.value.json()
                : [];

            const expenses = expenseRes.status === "fulfilled" && expenseRes.value.ok
                ? await expenseRes.value.json()
                : [];

            // Merge transactions & format dates
            const allTransactions = [
                ...incomes.map(income => ({
                    ...income,
                    type: "income",
                    date: income.date ? new Date(income.date) : new Date(0) // Default date if missing
                })),
                ...expenses.map(expense => ({
                    ...expense,
                    type: "expense",
                    date: expense.date ? new Date(expense.date) : new Date(0)
                }))
            ];

            console.log("Merged transactions before sorting:", allTransactions);

            // Sort transactions by date (newest first)
            allTransactions.sort((a, b) => b.date - a.date);

            // Group transactions by date
            const groupedTransactions = allTransactions.reduce((acc, transaction) => {
                const formattedDate = transaction.date.toISOString().split("T")[0]; // YYYY-MM-DD
                if (!acc[formattedDate]) {
                    acc[formattedDate] = [];
                }
                acc[formattedDate].push(transaction);
                return acc;
            }, {});

            setTransactions(groupedTransactions);
        } catch (error) {
            console.log("Error fetching transactions:", error);
            setTransactions({});
        }
    };

    const handleDeleteTransaction = async (transaction) => {
        try {
            const url =
                transaction.type === "income"
                    ? `https://budgeme.onrender.com/api/v1/delete-income/${transaction._id}`
                    : `https://budgeme.onrender.com/api/v1/delete-expense/${transaction._id}`;

            await fetch(url, { method: "DELETE" });

            // Update state immediately
            setTransactions((prev) => {
                const updatedTransactions = { ...prev };
                const formattedDate = transaction.date.toISOString().split("T")[0];

                updatedTransactions[formattedDate] = updatedTransactions[formattedDate].filter(
                    (t) => t._id !== transaction._id
                );

                // Remove empty date group
                if (updatedTransactions[formattedDate].length === 0) {
                    delete updatedTransactions[formattedDate];
                }

                return updatedTransactions;
            });

            triggerRefresh();
        } catch (error) {
            console.log("Error deleting transaction:", error);
        }
    };

    return (
        <TransactionBarStyled>
            <div className="transactions-container">
                <h2>Recent Transactions</h2>
                <div className="transactions-list">
                    {Object.keys(transactions).length === 0 ? (
                        <p>No transactions found.</p>
                    ) : (
                        Object.keys(transactions)
                            .sort((a, b) => new Date(b) - new Date(a)) // Sort dates in descending order
                            .map((date) => (
                                <div key={date} className="transaction-date-group">
                                    <h3>{date}</h3>
                                    {transactions[date].map((transaction) => (
                                        <div key={transaction._id} className={`transaction-item ${transaction.type}`}>
                                            <div className="transaction-details">
                                                <span className="transaction-title">{transaction.title} - ${transaction.amount}</span>
                                                
                                                <span className="transaction-category">{transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}</span>
                                            </div>
                                            
                                            <button onClick={() => handleDeleteTransaction(transaction)}><DeleteIcon /></button>
                                        </div>
                                    ))}

                                </div>
                            ))
                    )}
                </div>
            </div>
        </TransactionBarStyled>
    );
};

const TransactionBarStyled = styled.div`
    .transactions-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 1rem;
        text-align: center;
        
        background: #f9f9f9;
        max-height: 100vh;
        overflow-y: auto;
    }

    .transactions-list {
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 0.95rem;
        display: flex;
        flex-direction: column;
        
        background-color: #f4f4f4;
    }

    .transaction-date-group {
        background: #f7f7f7;
        padding: 1rem;
        
    }

    .transaction-title{ 
        text-align: left;
    }
    .transaction-category{
        text-align:left;       
        opacity: .8; 
    }

    .transaction-date-group h3 {
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
        color: #333;
        text-align: left;
        margin-left: .5rem;
    }

    .transaction-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        border-radius: 5px;
        font-weight: bold;
        gap: 1rem;
    }

    .transaction-details{ 
        display: flex;
        flex-direction: column;
    }

    
    .income {
        background: #e0f7fa;
        color: #00796b;
    }

    .expense {
        background: #ffebee;
        color: #c62828;
    }

    button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1rem;
    }

    @media only screen and (min-device-width: 480px) {
        width: 100%;
    }
`;

export default TransactionBar;
