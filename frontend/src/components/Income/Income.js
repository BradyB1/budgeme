import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Form from "../Form/Form"
import IncomeCard from '../IncomeCard/IncomeCard'

const Income = () => {
    const [incomes, setIncomes] = useState([])

    // Fetch incomes when component mounts
    useEffect(() => {
        fetchIncomes()
    }, [])

    // Function to fetch incomes
    const fetchIncomes = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/get-incomes')
            if (!response.ok) {
                throw new Error("Failed to fetch income data")
            }
            const data = await response.json();
            setIncomes(data);
        } catch (error) {
            console.log('Error fetching incomes:', error)
        }
    }

    // Function to add new income to the list dynamically
    const handleNewIncome = async (newIncome) => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/add-income', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newIncome),
            });

            if (!response.ok) {
                throw new Error("Failed to add income");
            }

            // If successful, refetch incomes
            fetchIncomes();
        } catch (error) {
            console.log('Error adding income:', error);
        }
    }

    return (
        <IncomeStyled>
            {/* Pass handleNewIncome to Form so it can update IncomeCard */}
            <Form onNewIncome={handleNewIncome} />
            {/* Pass incomes to IncomeCard */}
            <IncomeCard incomes={incomes} />
        </IncomeStyled>
    )
}

const IncomeStyled = styled.div``

export default Income
