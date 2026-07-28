import { useState } from 'react';
import Markdown from 'react-markdown';
import { Bot, User, Copy, Check } from 'lucide-react';
import { ChatMessage } from '../types';

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id={`message-${message.id}`}
      className={isUser ? 'message-row-user' : 'message-row-bot'}
    >
      {!isUser && (
        <div className="avatar-bot">
          <Bot className="icon-sm" />
        </div>
      )}

      <div className={isUser ? 'message-wrapper-user' : 'message-wrapper-bot'}>
        <div className={`message-group ${isUser ? 'bubble-user' : 'bubble-bot'}`}>
          <div>
            {isUser ? (
              <div className="message-text-user">{message.text}</div>
            ) : (
              <div className="markdown-body">
                <Markdown>{message.text}</Markdown>
              </div>
            )}
          </div>

          {!isUser && (
            <button
              onClick={handleCopy}
              className="btn-copy"
              title="Copy response"
              aria-label="Copy message text"
            >
              {copied ? <Check className="icon-xs text-emerald-500" /> : <Copy className="icon-xs" />}
            </button>
          )}
        </div>

        {message.timestamp && (
          <span className={isUser ? 'message-time-user' : 'message-time-bot'}>
            {message.timestamp}
          </span>
        )}
      </div>

      {isUser && (
        <div className="avatar-user">
          <User className="icon-sm" />
        </div>
      )}
    </div>
  );
}
