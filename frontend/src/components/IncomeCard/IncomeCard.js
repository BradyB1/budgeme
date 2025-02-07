import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import React, { useState } from 'react';
import styled from 'styled-components';

const IncomeCard = ({ incomes, onDeleteIncome, onEditIncome }) => {

    const [editingIncomeId, setEditingIncomeId] = useState(null);
    const [editValues, setEditValues] = useState({});

    const handleEditClick = (income) => {
        setEditingIncomeId(income._id);
        setEditValues(income);
    };

    const handleSaveClick = () => {
        onEditIncome(editingIncomeId, editValues);
        setEditingIncomeId(null); // Exit edit mode after saving
    };

    const handleChange = (e) => {
        setEditValues(prev => ({
            ...prev,
            [e.target.name]: e.target.name === "date" ? new Date(e.target.value).toISOString() : e.target.value
        }));
    };
    

    return (
        <IncomeCardStyled>
            <h2>Current Incomes</h2>
            {incomes.length === 0 ? <p>No income found.</p> : (
                <div id="income-list">
                    {incomes.map((income) => (
                        <div key={income._id} id="income">
                            <div className="left-container">
                                {editingIncomeId === income._id ? (
                                    <>
                                        <input type="text" name="title" value={editValues.title} onChange={handleChange} className="edit-input" />
                                        <input type="number" name="amount" value={editValues.amount} onChange={handleChange} className="edit-input" />
                                        <input type="date" name="date" value={new Date(editValues.date).toISOString().split('T')[0]} onChange={handleChange} className="edit-input"/>
                                        <input type="text" name="category" value={editValues.category} onChange={handleChange} className="edit-input" />
                                    </>
                                ) : (
                                    <>
                                        <p><strong>{income.title}</strong></p>
                                        <p>Amount: ${income.amount}</p>
                                        <p><i>{new Date(income.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</i></p>
                                        </>
                                )}
                            </div>

                            <div className="right-container">
                                {editingIncomeId === income._id ? (
                                    <IconButton onClick={handleSaveClick}>
                                        <SaveIcon fontSize="inherit" />
                                    </IconButton>
                                ) : (
                                    <IconButton onClick={() => handleEditClick(income)}>
                                        <EditIcon fontSize="inherit" />
                                    </IconButton>
                                )}
                                <IconButton onClick={() => onDeleteIncome(income._id)}>
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </IncomeCardStyled>
    );
};

const IncomeCardStyled = styled.div`
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px; 
    max-width: 100%;
    margin: auto;

    #income {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1rem .5rem;
        margin: .5rem .15rem;
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
    }
    
    .left-container {
        display: flex;
        flex-direction: column;
        width: 75%;
    }

    .right-container {
        display: flex;
        width: 25%;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;
    }

    .edit-input {
        width: 100%;
        padding: 5px;
        margin: 3px 0;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1rem;
    }

    #income-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    @media (min-width: 600px) {
        #income-list {
            display: grid;
            grid-template-columns: repeat(3, minmax(150px, 1fr)); 
            gap: 10px;
        }
    }
`;

export default IncomeCard;
