import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Form from "../Form/Form"
import IncomeCard from '../IncomeCard/IncomeCard'
import GeneratedTips from "../DashboardGraphics/GeneratedTips"

const Income = ({ userId }) => { 
    const [incomes, setIncomes] = useState([]);

    useEffect(() => {
        if (userId) {
            fetchIncomes();
        }
    }, [userId]);

    const fetchIncomes = async () => {
        try {
            const response = await fetch(`https://budgeme.onrender.com/api/v1/get-incomes/${userId}`); 
            if (!response.ok) {
                throw new Error("Failed to fetch income data");
            }
            const data = await response.json();
            setIncomes(data);
        } catch (error) {
            console.log("Error fetching incomes:", error);
        }
    };

    // Function to add new income to the list dynamically
    const handleNewIncome = async (newIncome) => {
        try {
            console.log("Submitting income:", newIncome);
    
            const response = await fetch('https://budgeme.onrender.com/api/v1/add-income', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newIncome, userId })
            });
    
            const responseData = await response.json();
            console.log("Response received:", responseData);  
    
            if (!response.ok) {
                throw new Error(responseData.message || "Failed to add income");
            }
    
            fetchIncomes();  
        } catch (error) {
            console.log('Error adding income:', error);
        }
    };
    
    
    const handleDeleteIncome = async (incomeId) => {
        try {
            console.log('Deleting Income:', incomeId);
    
            const response = await fetch(`https://budgeme.onrender.com/api/v1/delete-income/${incomeId}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error("Failed to delete income");
            }
    
            
            setIncomes(prevIncomes => prevIncomes.filter(income => income._id !== incomeId));
    
        } catch (error) {
            console.log("Error deleting income:", error);
        }
    };
    
    const handleEditIncome = async (incomeId, updatedIncome) => {
        try {
            const correctedIncome = {
                ...updatedIncome,
                date: new Date(updatedIncome.date).toISOString().split('T')[0] + "T00:00:00.000Z" 
            };
    
            const response = await fetch(`https://budgeme.onrender.com/api/v1/update-income/${incomeId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(correctedIncome),
            });
    
            if (!response.ok) {
                throw new Error("Failed to update income");
            }
    
            const updatedIncomeData = await response.json();
    
            setIncomes(prevIncomes =>
                prevIncomes.map(income =>
                    income._id === incomeId ? updatedIncomeData.income : income
                )
            );
    
        } catch (error) {
            console.log("Error updating income:", error);
        }
    };
    
    

    return (

        <IncomeStyled>
            <div className="container">
                <div className="form">
            <Form onNewIncome={handleNewIncome} userId={userId} />
                </div>
                <div className="tips">
            <GeneratedTips userId={userId}></GeneratedTips>
                </div>
            </div>  
            <IncomeCard incomes={incomes} onDeleteIncome={handleDeleteIncome} onEditIncome={handleEditIncome} />
        </IncomeStyled>
    );
};

const IncomeStyled = styled.div`
@media screen and (min-width: 786px){
    .container{ 
    display:flex;
    width: 100%;
    }

    .form{
        width: 50%;
        
    }
    .tips{
        width: 50%;
        padding: 1rem;
    }
}

@media screen and (max-width: 786px){
    .tips{ 
        padding: 1rem;
    }

}
    
`

export default Income
