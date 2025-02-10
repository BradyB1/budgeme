import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TransactionBar from '../TransactionBar/TransactionBar';
import MonthlyIncome from '../DashboardGraphics/MonthlyIncome';
import MonthlyExpenses from '../DashboardGraphics/MonthlyExpenses';
import Networth from '../DashboardGraphics/Networth';
import Spending from '../DashboardGraphics/Spending';
import GeneratedTips from '../DashboardGraphics/GeneratedTips';

const Dashboard = ({ userId }) => {  // ✅ Accept userId as a prop
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(prev => !prev);
  

  return (
    <DashboardStyled>
      <div className="dash-header">Dashboard</div>
      <div className="dash-content">
        <div className="main-container">
          <div className="quick-graphics">

            <div className="spending-container">
              <Spending refresh={refresh} userId={userId}/>
            </div>
              <div className="networth-container">
                <Networth refresh={refresh} userId={userId} /> {/* ✅ Pass userId */}
              </div>

          </div>
          
              <div className="income-container">
                <MonthlyIncome refresh={refresh} userId={userId} /> {/* ✅ Pass userId */}
              </div>
              <div className="expense-container">
                <MonthlyExpenses refresh={refresh} userId={userId} /> {/* ✅ Pass userId */}
              </div>
              <div className="tips-container">
                <GeneratedTips />
              </div>

            

        </div>
      </div>
      <div className="bottom-container">
        <div className="transcations-container">
          <TransactionBar userId={userId} triggerRefresh={triggerRefresh} className="transactions"/> 
        </div>
        
      </div> 
    </DashboardStyled>
  );
};


const DashboardStyled = styled.div`
  width: 100%;
  height: 100vh; /*Ensure it takes the full screen */

  .dash-header {
    padding-top: 0.5rem;
    display: flex;
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
    flex-wrap: wrap;
    background-color: #f9f9f9;
    align-items: start;
    justify-content: center;
    width: 100%;
    padding-bottom: 1rem;
    gap: .5em;
  }

  
  .quick-graphics{ 
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
  }

  .income-container,
  .expense-container,
  .networth-container,
  .spending-container {
  display: flex;
    flex: 1; 
    min-width: 300px;
    justify-content: center;
  }

  .bottom-container{
    width:100%;
    display: flex;
    flex-direction: row;
  
  }

  .tips-container{ 
    flex:1;
    display:flex;
    justify-content: center;
  }

  .transactions-container{ 
    max-width: 100%;
    height: 100%;
  }

  .transactions {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  @media only screen and (min-width: 480px) {
    .transactions {
      width: 100%;
    }

    .transactions-container {
      width: 100%;
    }

    .income-container,
    .expense-container,
    .networth-container {
      width: 100%; 
    }
  }
`;


export default Dashboard;
