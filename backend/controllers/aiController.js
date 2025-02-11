require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { getFinancialSummary } = require("../utils/financialSummary");
const AITip = require("../models/AITipModel");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


exports.getFinancialTip = async (req, res) => {
    const { userId } = req.params;
    const { refresh } = req.query;

    console.log("AI Tip Request Received. User ID:", userId, "| Refresh:", refresh);

    try {
        // Check Cache
        console.log("Checking Cache...");
        const cachedTip = await AITip.findOne({ userId });

        if (cachedTip && !refresh && (Date.now() - cachedTip.lastUpdated) < 10 * 60 * 1000) {
            console.log("Returning Cached Tip:", cachedTip.tip);
            return res.status(200).json({ tip: cachedTip.tip });
        }

        // Fetch Financial Summary
        console.log("Fetching Financial Summary...");
        const { summary } = await getFinancialSummary(userId);
        console.log("Financial Summary:", summary);

        //Call Gemini AI
        console.log("Sending request to Gemini AI...");
        // const prompt = `Provide a short, personalized financial tip based on this data:\n${summary}`;
        const prompt = `As an enthusiastic financial expert, provide a short financial tip based on this user data (Keep it brief. A sentence or two summary and then 2-3 bullets of suggestions/improvements they could use, one of which should be tailored to promoting long-term investments if they can. Additionally, avoid using asterisks and use bullet points instead.):\n${summary}`;
        const aiResponse = await model.generateContent(prompt);

        console.log("AI Response Received:", aiResponse);
        const tip = aiResponse.response.text();

        // Store New Tip
        console.log("Saving New AI Tip...");
        if (cachedTip) {
            cachedTip.tip = tip;
            cachedTip.lastUpdated = new Date();
            await cachedTip.save();
        } else {
            await AITip.create({ userId, tip, lastUpdated: new Date() });
        }

        console.log("New AI Tip Generated:", tip);
        res.status(200).json({ tip });

    } catch (error) {
        console.error("AI API Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
