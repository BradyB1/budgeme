import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = ({ setUserId }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/v1/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }
    
            localStorage.setItem("userId", data.userId);
            setUserId(data.userId);
            navigate("/");
        } catch (error) {
            console.error("Login Error:", error);
            setError(error.message);
        }
    };

    return (
        <LoginStyled>
        <div className="login-container">
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>

            <p>Don't have an account?</p>
            <button onClick={()=> navigate("/signup")}>Create an Account</button>
        </div>
        </LoginStyled>
    );
};

const LoginStyled = styled.div`
    .login-container { 
    padding-top:2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .login-container h2{
    padding-bottom: 1rem;
    }

    form {
        display: flex;
        flex-direction: column; 
        gap: 10px;
        width: 100%;
        max-width: 300px;
    }

    input, button {
        padding: 10px;
        margin: .25rem;
        font-size: 16px;
    }

    button {
        cursor: pointer;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 5px;
    }
`;


export default Login;
