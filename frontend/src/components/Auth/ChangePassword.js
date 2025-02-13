import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ChangePassword = () => {

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/v1/update-user/${userId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Password updated successfully!");
                setTimeout(() => navigate("/profile"), 2000);
            } else {
                setMessage(data.message || "Error updating password.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Server error. Please try again later.");
        }
    };

    return (
        <ChangePasswordStyled>
            <div style={{ textAlign: "center", padding: "20px" }}>
                <h2>Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    
                    <button type="submit">Update Password</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </ChangePasswordStyled>
    );
};

const ChangePasswordStyled = styled.div`
    padding: 2rem;
    background: #f9f9f9;
    border-radius: 8px;
    max-width: 400px;
    margin: auto;
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

export default ChangePassword;
