import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  
import styled from "styled-components";

const Signup = ({ setUserId }) => {  // ✅ Keep `setUserId` to log in the user automatically
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();  

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");  

        try {
            const response = await fetch("http://localhost:3000/api/v1/add-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Signup failed");
            }

            // ✅ Auto-login: Store userId in localStorage
            localStorage.setItem("userId", data.userId);
            setUserId(data.userId);

            navigate("/");  // ✅ Redirect to dashboard

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <SignupStyled>
        <div className="signup-container">
            <h2>Sign Up</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSignup}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Sign Up</button>
            </form>

            <p>Already have an account?</p>
            <button onClick={() => navigate("/login")}>Go to Login</button>
        </div>
        </SignupStyled>
    );
};


const SignupStyled = styled.div`
    .signup-container {
        padding-top: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .signup-container h2{
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


export default Signup;
