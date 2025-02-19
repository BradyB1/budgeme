import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TransactionBar from '../TransactionBar/TransactionBar';
import MonthlyIncome from '../DashboardGraphics/MonthlyIncome';
import MonthlyExpenses from '../DashboardGraphics/MonthlyExpenses';
import Networth from '../DashboardGraphics/Networth';
import Spending from '../DashboardGraphics/Spending';
import GeneratedTips from '../DashboardGraphics/GeneratedTips';

const Dashboard = ({ userId }) => {  //Accept userId as a prop
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(prev => !prev);
  

  return (
    <DashboardStyled>
      <div className="dash-header">Dashboard</div>
      <div className="dash-content">
        <div className="main-container">
          <div className="quick-graphics">

            {/* Desktop: Center These and make them side by side on the top of the screen */}
            <div className="spending-container">
              <Spending refresh={refresh} userId={userId}/>
            </div>
              <div className="networth-container">
                <Networth refresh={refresh} userId={userId} />
              </div>

          </div>
              {/* Desktop: Center these and make them the second line below spending and networth */}
              <div className="info-graphics">
                <div className="income-container">
                  <MonthlyIncome refresh={refresh} userId={userId} />
                </div>
                <div className="expense-container">
                  <MonthlyExpenses refresh={refresh} userId={userId} /> 
                </div>
              </div>
              {/* Desktop: below graphics - centered - width ~75% so theres padding on the edges */}
              <div className="tips">
                <div className="tips-container">
                  <GeneratedTips userId={userId} />
                </div>
              </div>

            

        </div>
      </div>
      
        <div className="transcations-container">
          <TransactionBar userId={userId} triggerRefresh={triggerRefresh} className="transactions"/> 
        </div>
        
    </DashboardStyled>
  );
};


const DashboardStyled = styled.div`






  // background-color: #fff;
  width: 100%;
  height: 100vh; 
  // background-color: #f9f9f9;

  .dash-header {
    padding-top: 0.5rem;
    display: flex;
    justify-content: center;
    font-size: 3rem;
    font-weight: bolder;
    
  }

  .main-container {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    justify-content: center;
    width: 100%;
    padding-bottom: 1rem;
    gap: .5em;
  }

  
  .quick-graphics{ 
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 1rem 0;
    width: 50%;

  }

  .info-graphics{
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    width: 90%;
    
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
    align-text:center;
  }

  .transactions{ 
    width: 100%;
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

@media only screen and (max-width: 480px) {
  .quick-graphics {
    display: flex;
    flex-direction: column; 
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    width: 100%; 
    padding: 1rem 0;
  }


  .info-graphics{
    display:flex;
    flex-direction: column;
    width: 95%;
  }

   .tips{
    width: 95%;
   }
}
 

`;


export default Dashboard;
