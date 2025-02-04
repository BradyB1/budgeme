import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TransactionBar = () => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchIncomes();
        fetchExpenses();
    }, []);

    const fetchIncomes = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/get-incomes');
            if (!response.ok) throw new Error('Failed to fetch income data');
            const data = await response.json();
            setIncomes(data.map(income => ({ ...income, type: 'income' }))); // Add type for distinction
        } catch (error) {
            console.log('Error fetching incomes:', error);
        }
    };

    const fetchExpenses = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/get-expenses');
            if (!response.ok) throw new Error('Failed to fetch expense data');
            const data = await response.json();
            setExpenses(data.map(expense => ({ ...expense, type: 'expense' }))); // Add type for distinction
        } catch (error) {
            console.log('Error fetching expenses:', error);
        }
    };

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
        } catch (error) {
            console.log('Error deleting transaction:', error);
        }
    };

    // Take only 5 recent from each category, merge & sort by date
    const recentTransactions = [...incomes.slice(0, 5), ...expenses.slice(0, 5)]
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <TransactionBarStyled>
            <div className="transactions-container">
                <h2>Recent Transactions</h2>
                <div className="transactions-list">
                    {recentTransactions.map((transaction) => (
                        <div
                            key={transaction._id}
                            className={`transaction-item ${transaction.type}`}
                        >
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
        max-height: 100vh; /* Instead of height: 100vh */
        overflow-y: auto; /* Only scroll if content overflows */
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
    }

    .expense {
        background: #ffebee; /* Light red */
    }

    button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1rem;
    }
`;


export default TransactionBar;
