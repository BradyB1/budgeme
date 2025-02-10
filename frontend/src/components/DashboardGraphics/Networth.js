import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Networth = ({ refresh, userId }) => {  // ✅ Ensure userId is received
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [networth, setNetworth] = useState(0);

  // Fetch and Sum Income
  const fetchIncomes = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/get-incomes/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch income');
      const data = await response.json();
      const totalIncome = data.reduce((sum, item) => sum + parseFloat(item.amount || '0'), 0);
      setIncome(totalIncome);
    } catch (error) {
      console.error('Error fetching income:', error);
    }
  };

  // Fetch and Sum Expenses
  const fetchExpenses = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/get-expenses/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch expenses');
      const data = await response.json();
      const totalExpenses = data.reduce((sum, item) => sum + parseFloat(item.amount || '0'), 0);
      setExpenses(totalExpenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  // Fetch data when component mounts or when refresh state changes
  useEffect(() => {
    if (userId) {  // ✅ Only fetch if userId exists
      fetchIncomes();
      fetchExpenses();
    }
  }, [refresh, userId]); // ✅ Include `userId` to re-fetch when it changes

  // Calculate Net Worth dynamically
  useEffect(() => {
    setNetworth(income - expenses);
  }, [income, expenses]);

  return (
    <NetworthStyled>
      <div className="networth-container">
        <h2>Net Worth</h2>
        <hr/>
        <h3>${networth.toFixed(2)}</h3>
      </div>
    </NetworthStyled>
  );
};

const NetworthStyled = styled.div`
  padding: 2rem;
  .networth-container {
    background-color: #f9f9f9;
    border: 3px solid black;
    border-radius: 15px;
    padding: 0 1rem;
    text-align: center;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  

  h2, h3 {
    margin: 0;
    display:block;
  }

  hr{
  width: 100%;
  margin: 0.5rem 0;
  border: 1px solid black;
  }

  @media only screen and (min-device-width: 480px){
    .networth-container{
      padding: .5rem;
      width: 100%;
    }

  }
`;

export default Networth;
