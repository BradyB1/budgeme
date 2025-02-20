import React, { useContext, useState } from 'react'
import axios from 'axios'
const GlobalContext = React.createContext()

const BASE_URL = "https://budgeme.onrender.com/api/v1"

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    const addIncome = async(income) =>{
        const response = await axios.post(`${BASE_URL}/add-income`, income).catch((err)=>{
            setError(err.response.data.message)
        })
    }

    const addExpense = async(expense) =>{
        const response = await axios.post(`${BASE_URL}/add-expense`, expense).catch((err)=>{
            setError(err.response.data.message)
        })
    }

    return (
        <GlobalContext.Provider value={{addIncome, addExpense}}>
           {children}
        </GlobalContext.Provider>
    )
}


export const useGlobalContext = ()=>{
    return useContext(GlobalContext)
}