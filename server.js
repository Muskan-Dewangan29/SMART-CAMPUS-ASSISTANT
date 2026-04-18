import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
console.log("KEY CHECK:", OPENROUTER_API_KEY);
if (!OPENROUTER_API_KEY) {
  console.warn("⚠️ OPENROUTER_API_KEY is missing. Chatbot will not work!");
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
    `https://openrouter.ai/api/v1/chat/completions`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5000",
        "X-Title": "College Assistant"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "system", content: "You are a helpful college assistant." },
          { role: "user", content: safePrompt }
        ]
      })
    }
  );

  if (!response.ok) {
  const errText = await response.text();
  console.error("❌ OPENROUTER ERROR:", errText);
  return res.json({
    reply: "❌ API ERROR → " + errText
  });
}

const data = await response.json();
console.log("✅ FULL RESPONSE:", JSON.stringify(data, null, 2));
  
  console.log("FULL API RESPONSE:", JSON.stringify(data, null, 2));

let reply = "";

if (data.choices && data.choices.length > 0) {
  const content = data.choices[0]?.message?.content;

  if (content && content.trim().length > 0) {
    reply = content.trim();
  }
}

// fallback only if EMPTY
if (!reply) {
  const suggestions = SUGGESTED_TOPICS.map(t => `• ${t}`).join("\n");
  reply = "⚠️ I couldn't find an exact answer.\n\n🔎 You can ask about:\n" + suggestions;
}

  res.json({ reply });

} catch (err) {
  console.error("AI fetch error:", err.message);
 res.json({
  reply: "❌ ERROR: " + err.message
});
}




    

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

