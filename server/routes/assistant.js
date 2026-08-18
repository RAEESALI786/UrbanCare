import { Router } from "express";
import { GoogleGenAI } from "@google/genai";
import { optionalAuth } from "../middleware/auth.js";
import { TOOLS, runTool } from "../services/assistantTools.js";

const router = Router();

const geminiReady = Boolean(process.env.GEMINI_API_KEY);
const ai = geminiReady ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

const MODEL = "gemini-flash-latest";
const MAX_TOOL_ROUNDS = 5;

// Our tool schemas already use plain JSON-schema (type/properties/required),
// which Gemini's parametersJsonSchema accepts directly.
const FUNCTION_DECLARATIONS = TOOLS.map((t) => ({
  name: t.name,
  description: t.description,
  parametersJsonSchema: t.input_schema,
}));

function systemPrompt(user) {
  const today = new Date().toISOString().split("T")[0];
  return `You are the UrbanCare assistant — a friendly, concise helper on a home-services booking site (cleaning, salon, AC repair, plumbing, electrician, painting).

Today's date is ${today}. The user is ${user ? `logged in as ${user.email}` : "NOT logged in"}.

Rules:
- Use the list_services tool to answer questions about what's offered, pricing, or duration — never guess prices from memory.
- Painting has no fixed price. Always use quote_painting to compute an exact price before quoting one, and walk the user through the choices it needs (home size, who supplies the paint, paint finish if applicable, add-ons) conversationally rather than dumping all options at once.
- Before calling create_booking, explicitly restate the service, date, time slot, address and final price back to the user and get a clear "yes"/confirmation in the conversation. Never book on an ambiguous or implied confirmation.
- If the user is not logged in and wants to book, tell them to log in first — do not attempt create_booking.
- Keep replies short and conversational, like a helpful human agent — not a wall of text.`;
}

function toGeminiContents(messages) {
  return messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
}

router.post("/chat", optionalAuth, async (req, res) => {
  if (!geminiReady) {
    return res.status(500).json({
      message: "The assistant isn't configured. Add GEMINI_API_KEY to server/.env.",
    });
  }

  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ message: "messages array is required." });
  }

  try {
    let contents = toGeminiContents(messages);
    let finalText = "";

    for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
      const response = await ai.models.generateContent({
        model: MODEL,
        contents,
        config: {
          systemInstruction: systemPrompt(req.user),
          tools: [{ functionDeclarations: FUNCTION_DECLARATIONS }],
        },
      });

      const calls = response.functionCalls || [];
      if (response.text) finalText = response.text;

      // Append the model's turn (text and/or function calls) to history
      const modelParts = response.candidates?.[0]?.content?.parts || [{ text: response.text || "" }];
      contents.push({ role: "model", parts: modelParts });

      if (calls.length === 0) break;

      const responseParts = [];
      for (const call of calls) {
        const result = await runTool(call.name, call.args, req.user);
        responseParts.push({
          functionResponse: { name: call.name, response: { result } },
        });
      }
      contents.push({ role: "user", parts: responseParts });
    }

    res.json({ reply: finalText });
  } catch (err) {
    console.error("Assistant error:", err.message);
    res.status(500).json({ message: "The assistant hit an error. Please try again." });
  }
});

export default router;
