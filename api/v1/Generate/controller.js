const axios = require("axios");

const generateContentController = async (req, res) => {
    const { title } = req.query;
    if (!title) {
        return res.status(400).json({ content: "", message: "Title is required" });
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    const geminiApiUrl = process.env.GEMINI_API_URL;

    if (!geminiApiKey || !geminiApiUrl) {
        return res.status(500).json({
            content: "",
            message: "Gemini API key or URL not set in environment",
        });
    }

    try {
        const prompt = `Write a concise blog content in plain text without using any markdown or formatting symbols, of maximum 250 - 350 words, for the title: ${title}.`;

        const response = await axios.post(`${geminiApiUrl}?key=${geminiApiKey}`, {
            contents: [{ parts: [{ text: prompt }] }],
        });
        console.log("Gemini response:", JSON.stringify(response.data, null, 2));

        const content =
            response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

        res.json({ content });
    } catch (err) {
        console.error(
            "Gemini generate content error:",
            err.response?.data || err.message
        );
        res.status(500).json({
            content: "",
            message: err.response?.data?.error?.message || err.message,
        });
    }
};

module.exports = { generateContentController };
