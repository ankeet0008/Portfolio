import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from '../types';

const getClient = (): GoogleGenAI => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

// Singleton chat instance to maintain history
let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are the virtual portfolio assistant for Ankit Naik, a curious developer exploring the future of software through AI and intelligent systems.
Your role is to answer questions about Ankit, his work, his skills, and his availability.

Key Information about Ankit:
- Role: Creative Developer & AI Enthusiast.
- Focus: Building practical tools using modern web stacks, large language models, and creative problem-solving.
- Philosophy: Turning ideas into real, usable products.
- Tech Stack: Next.js, React, Node.js, Python (AI/ML), LLM APIs, RAG, Git, Linux.
- Services: AI Application Development, LLM Integrations & RAG Systems, Full-Stack Web Development, Developer Tools & Experiments.
- Availability: Open for freelance projects and collaborations.

Tone: Professional, minimalist, slightly witty, concise. Avoid long paragraphs. Use bullet points if necessary.
If asked to see projects, direct the user to scroll down to the 'Selected Work' section.
If asked for contact, direct them to the email in the footer.
`;

export const sendMessageToGemini = async (message: string, history: ChatMessage[]): Promise<string> => {
  try {
    const ai = getClient();
    
    if (!chatSession) {
      chatSession = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
    }

    // We don't strictly need to pass history manually if we reuse the chatSession object, 
    // but for a stateless feel in some app architectures, we might. 
    // Here we rely on the SDK's chat session memory.
    
    const result = await chatSession.sendMessage({ message });
    return result.text || "I'm having trouble thinking of a response right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I seem to be disconnected from the neural link. Please try again later.";
  }
};