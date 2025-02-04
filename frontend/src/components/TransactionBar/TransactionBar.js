import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TransactionBar = ({ triggerRefresh }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchIncomes();
        fetchExpenses();
    }, []);

    // Fetch last 5 recent incomes
    const fetchIncomes = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/get-incomes');
            if (!response.ok) throw new Error('Failed to fetch income data');
            const data = await response.json();

            // Sort by date & add type
            const sortedIncomes = data
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5)
                .map(income => ({ ...income, type: 'income' })); // 🔥 Add type back

            setIncomes(sortedIncomes);
        } catch (error) {
            console.log('Error fetching incomes:', error);
        }
    };

    // Fetch last 5 recent expenses
    const fetchExpenses = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/get-expenses');
            if (!response.ok) throw new Error('Failed to fetch expense data');
            const data = await response.json();

            // Sort by date & add type
            const sortedExpenses = data
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5)
                .map(expense => ({ ...expense, type: 'expense' })); // 🔥 Add type back

            setExpenses(sortedExpenses);
        } catch (error) {
            console.log('Error fetching expenses:', error);
        }
    };

    // Delete a transaction and trigger re-fetch
    const handleDeleteTransaction = async (transaction) => {
        try {
            const url = transaction.type === 'income'
                ? `http://localhost:3000/api/v1/delete-income/${transaction._id}`
                : `http://localhost:3000/api/v1/delete-expense/${transaction._id}`;

            await fetch(url, { method: 'DELETE' });

            if (transaction.type === 'income') {
                setIncomes((prev) => prev.filter((inc) => inc._id !== transaction._id));
            } else {
                setExpenses((prev) => prev.filter((exp) => exp._id !== transaction._id));
            }

            triggerRefresh(); // 🔥 Notify Dashboard to refresh Networth component
            fetchIncomes();  // Re-fetch after deletion
            fetchExpenses();
        } catch (error) {
            console.log('Error deleting transaction:', error);
        }
    };

    return (
        <TransactionBarStyled>
            <div className="transactions-container">
                <h2>Recent Transactions</h2>
                <div className="transactions-list">
                    {[...incomes, ...expenses].map((transaction) => (
                        <div key={transaction._id} className={`transaction-item ${transaction.type}`}>
                            <span>{transaction.title} - ${transaction.amount}</span>
                            <button onClick={() => handleDeleteTransaction(transaction)}>❌</button>
                        </div>
                    ))}
                </div>
            </div>
        </TransactionBarStyled>
    );
};

const TransactionBarStyled = styled.div`
    .transactions-container {
        display: flex;
        flex-direction: column;
        width: 20%;
        padding: 1rem;
        border-left: 1px solid black;
        background: #f9f9f9;
        max-height: 100vh;
        overflow-y: auto;
    }

    .transactions-list {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .transaction-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        border-radius: 5px;
        font-weight: bold;
    }

    .income {
        background: #e0f7fa; /* Light blue */
        color: #00796b; /* Dark green */
    }

    .expense {
        background: #ffebee; /* Light red */
        color: #c62828; /* Dark red */
    }

    button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1rem;
    }
`;

export default TransactionBar;


