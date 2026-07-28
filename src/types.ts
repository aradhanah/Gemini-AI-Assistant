export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp?: string;
}

export interface SuggestionTopic {
  id: string;
  title: string;
  prompt: string;
  category: 'code' | 'creative' | 'explain' | 'productivity';
}
