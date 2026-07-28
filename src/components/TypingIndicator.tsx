import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="typing-row" id="typing-indicator">
      <div className="avatar-bot">
        <Bot className="icon-sm" />
      </div>
      <div className="typing-card">
        <div className="typing-dots">
          <div className="dot-1"></div>
          <div className="dot-2"></div>
          <div className="dot-3"></div>
        </div>
        <span className="typing-label">
          Gemini is thinking
        </span>
      </div>
    </div>
  );
}
