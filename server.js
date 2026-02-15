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
if (!GEMINI_API_KEY) {
  console.warn("⚠️ GEMINI_API_KEY is missing. Chatbot will not work!");
}

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


try {
  // Limit collegeData length to avoid quota issues
  const safePrompt = `
You are a Smart College Assistant for SSIPMT.

PRIMARY RULE:
- Answer using the COLLEGE DATA below if possible.

COLLEGE DATA:
${collegeData.slice(0, 5000)}   // <-- limit first 5000 chars

QUESTION:
${question}
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: safePrompt }] }]
      })
    }
  );

  const data = await response.json();
  console.log("Gemini raw response:", JSON.stringify(data, null, 2));

  let reply = "I couldn't find a clear answer. Try rephrasing your question.";

  if (data.candidates?.length) {
    reply = data.candidates[0]?.content?.parts?.[0]?.text || reply;

    // Smart suggestions if data missing
    if (
      reply.toLowerCase().includes("don't have information") ||
      reply.toLowerCase().includes("no information") ||
      reply.toLowerCase().includes("not available")
    ) {
      const suggestions = SUGGESTED_TOPICS.map(t => `• ${t}`).join("\n");
      reply = `${reply}\n\n🔎 You can ask about:\n${suggestions}`;
    }
  }

  res.json({ reply });

} catch (err) {
  console.error("AI fetch error:", err);
  res.json({
    reply: "⚠️ AI temporarily unavailable. Please try again later."
  });
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

