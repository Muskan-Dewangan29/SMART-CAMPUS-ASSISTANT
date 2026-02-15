import express from "express";
import { findAnswer } from "../rag.js";

const router = express.Router();

router.post("/chat", (req, res) => {
  const { question } = req.body;

  const answer = findAnswer(question);

  // 🔒 HARD STOP
  if (!answer) {
    return res.json({
      reply: "Sorry, this information is not available in college records."
    });
  }

  // ✅ Direct response (NO Gemini)
  res.json({ reply: answer });
});

export default router;
