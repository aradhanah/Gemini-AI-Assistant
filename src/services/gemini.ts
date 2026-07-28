import { ChatMessage } from '../types';

/**
 * Sends conversation history and the latest message to the backend server.
 * The backend proxies the request to the Google Gemini API securely.
 * 
 * @param chatHistory - Previous message objects [{ role: 'user'|'model', text: string }]
 * @param newMessage - The new message string from the user
 * @param systemInstruction - Optional system instruction prompt
 * @returns The response text from Gemini
 */
export async function sendChatMessage(
  chatHistory: ChatMessage[],
  newMessage: string,
  systemInstruction?: string
): Promise<string> {
  // Format history for backend API
  const formattedHistory = chatHistory.map((msg) => ({
    role: msg.role === 'user' ? 'user' : 'model',
    text: msg.text,
  }));

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chatHistory: formattedHistory,
      message: newMessage,
      systemInstruction,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to communicate with Gemini AI Assistant.');
  }

  return data.text;
}
