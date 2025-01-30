import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

import React from 'react'
import styled from 'styled-components'

const ExpenseCard = ({ expenses }) => {  // Receive incomes as a prop
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
                                <p><strong>{expense.title} </strong></p>
                                <p>Amount: ${expense.amount}</p>
                                <p><i>{new Date(expense.date).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })}</i></p>
                                </div>
                                <div className="right-container">
                                <IconButton aria-label="delete" size="medium">
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </ExpenseCardStyled>
    )
}

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
    
    .left-containter{
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
export default ExpenseCard
