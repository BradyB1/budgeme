import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ExpenseForm from '../Form/ExpenseForm'
import ExpenseCard from '../ExpenseCard/ExpenseCard'

const Expense = ({ userId }) => {
    const [expenses, setExpenses] = useState([])

    // Fetch incomes when component mounts
    useEffect(() => {
        if(userId){
        fetchExpenses()
    }
    }, [userId])

    // Function to fetch incomes
    const fetchExpenses = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/get-expenses/${userId}`)
            if (!response.ok) {
                throw new Error("Failed to fetch income data")
            }
            const data = await response.json();
            setExpenses(data);
        } catch (error) {
            console.log('Error fetching expenses:', error)
        }
    }

    // Function to add new income to the list dynamically
    const handleNewExpense = async (newExpense) => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/add-expense', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...newExpense, userId}),
            });

            const responseData = await response.json()
            console.log("Response Received:", responseData)

            if (!response.ok) {
                throw new Error(responseData.message || "Failed to add Expense");
            }

            // If successful, refetch expense
            fetchExpenses();
        } catch (error) {
            console.log('Error adding expense:', error);
        }
    }


    const handleDeleteExpense = async (expenseId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/delete-expense/${expenseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error("Failed to delete expense");
            }
    
            // Only update state using setExpenses inside the component
            setExpenses((prevExpenses) => prevExpenses.filter(expense => expense._id !== expenseId));
    
        } catch (error) {
            console.log('Error deleting expense:', error);
        }
    };

    const handleEditExpense = async (expenseId, updatedExpense) => {
        try {
            const correctedExpense ={
                ...updatedExpense,
                date: new Date(updatedExpense.date).toISOString().split("T")[0] + "T00:00:00.000Z"
            }

            const response = await fetch(`http://localhost:3000/api/v1/update-expense/${expenseId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(correctedExpense)
            })

            if(!response.ok) { 
                throw new Error("Failed to update Expense");
            }

            const updatedExpenseData = await response.json()

            setExpenses(prevExpenses =>
                prevExpenses.map(expense =>
                    expense._id === expenseId ? updatedExpenseData.expense : expense
                )
            )
        } catch (error) {
            console.log("Error updating income:", error)
        }
    }
    

    return (
        <ExpenseStyled>
            <ExpenseForm onNewExpense={handleNewExpense} />
            <ExpenseCard expenses={expenses} onDeleteExpense={handleDeleteExpense} onEditExpense={handleEditExpense}/>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div``

export default Expense
