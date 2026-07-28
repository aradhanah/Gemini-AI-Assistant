import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent, FormEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [text]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSendMessage(text.trim());
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form id="chat-input-form" onSubmit={handleSubmit} className="chat-input-box">
      <textarea
        ref={textareaRef}
        id="chat-textarea"
        value={text}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Ask anything..."
        rows={1}
        className="chat-textarea"
      />

      <div className="chat-input-actions">
        <button
          type="submit"
          id="send-message-btn"
          disabled={disabled || !text.trim()}
          className="btn-send"
          title="Send message"
          aria-label="Send message"
        >
          <Send className="icon-send" />
        </button>
      </div>
    </form>
  );
}
