import React, { useState, useEffect } from "react";
import { fetchFinancialTip } from "../../api/aiServices"; 
import styled from "styled-components";

const GeneratedTips = ({ userId }) => {
    const [aiTip, setAiTip] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAITip = async () => {
            if (!userId) return; 
            setLoading(true);
            const tip = await fetchFinancialTip(userId);
            setAiTip(tip);
            setLoading(false);
        };

        getAITip();
    }, [userId]);

    return (
      <GeneratedTipsStyled>
          <div className="ai-tips">
              <h2>💡 Your AI Financial Tip</h2>
              {loading ? <p>Loading AI insights...</p> : <p>{aiTip}</p>}
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
    text-align: center;
}

.ai-tips h2 {
    color: #2c3e50;
}

.ai-tips p {
    font-size: 1rem;
    color: #333;
}

`
export default GeneratedTips;
