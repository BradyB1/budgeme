
import styled from 'styled-components'
import ResponsiveAppBar from './components/Navigation/Navigation'
import GlobalStyle from './styles/GlobalStyles'
import React, { useState }from 'react'
import Dashboard from './components/Dashboard/Dashboard'
import Income from './components/Income/Income'
import Expenses from './components/Expense/Expense'
import Transactions from './components/Transactions/Transactions'

function App() {

    const [active, setActive] = useState(1)

    const displayData = () =>{
        switch(active){
            case 1: 
            return <Dashboard />
            case 2: 
                return <Income />
            case 3: 
                return <Expenses />
            case 4: 
                return <Transactions />
            default: 
                return <Dashboard />
        }
    }


    return (
        <>
            <GlobalStyle /> 
            <AppStyled>
                <ResponsiveAppBar active={active} setActive={setActive} />
                <main>
                    {displayData()}
                </main>
            </AppStyled>
        </>
    )
}



const AppStyled = styled.div`
    height: 100vh;
    padding: 0;
    margin: 0;
`

export default App;