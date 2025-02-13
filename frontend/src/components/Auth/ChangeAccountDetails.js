import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ChangeAccountDetails = () => {
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [message, setMessage] = useState("");
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure at least one field is updated
        if (!newUsername && !newEmail) {
            setMessage("Please enter a new username or email to update.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/v1/update-user/${userId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...(newUsername && { username: newUsername }),
                    ...(newEmail && { email: newEmail }),
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Account Updated!");
                setTimeout(() => navigate("/profile"), 2000);
            } else {
                setMessage(data.message || "Error updating username and email.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Server error. Please try again later.");
        }
    };

    return (
        <AccountDetailsStyled>
            <div style={{ textAlign: "center", padding: "20px" }}>
                <h2>Update Account Details</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="New Username (optional)"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                   
                    <input
                        type="email"
                        placeholder="New Email (optional)"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                    
                    <button type="submit">Update Account</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </AccountDetailsStyled>
    );
};

const AccountDetailsStyled = styled.div`
    padding: 2rem;
    background: #f9f9f9;
    border-radius: 8px;
    max-width: 400px;
    margin: 2rem auto;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

    h2 {
        text-align: center;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.1rem;
        margin: 0.5rem 0;
        color: red;
    }

    input {
        width: 100%;
        padding: 0.5rem;
        margin-top: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    button {
        background-color: #007bff;
        color: white;
        padding: 0.75rem;
        margin-top: 1rem;
        border: none;
        cursor: pointer;
        width: 100%;
        font-size: 1rem;
        border-radius: 5px;
    }
`;

export default ChangeAccountDetails;
