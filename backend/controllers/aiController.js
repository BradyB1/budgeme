const { getFinancialSummary } = require("../utils/financialSummary");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.getFinancialTip = async (req, res) => {
    const { userId } = req.params;

    try {
        // 🔹 Get user’s financial summary
        const { summary } = await getFinancialSummary(userId);

        // 🔹 Construct AI prompt
        const prompt = `Provide a short, insightful financial tip based on this data:\n${summary}`;

        // 🔹 Send request to Gemini AI
        const aiResponse = await model.generateContent(prompt);
        const tip = aiResponse.response.text();

        res.status(200).json({ tip });
    } catch (error) {
        console.error("❌ AI Error:", error);
        res.status(500).json({ message: "Error generating financial tip." });
    }
};
