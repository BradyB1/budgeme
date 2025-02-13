import React from "react";
import styled from "styled-components";
import ChangePassword from "../Auth/ChangePassword";
import ChangeAccountDetails from "../Auth/ChangeAccountDetails";

const EditProfile = () => {
    return (
        <EditProfileStyled>
            <div className="container">
                <h2>Edit Profile</h2>
                <div className="edit-sections">
                    <ChangeAccountDetails /> 
                    <ChangePassword />  
                </div>
            </div>
        </EditProfileStyled>
    );
};

const EditProfileStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 1rem;
    
    .container {
        background: #fff;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        max-width: 500px;
        width: 100%;
        text-align: center;
    }

    .edit-sections {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
`;

export default EditProfile;
