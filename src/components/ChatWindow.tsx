import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { ChatMessage, SuggestionTopic } from '../types';
import { Sparkles, Code2, Lightbulb, BookOpen, Compass } from 'lucide-react';

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSelectSuggestion?: (prompt: string) => void;
}

const SUGGESTIONS: SuggestionTopic[] = [
  {
    id: '1',
    title: 'Explain Quantum Computing',
    prompt: 'Explain the core principles of quantum computing in simple terms for a beginner.',
    category: 'explain',
  },
  {
    id: '2',
    title: 'Write a React Hook',
    prompt: 'Write a custom React hook for debouncing search input values with TypeScript.',
    category: 'code',
  },
  {
    id: '3',
    title: 'Draft a Professional Email',
    prompt: 'Draft a polite follow-up email to a hiring manager after an interview.',
    category: 'productivity',
  },
  {
    id: '4',
    title: 'Creative Story Generator',
    prompt: 'Write a short sci-fi story about an astronaut who finds a hidden garden on Mars.',
    category: 'creative',
  },
];

export default function ChatWindow({ messages, isLoading, onSelectSuggestion }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="chat-window" id="chat-window-scroll">
      {messages.length === 0 ? (
        <div className="empty-state-container">
          <div className="empty-state-badge">
            <Sparkles className="icon-badge" />
          </div>

          <h2 className="empty-state-title">
            Welcome to Gemini AI
          </h2>
          <p className="empty-state-subtitle">
            Your assistant powered by Google&apos;s Gemini 3.6 Flash. Choose a prompt below or ask anything to get started!
          </p>

          <div className="suggestions-grid">
            {SUGGESTIONS.map((topic) => (
              <button
                key={topic.id}
                id={`suggestion-${topic.id}`}
                onClick={() => onSelectSuggestion && onSelectSuggestion(topic.prompt)}
                className="group suggestion-card"
              >
                <div className="suggestion-icon">
                  {topic.category === 'code' && <Code2 className="icon-sm" />}
                  {topic.category === 'creative' && <Lightbulb className="icon-sm" />}
                  {topic.category === 'explain' && <BookOpen className="icon-sm" />}
                  {topic.category === 'productivity' && <Compass className="icon-sm" />}
                </div>
                <div>
                  <h3 className="suggestion-title">
                    {topic.title}
                  </h3>
                  <p className="suggestion-desc">
                    {topic.prompt}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="message-list">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}
