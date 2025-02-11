import React, { useState, useEffect } from "react";
import { fetchFinancialTip } from "../../api/aiServices"; 
import styled from "styled-components";

const GeneratedTips = ({ userId }) => {
    const [aiTip, setAiTip] = useState("");
    const [loading, setLoading] = useState(true);

    const getAITip = async (refresh = false) => {
        if (!userId) return;
        console.log("Fetching AI Tip... Refresh:", refresh); 
        setLoading(true);
        const tip = await fetchFinancialTip(userId, refresh);
        console.log("Received AI Tip:", tip); 
        setAiTip(tip);
        setLoading(false);
    };

    useEffect(() => {
        getAITip(); 
    }, [userId]);

    return (
        <GeneratedTipsStyled>
            <div className="ai-tips">
                <h2>💡 Your AI Financial Tip</h2>
                {loading ? <p>Loading AI insights...</p> : <p dangerouslySetInnerHTML={{ __html: aiTip.replace(/\n/g, "<br/>") }}></p>}
                <button className="refresh-btn" onClick={() => getAITip(true)}>🔄 Get New Tip</button>
            </div>
        </GeneratedTipsStyled>
    );
};

const GeneratedTipsStyled = styled.div`
    .ai-tips {
        background: #f4f4f4;
        padding: 15px;
        border-radius: 8px;
        margin-top: 15px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        text-align: left;
        padding: 20px;
    }

    .ai-tips h2 {
        color: #2c3e50;
    }

    .ai-tips p {
        font-size: 1rem;
        color: #333;
        white-space: pre-line;
    }

    .refresh-btn {
        margin-top: 10px;
        padding: 8px 12px;
        font-size: 1rem;
        background:rgb(38, 97, 160);
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 5px;
    }

    .refresh-btn:hover {
        background:rgb(35, 82, 133);
    }
`;

export default GeneratedTips;
