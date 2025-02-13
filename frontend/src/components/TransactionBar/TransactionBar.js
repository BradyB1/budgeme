import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TransactionBar = ({ triggerRefresh, userId }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (userId) {  
            fetchTransactions();
        }
    }, [userId]);  

    const fetchTransactions = async () => {
        try {
            console.log("Fetching transactions for userId:", userId);
    
            // Fetch incomes & expenses, handle 404 errors gracefully
            const [incomeRes, expenseRes] = await Promise.allSettled([
                fetch(`http://localhost:3000/api/v1/get-incomes/${userId}`),
                fetch(`http://localhost:3000/api/v1/get-expenses/${userId}`)
            ]);
    
            // Handle failed fetches
            const incomes = incomeRes.status === "fulfilled" && incomeRes.value.ok
                ? await incomeRes.value.json()
                : [];
    
            const expenses = expenseRes.status === "fulfilled" && expenseRes.value.ok
                ? await expenseRes.value.json()
                : [];
    
            console.log("Fetched incomes:", incomes);
            console.log("Fetched expenses:", expenses);
    
            // Merge transactions & handle missing dates
            const allTransactions = [
                ...incomes.map(income => ({
                    ...income,
                    type: 'income',
                    date: income.date ? new Date(income.date) : new Date(0) // Default date if missing
                })),
                ...expenses.map(expense => ({
                    ...expense,
                    type: 'expense',
                    date: expense.date ? new Date(expense.date) : new Date(0)
                }))
            ];
    
            console.log("Merged transactions before sorting:", allTransactions);
    
            // Sort by date (newest first) and limit to 10
            const sortedTransactions = allTransactions
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 10);
    
            setTransactions(sortedTransactions);
        } catch (error) {
            console.log('Error fetching transactions:', error);
            setTransactions([]); // Ensure UI updates even if there's an error
        }
    };
    


    const handleDeleteTransaction = async (transaction) => {
        try {
            const url = transaction.type === 'income'
                ? `http://localhost:3000/api/v1/delete-income/${transaction._id}`
                : `http://localhost:3000/api/v1/delete-expense/${transaction._id}`;

            await fetch(url, { method: 'DELETE' });

            // Remove from state immediately for instant UI update
            setTransactions(prev => prev.filter((t) => t._id !== transaction._id));

            triggerRefresh();  
        } catch (error) {
            console.log('Error deleting transaction:', error);
        }
    };

    return (
        <TransactionBarStyled>
            <div className="transactions-container">
                <h2>Recent Transactions</h2>
                <div className="transactions-list">
                    {transactions.length === 0 ? <p>No transactions found.</p> : (
                        transactions.map(transaction => (
                            <div key={transaction._id} className={`transaction-item ${transaction.type}`}>
                                <span>{transaction.title} - ${transaction.amount}</span>
                                <button onClick={() => handleDeleteTransaction(transaction)}>❌</button>
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
        border-right: 1px solid black;
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


      @media only screen and (min-device-width: 480px){
      width: 100%;
        .transactions-container{
            
        }

     }
`;

export default TransactionBar;
