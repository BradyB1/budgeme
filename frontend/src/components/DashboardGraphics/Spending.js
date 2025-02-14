import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Spending = ({ refresh, userId }) => {
  const [expenses, setExpenses] = useState(0);
  const [spending, setSpending] = useState(0);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/get-expenses/${userId}`
      );
      if (!response.ok) throw new Error("Failed to fetch expenses");

      const data = await response.json();

      // Get current month and year
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      // Calculate total spending for the current month
      const expensesThisMonth = data.reduce((sum, expense) => {
        const expenseDate = new Date(expense.date);
        const expenseMonth = expenseDate.getMonth();
        const expenseYear = expenseDate.getFullYear();

        // Check if expense is from the current month & year
        if (expenseMonth === currentMonth && expenseYear === currentYear) {
          return sum + parseFloat(expense.amount || "0");
        }
        return sum;
      }, 0);

      //updating with current month expenses only 
      setExpenses(expensesThisMonth); 
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchExpenses();
    }
  }, [refresh, userId]);

  useEffect(() => {
    setSpending(expenses);
  }, [expenses]); 
  // ^ makes sure it updates when expenses change

  return (
    <SpendingStyled>
      <div className="spending-container">
        <h2>Spending This Month</h2>
        <hr />
        <h3>${spending.toFixed(2)}</h3>
      </div>
    </SpendingStyled>
  );
};

const SpendingStyled = styled.div`
  .spending-container {
    background-color: #f9f9f9;
    border: 3px solid black;
    border-radius: 15px;
    padding: 0 1rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h2,
  h3 {
    margin: 0;
    display: block;
  }

  hr {
    width: 100%;
    margin: 0.5rem 0;
    border: 1px solid black;
  }
  
  @media only screen and (min-device-width: 480px){
    .spending-container{
      padding: .5rem;
      width: 100%;
    }

  }
`;

export default Spending;
