import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ExpenseForm from '../Form/ExpenseForm'
import ExpenseCard from '../ExpenseCard/ExpenseCard'

const Expense = () => {
    const [expenses, setExpenses] = useState([])

    // Fetch incomes when component mounts
    useEffect(() => {
        fetchExpenses()
    }, [])

    // Function to fetch incomes
    const fetchExpenses = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/get-expenses')
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
                body: JSON.stringify(newExpense),
            });

            if (!response.ok) {
                throw new Error("Failed to add expense");
            }

            // If successful, refetch expense
            fetchExpenses();
        } catch (error) {
            console.log('Error adding expense:', error);
        }
    }

    return (
        <ExpenseStyled>
            {/* Pass handleNewIncome to Form so it can update IncomeCard */}
            <ExpenseForm onNewExpense={handleNewExpense} />
            {/* Pass incomes to IncomeCard */}
            <ExpenseCard expenses={expenses} />
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div``

export default Expense
