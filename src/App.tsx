import { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import { sendChatMessage } from './services/gemini';
import { ChatMessage } from './types';
import { Trash2, Bot, SlidersHorizontal, Sun, Moon, Sparkles, X } from 'lucide-react';

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('gemini_chat_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [systemInstruction, setSystemInstruction] = useState<string>(() => {
    return localStorage.getItem('gemini_system_instruction') || '';
  });

  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    localStorage.setItem('gemini_chat_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleSaveSystemInstruction = (value: string) => {
    setSystemInstruction(value);
    localStorage.setItem('gemini_system_instruction', value);
  };

  const handleSendMessage = async (userText: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      timestamp: time,
    };

    const previousHistory = [...messages];
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const responseText = await sendChatMessage(previousHistory, userText, systemInstruction || undefined);

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      console.error('Error in chat completion:', error);

      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: `⚠️ Error: ${error.message || 'Something went wrong. Please check your API key or connection.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear this conversation?')) {
      setMessages([]);
      localStorage.removeItem('gemini_chat_messages');
    }
  };

  return (
    <div className="app-screen">
      <div className="app-card">
        
        {/* Header */}
        <header className="app-header">
          <div className="header-brand">
            <div className="avatar-bot-lg">
              <Bot className="icon-md" />
              <span className="status-dot-avatar"></span>
            </div>
            <div>
              <div className="header-title-group">
                <h1 className="header-title">
                  Gemini AI
                </h1>
                <span className="badge-model">
                  <Sparkles className="icon-xs mr-1" />
                  3.6 Flash
                </span>
              </div>
              <div className="header-status">
                <span className="status-dot"></span>
                <span className="header-status-text">Active Now</span>
              </div>
            </div>
          </div>

          <div className="header-actions">
            {messages.length > 0 && (
              <button
                id="clear-chat-btn"
                onClick={handleClearChat}
                className="btn-secondary"
                title="Clear conversation"
                aria-label="Clear conversation"
              >
                <Trash2 className="icon-sm" />
                <span className="btn-label-responsive">Clear History</span>
              </button>
            )}

            <button
              id="theme-toggle-btn"
              onClick={() => setDarkMode((prev) => !prev)}
              className="btn-icon"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="icon-md" /> : <Moon className="icon-md" />}
            </button>

            <button
              id="settings-btn"
              onClick={() => setShowSettings(!showSettings)}
              className={showSettings || systemInstruction ? 'btn-icon-active' : 'btn-icon'}
              title="Assistant Persona Settings"
              aria-label="Open settings"
            >
              <SlidersHorizontal className="icon-md" />
            </button>
          </div>
        </header>

        {/* Settings Drawer / Panel */}
        {showSettings && (
          <div id="settings-panel" className="settings-panel">
            <div className="settings-container">
              <div className="settings-header">
                <label htmlFor="system-instruction-input" className="settings-label">
                  <SlidersHorizontal className="icon-sm text-indigo-500" />
                  Custom System Instruction (Persona / Tone)
                </label>
                <button
                  onClick={() => setShowSettings(false)}
                  className="btn-close"
                >
                  <X className="icon-sm" />
                </button>
              </div>
              <textarea
                id="system-instruction-input"
                value={systemInstruction}
                onChange={(e) => handleSaveSystemInstruction(e.target.value)}
                placeholder="E.g., You are a helpful software engineer who explains solutions concisely with code snippets."
                rows={2}
                className="settings-input"
              />
              <span className="settings-help">
                This instruction configures Gemini&apos;s behavior across all chat messages in this session.
              </span>
            </div>
          </div>
        )}

        {/* Body Chat Area */}
        <main className="chat-body">
          <ChatWindow
            messages={messages}
            isLoading={isLoading}
            onSelectSuggestion={handleSendMessage}
          />
        </main>

        {/* Footer Input Area */}
        <footer className="app-footer">
          <div className="chat-footer-container">
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
            <p className="footer-disclaimer">
              Powered by <strong>Gemini 3.6 Flash</strong> &bull; Context windows active
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
