import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import React, { useState } from 'react';
import styled from 'styled-components';

const ExpenseCard = ({ expenses, onDeleteExpense, onEditExpense }) => {  
    const [editingExpenseId, setEditingExpenseId] = useState(null);
    const [editValues, setEditValues] = useState({});

    const handleEditClick = (expense) => {
        setEditingExpenseId(expense._id);
        setEditValues(expense);
    };

    const handleSaveClick = () => {
        onEditExpense(editingExpenseId, editValues);
        setEditingExpenseId(null);
    };

    const handleChange = (e) => {
        setEditValues(prev => ({
            ...prev,
            [e.target.name]: e.target.name === "date" ? new Date(e.target.value).toISOString() : e.target.value
        }));
    };

    return (
        <ExpenseCardStyled>
            <div className="current-expenses">
                <h2>Current Expenses</h2>
                {expenses.length === 0 ? (
                    <p>No expense found.</p>
                ) : (
                    <div id="expense-list">
                        {expenses.map((expense) => (
                            <div key={expense._id} id="expense">
                                <div className="left-container">
                                    {editingExpenseId === expense._id ? (
                                        <>
                                            <input type="text" name="title" value={editValues.title} onChange={handleChange} className="edit-input" />
                                            <input type="number" name="amount" value={editValues.amount} onChange={handleChange} className="edit-input" />
                                            <input type="text" name="category" value={editValues.category} onChange={handleChange} className="edit-input" />
                                            <input type="date" name="date" value={editValues.date.split('T')[0]} onChange={handleChange} className="edit-input" />
                                            
                                        </>
                                    ) : (
                                        <>
                                            <p><strong>{expense.title}</strong></p>
                                            <p>Amount: ${expense.amount}</p>
                                            <p>Category: {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}</p>
                                            <p><i>{new Date(expense.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</i></p>                                        </>
                                    )}
                                </div>

                                <div className="right-container">
                                    {editingExpenseId === expense._id ? (
                                        <IconButton onClick={handleSaveClick}>
                                            <SaveIcon fontSize="inherit" />
                                        </IconButton>
                                    ) : (
                                        <IconButton onClick={() => handleEditClick(expense)}>
                                            <EditIcon fontSize="inherit" />
                                        </IconButton>
                                    )}
                                    <IconButton onClick={() => onDeleteExpense(expense._id)}>
                                        <DeleteIcon fontSize="inherit" />
                                    </IconButton>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </ExpenseCardStyled>
    );
};

const ExpenseCardStyled = styled.div`
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px; 
    max-width: 100%;
    margin: auto;

    #expense {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1rem .5rem;
        margin: .5rem .15rem;
        display:flex;
        width:100%;
        justify-content: space-between;
        align-items: center;
    }
    
    .left-container{
        display: flex;
        width: 75%;
        flex-direction: column;
    }
    .right-container{
        display: flex;
        width: 25%;
        justify-content: flex-end;
        align-items: center;
    }
 .edit-input {
        width: 100%;
        padding: 5px;
        margin: 3px 0;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1rem;
    }
    #expense-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    @media (min-width: 600px) {
        #expense-list {
            display: grid;
            grid-template-columns: repeat(3, minmax(150px, 1fr)); 
            gap: 10px;
        }
    }

    
`

export default ExpenseCard;
