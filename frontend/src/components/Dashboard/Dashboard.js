import React from 'react'
import styled from 'styled-components'
import TransactionBar from '../TransactionBar/TransactionBar'
import MonthlyIncome from '../DashboardGraphics/MonthlyIncome'
import MonthlyExpenses from '../DashboardGraphics/MonthlyExpenses'
import Networth from '../DashboardGraphics/Networth'
const Dashboard = () => {
  return (
    <DashboardStyled>
      <div className="dash-header">Dashboard</div>
      <div className="dash-content">
        <TransactionBar/>
        <div className="main-container">
          <MonthlyIncome></MonthlyIncome>
          <MonthlyExpenses></MonthlyExpenses>
          {/* <Networth></Networth> */}
        </div>
      </div>

    </DashboardStyled>
  )
}

const DashboardStyled = styled.div`
  

 .dash-header{
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


`


export default Dashboard