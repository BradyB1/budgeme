import React from 'react'
import styled from 'styled-components'

const Networth = () => {
  return (
    <NetworthStyled>
        <div className="networth-container">
            <p>testing some content in container</p>
        </div>
    </NetworthStyled>
  )
}

const NetworthStyled = styled.div`

    .networth-container{
        background-color: #f9f9f9;
        border: 3px solid black;
        border-radius: 15px;
        padding: 1rem;
    }

`

export default Networth