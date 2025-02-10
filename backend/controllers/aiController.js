require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { getFinancialSummary } = require("../utils/financialSummary");
const AITip = require("../models/AITipModel");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.getFinancialTip = async (req, res) => {
    const { userId } = req.params;

    try {
        
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");

        const cachedTip = await AITip.findOne({ userId });

        if (cachedTip && (Date.now() - cachedTip.lastUpdated) < 24 * 60 * 60 * 1000) {
            console.log("Using Cached AI Tip");
            return res.status(200).json({ tip: cachedTip.tip });
        }

        const { summary } = await getFinancialSummary(userId);
        const prompt = `Provide a short financial tip based on this user data:\n${summary}`;
        const aiResponse = await model.generateContent(prompt);
        const tip = aiResponse.response.text();

        if (cachedTip) {
            cachedTip.tip = tip;
            cachedTip.lastUpdated = new Date();
            await cachedTip.save();
        } else {
            await AITip.create({ userId, tip, lastUpdated: new Date() });
        }

        console.log("New AI Tip Generated & Cached");
        res.status(200).json({ tip });

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ message: "Error generating financial tip." });
    }
};
