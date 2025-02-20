
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return;

            try {
                const response = await fetch(`https://budgeme.onrender.com/api/v1/get-user/${userId}`);
                if (!response.ok) throw new Error("Failed to fetch user data");

                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [userId]);

    if (!userData) return <p>Loading user data...</p>;

    return (
        <ProfileStyled>
            <h2>Profile</h2>
            <p><strong>Name:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Joined:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
            <button onClick={() => navigate("/edit-profile")}>Edit Profile</button>  
        </ProfileStyled>
    );
};

const ProfileStyled = styled.div`
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
    }
`;

export default Profile;
