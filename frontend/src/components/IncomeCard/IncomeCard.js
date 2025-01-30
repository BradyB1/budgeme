import React from 'react'
import styled from 'styled-components'

const IncomeCard = ({ incomes }) => {  // Receive incomes as a prop
    return (
        <IncomeCardStyled>
            <div className="current-incomes">
                <h2>Current Incomes</h2>
                {incomes.length === 0 ? (
                    <p>No income found.</p>
                ) : (
                    <div id="income-list">
                        {incomes.map((income) => (
                            <div key={income._id} id="income">
                                <p><strong>{income.title} </strong></p>
                                <p>Amount: ${income.amount}</p>
                                <p><i>{new Date(income.date).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })}</i></p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </IncomeCardStyled>
    )
}

const IncomeCardStyled = styled.div`
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px; 
    max-width: 100%;
    margin: auto;

    #income {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1rem .5rem;
        margin: .5rem .15rem;
    }

    #income-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    @media (min-width: 600px) {
        #income-list {
            display: grid;
            grid-template-columns: repeat(3, minmax(150px, 1fr)); 
            gap: 10px;
        }
    }
`
export default IncomeCard
