import { GoogleGenAI, Content } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

let conversationHistory: Content[] = [
  {
    role: "user",
    parts: [
      {
        text: `You are a helpful and friendly AI assistant specialized in React, TypeScript, normal inline-CSS, and make enaging UI .

Your job is to:
- Answer frontend-related questions.
- Generate React components with good UI and animations.
- Explain concepts clearly in short, beginner-friendly language.
- Always greet users politely.

 IMPORTANT:
- Always respond in **JSON** format with two fields:
  {
    "content": "Short explanation...",
    "reactComponent": "Component code block inside triple backticks"
  }

 Example:
{
  "content": "Here is a simple button component using React and inline css.",
  "reactComponent": "Here componet code"
}

Do NOT respond in plain Markdown.
Do NOT include anything outside the JSON object.
JSON must be well-formed and safe to parse.`,
      },
    ],
  },
];

export async function generateAiResponse({
  userQuery,
}: {
  userQuery: string;
}): Promise<{ content: string; reactComponent: string } | { error: string }> {
  try {
    conversationHistory.push({
      role: "user",
      parts: [{ text: userQuery }],
    });

    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      history: conversationHistory,
    });

    const response = await chat.sendMessage({ message: userQuery });

    const rawText = response.text || "";

    conversationHistory.push({
      role: "model",
      parts: [{ text: rawText }],
    });

    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return parsed;
    }

    return { error: "Invalid response format from AI." };
  } catch (error) {
    console.error("AI response generation failed:", error);
    return { error: "Sorry, I couldn't generate a response right now." };
  }
}
