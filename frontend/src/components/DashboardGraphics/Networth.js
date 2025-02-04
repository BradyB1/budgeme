// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';

// const Networth = () => {
//   const [income, setIncome] = useState(0);
//   const [expenses, setExpenses] = useState(0);
//   const [networth, setNetworth] = useState(0);

//   // Fetch and Sum Income
//   const fetchIncomes = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/api/v1/get-incomes');
//       if (!response.ok) throw new Error('Failed to fetch income');
//       const data = await response.json();

//       console.log('Income Data:', data); // Debugging log
//       const totalIncome = data.reduce((sum, item) => sum + parseFloat(item.amount || '0'), 0);
//       setIncome(totalIncome);
//     } catch (error) {
//       console.error('Error fetching income:', error);
//     }
//   };

//   // Fetch and Sum Expenses
//   const fetchExpenses = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/api/v1/get-expenses');
//       if (!response.ok) throw new Error('Failed to fetch expenses');
//       const data = await response.json();

//       console.log('Expenses Data:', data); // Debugging log
//       const totalExpenses = data.reduce((sum, item) => sum + parseFloat(item.amount || '0'), 0);
//       setExpenses(totalExpenses);
//     } catch (error) {
//       console.error('Error fetching expenses:', error);
//     }
//   };

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchIncomes();
//     fetchExpenses();
//   }, []);

//   // Calculate Net Worth dynamically
//   useEffect(() => {
//     console.log('Income:', income, 'Expenses:', expenses); // Log state values
//     setNetworth(income - expenses);
//   }, [income, expenses]);

//   return (
//     <NetworthStyled>
//       <div className="networth-container">
//         <h2>Net Worth Calculator</h2>
//         <p>Income: ${income.toFixed(2)}</p>
//         <p>Expenses: ${expenses.toFixed(2)}</p>
//         <h3>Net Worth: ${networth.toFixed(2)}</h3>
//       </div>
//     </NetworthStyled>
//   );
// };

// const NetworthStyled = styled.div`
//   .networth-container {
//     background-color: #f9f9f9;
//     border: 3px solid black;
//     border-radius: 15px;
//     padding: 1rem;
//     text-align: center;
//   }
//   h2, h3 {
//     margin: 0;
//   }
// `;

// export default Networth;


import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Networth = ({ refresh }) => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [networth, setNetworth] = useState(0);

  // Fetch and Sum Income
  const fetchIncomes = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/get-incomes');
      if (!response.ok) throw new Error('Failed to fetch income');
      const data = await response.json();

      console.log('Income Data:', data);
      const totalIncome = data.reduce((sum, item) => sum + parseFloat(item.amount || '0'), 0);
      setIncome(totalIncome);
    } catch (error) {
      console.error('Error fetching income:', error);
    }
  };

  // Fetch and Sum Expenses
  const fetchExpenses = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/get-expenses');
      if (!response.ok) throw new Error('Failed to fetch expenses');
      const data = await response.json();

      console.log('Expenses Data:', data);
      const totalExpenses = data.reduce((sum, item) => sum + parseFloat(item.amount || '0'), 0);
      setExpenses(totalExpenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  // Fetch data when component mounts or when refresh state changes
  useEffect(() => {
    fetchIncomes();
    fetchExpenses();
  }, [refresh]); // Re-run when `refresh` changes

  // Calculate Net Worth dynamically
  useEffect(() => {
    setNetworth(income - expenses);
  }, [income, expenses]);

  return (
    <NetworthStyled>
      <div className="networth-container">
        <h2>Net Worth Calculator</h2>
        {/* <p>Income: ${income.toFixed(2)}</p>
        <p>Expenses: ${expenses.toFixed(2)}</p> */}
        <h3>${networth.toFixed(2)}</h3>
      </div>
    </NetworthStyled>
  );
};

const NetworthStyled = styled.div`
  .networth-container {
    background-color: #f9f9f9;
    border: 3px solid black;
    border-radius: 15px;
    padding: 1rem;
    text-align: center;
  }
  h2, h3 {
    margin: 0;
  }
`;

export default Networth;
