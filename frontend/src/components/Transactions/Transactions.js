import React, { useState } from 'react'
import TransactionBar from '../TransactionBar/TransactionBar'
import styled from 'styled-components';

const Transactions = ({ userId }) => {
    const [refresh, setRefresh] = useState(false);
  
  const triggerRefresh = () => setRefresh(prev => !prev);
  return (
    <TransactionsStyled>
    <div className="dash-header">Transactions</div>
    <div>
      <TransactionBar userId={userId} triggerRefresh={triggerRefresh} />      
    </div>
    </TransactionsStyled>
  )
}

const TransactionsStyled = styled.div`
  background-color: #f9f9f9;
  min-height: 100vh; 
  display: flex;
  flex-direction: column; 

  .dash-header {
    padding-top: 0.5rem;
    display: flex;
    
    justify-content: center;
    font-size: 3rem;
    font-weight: bolder;
  }
`;
export default Transactions