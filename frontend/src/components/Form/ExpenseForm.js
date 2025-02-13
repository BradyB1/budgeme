import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { Button } from '@mui/material'

const Form = ({ onNewExpense }) => {  // Receive onNewExpense as a prop
    const [inputState, setInputState] = useState({
        title: '',
        amount: "",
        date: "",
        category: "",
        description: "",
    })

    const { title, amount, date, category, description } = inputState

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await onNewExpense(inputState); 
            setInputState({ title: '', amount: '', date: '', category: '', description: '' }) 
        } catch (error) {
            console.error("Error submitting form:", error)
        }
    }

    return (
        <FormStyled onSubmit={handleSubmit}>
            <div className="input-control">
                <input type="text" value={title} name="title" placeholder="Expense" onChange={handleInput("title")} />
            </div>
            <div className="input-control">
                <input type="text" value={amount} name="amount" placeholder="Amount" onChange={handleInput("amount")} />
            </div>
            <div className="input-control">
                <DatePicker id="date" placeholderText="Enter a Date" selected={date} dateFormat="MM-dd-yyyy"
                    onChange={(date) => setInputState({ ...inputState, date })} />
            </div>

            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled>Select Category</option>
                    <option value="rent">Rent</option>
                    <option value="groceries">Groceries</option>
                    <option value="home-products">Home Products</option>
                    <option value="animals">Animals</option>
                    <option value="beauty">Beauty</option>
                    <option value="car">Car</option>
                    <option value="gas">Gas</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div className="input-control">
                <textarea name="description" value={description} placeholder='Add a Reference' id='description' cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>

            <div className="submit-btn">
                <Button variant="outlined" type="submit">Add expense</Button>
            </div>
        </FormStyled>
    )
}

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem .5rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

   

    @media (min-width: 600px) {
        

        .input-control{
        input{
            width: 50%;
        }
    }
            
    }

    .selects{
        display: flex;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn{
        button{
            padding: .25rem;
            font-weight: bold;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }
`

export default Form
