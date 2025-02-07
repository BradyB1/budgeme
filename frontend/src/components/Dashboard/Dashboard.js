import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TransactionBar from '../TransactionBar/TransactionBar';
import MonthlyIncome from '../DashboardGraphics/MonthlyIncome';
import MonthlyExpenses from '../DashboardGraphics/MonthlyExpenses';
import Networth from '../DashboardGraphics/Networth';

const Dashboard = ({ userId }) => {  // ✅ Accept userId as a prop
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(prev => !prev);
  

  return (
    <DashboardStyled>
      <div className="dash-header">Dashboard</div>
      <div className="dash-content">
      <TransactionBar userId={userId} triggerRefresh={triggerRefresh} /> 
        <div className="main-container">
          <MonthlyIncome refresh={refresh} userId={userId} /> {/* ✅ Pass userId */}
          <MonthlyExpenses refresh={refresh} userId={userId} /> {/* ✅ Pass userId */}
          <Networth refresh={refresh} userId={userId} /> {/* ✅ Pass userId */}
        </div>
      </div>
    </DashboardStyled>
  );
};

const DashboardStyled = styled.div`
 .dash-header {
  padding-top: .5rem;
  display:flex;
  justify-content: center;
  font-size: 3rem;
  font-weight: bolder;
 }  

.dash-content {
  background-color: #f9f9f9;
}
 
.main-container {
  margin-top: 1rem;
  display: flex;
  background-color: #f9f9f9;
}
`;

export default Dashboard;
