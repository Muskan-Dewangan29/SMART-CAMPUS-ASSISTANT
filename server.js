import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Load college data
const collegeData = fs.readFileSync("./college-info.md", "utf-8");
const SUGGESTED_TOPICS = [
  "Admission process",
  "Courses offered",
  "Fees structure",
  "Hostel facilities",
  "Departments",
  "Placement details",
  "Scholarships",
  "Contact information"
];


app.post("/chat", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ reply: "Question is required" });
    }

    // STRICT PROMPT (Very Important)
const prompt = `
You are a Smart College Assistant for SSIPMT.

PRIMARY RULE:
- First, try to answer strictly using the COLLEGE DATA below.

SECONDARY RULE:
- If the exact answer is not found, give the closest helpful answer
  based on general college knowledge.
- Clearly mention when the answer is approximate.

LANGUAGE:
- Reply in the same language as the question (English or Hindi).

COLLEGE DATA:
${collegeData}

QUESTION:
${question}
`;


    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log("Gemini raw response:", JSON.stringify(data, null, 2));

    let reply = "No response";

if (data.candidates && data.candidates.length > 0) {
  reply = data.candidates[0]?.content?.parts?.[0]?.text || "No response";

  // 🔥 SMART "Did you mean?" SUGGESTIONS
  if (
    reply.toLowerCase().includes("don't have information") ||
    reply.toLowerCase().includes("no information") ||
    reply.toLowerCase().includes("not available")
  ) {
    const suggestions = SUGGESTED_TOPICS
      .map(topic => `• ${topic}`)
      .join("\n");

    reply = `${reply}\n\n🔎 You can ask about:\n${suggestions}`;
  }

} else if (data.promptFeedback?.blockReason) {
  reply = "⚠️ AI temporarily unavailable. Please try again.";
}



    res.json({ reply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {

  console.log("Server running on http://localhost:5000");
});
app.get("/", (req, res) => {
  res.send("Smart Campus Assistant Backend is running 🚀");
});

