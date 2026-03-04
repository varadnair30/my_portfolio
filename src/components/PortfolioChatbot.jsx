import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHAT_API_URL =
  process.env.REACT_APP_CHAT_API_URL || "https://portfolio-chat.varadnair30.workers.dev/api/chat";

const QUICK_PROMPTS = [
  "Tell me about ReachCraft",
  "What's Varad's experience at Mavenir?",
  "What skills does he have?",
  "Summarize his projects",
  "Leadership & recognition?",
  "Where can I contact him?",
];

const fallbackAnswer = "I don't have information about it";

function TypingIndicator() {
  return (
    <div className="portfolio-chat-typing">
      <span />
      <span />
      <span />
    </div>
  );
}

function renderInline(str) {
  const parts = str.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  );
}

function renderMarkdown(text) {
  if (!text) return null;
  const lines = text.split("\n");
  const elements = [];
  let listItems = [];
  let k = 0;

  const flushList = () => {
    if (!listItems.length) return;
    elements.push(
      <ul key={k++} className="portfolio-chat-md-list">
        {listItems.map((item, i) => <li key={i}>{renderInline(item)}</li>)}
      </ul>
    );
    listItems = [];
  };

  for (const line of lines) {
    const bullet = line.match(/^\s*\*+\s+(.*)/);
    if (bullet) {
      listItems.push(bullet[1].trim());
    } else {
      flushList();
      if (line.trim()) {
        elements.push(<p key={k++} className="portfolio-chat-md-p">{renderInline(line)}</p>);
      }
    }
  }
  flushList();
  return elements;
}

function MessageBubble({ role, content, sources = [], onSourceClick }) {
  const isUser = role === "user";
  return (
    <motion.div
      className={`portfolio-chat-bubble ${isUser ? "portfolio-chat-bubble-user" : "portfolio-chat-bubble-bot"}`}
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="portfolio-chat-bubble-inner">
        {isUser ? content : renderMarkdown(content)}
        {!isUser && sources?.length > 0 && (
          <div className="portfolio-chat-sources">
            <span className="portfolio-chat-sources-label">See more:</span>
            {sources.map((s, i) => (
              <button
                key={i}
                type="button"
                className="portfolio-chat-source-link"
                onClick={() => onSourceClick?.(s)}
              >
                {s.title || s.section}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function PortfolioChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const handleSourceClick = (source) => {
    if (source?.href) {
      const el = document.querySelector(source.href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setOpen(false);
    }
  };

  const sendMessage = async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setLoading(true);

    try {
      const res = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json().catch(() => ({}));
      const answer = data?.answer ?? fallbackAnswer;
      const sources = Array.isArray(data?.sources) ? data.sources : [];

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: answer, sources },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Chat isn't connected yet — the backend needs to be set up (Gemini API key + Cloudflare Worker). See CHAT_SETUP.md in the project for step-by-step setup.",
          sources: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    sendMessage(input);
  };

  const handleQuickPrompt = (prompt) => {
    sendMessage(prompt);
  };

  const hasMessages = messages.length > 0;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="portfolio-chat-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.div
        className="portfolio-chat-container"
        initial={false}
        animate={{ width: open ? "min(400px, 95vw)" : 0, height: open ? "min(560px, 85vh)" : 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
      >
        <div className="portfolio-chat-panel">
          <div className="portfolio-chat-header">
            <div className="portfolio-chat-avatar">
              <span>VN</span>
            </div>
            <div className="portfolio-chat-header-text">
              <strong>Ask about Varad</strong>
              <span className="portfolio-chat-subtitle">Portfolio assistant · answers from this site only</span>
            </div>
            <button
              type="button"
              className="portfolio-chat-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="portfolio-chat-messages">
            {!hasMessages && !loading && (
              <div className="portfolio-chat-welcome">
                <p>Ask anything about Varad's projects, experience, skills, or background. I only answer from his portfolio.</p>
                <p className="portfolio-chat-quick-label">Try one:</p>
                <div className="portfolio-chat-quick-list">
                  {QUICK_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      type="button"
                      className="portfolio-chat-quick-chip"
                      onClick={() => handleQuickPrompt(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <MessageBubble
                key={i}
                role={msg.role}
                content={msg.content}
                sources={msg.sources}
                onSourceClick={handleSourceClick}
              />
            ))}
            {loading && (
              <div className="portfolio-chat-bubble portfolio-chat-bubble-bot">
                <div className="portfolio-chat-bubble-inner">
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="portfolio-chat-input-wrap" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              className="portfolio-chat-input"
              placeholder="Ask about projects, experience, skills..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              maxLength={1000}
              aria-label="Chat message"
            />
            <button
              type="submit"
              className="portfolio-chat-send"
              disabled={loading || !input.trim()}
              aria-label="Send"
            >
              Send
            </button>
          </form>
        </div>
      </motion.div>

      <motion.button
        type="button"
        className={`portfolio-chat-fab ${open ? "portfolio-chat-fab-hidden" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open portfolio chat"}
        whileHover={{ scale: open ? 1 : 1.05 }}
        whileTap={{ scale: open ? 1 : 0.95 }}
      >
        <span className="portfolio-chat-fab-icon">💬</span>
        <span className="portfolio-chat-fab-label">Ask about Varad</span>
      </motion.button>

      <style>{`
        .portfolio-chat-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.35);
          z-index: 9998;
          backdrop-filter: blur(4px);
        }
        .portfolio-chat-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1);
        }
        .portfolio-chat-panel {
          width: 100%;
          height: 100%;
          background: linear-gradient(165deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          display: flex;
          flex-direction: column;
          border-radius: 20px;
          overflow: hidden;
        }
        .portfolio-chat-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 18px;
          background: rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .portfolio-chat-avatar {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #1de9b6, #159c94);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #0f172a;
          font-size: 0.95rem;
        }
        .portfolio-chat-header-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .portfolio-chat-header-text strong {
          color: #f1f5f9;
          font-size: 1rem;
        }
        .portfolio-chat-subtitle {
          font-size: 0.75rem;
          color: #94a3b8;
        }
        .portfolio-chat-close {
          width: 36px;
          height: 36px;
          border: none;
          background: rgba(255,255,255,0.1);
          color: #94a3b8;
          border-radius: 10px;
          font-size: 1.4rem;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, color 0.2s;
        }
        .portfolio-chat-close:hover {
          background: rgba(255,255,255,0.15);
          color: #f1f5f9;
        }
        .portfolio-chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .portfolio-chat-welcome {
          color: #94a3b8;
          font-size: 0.9rem;
          line-height: 1.5;
        }
        .portfolio-chat-welcome p { margin: 0 0 12px; }
        .portfolio-chat-quick-label {
          font-size: 0.8rem;
          color: #64748b;
          margin-top: 16px !important;
        }
        .portfolio-chat-quick-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }
        .portfolio-chat-quick-chip {
          padding: 8px 14px;
          border-radius: 20px;
          border: 1px solid rgba(29, 233, 182, 0.4);
          background: rgba(29, 233, 182, 0.1);
          color: #1de9b6;
          font-size: 0.8rem;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }
        .portfolio-chat-quick-chip:hover {
          background: rgba(29, 233, 182, 0.2);
          transform: translateY(-1px);
        }
        .portfolio-chat-bubble {
          max-width: 88%;
          border-radius: 16px;
          padding: 12px 16px;
        }
        .portfolio-chat-bubble-user {
          align-self: flex-end;
          background: linear-gradient(135deg, #1de9b6, #159c94);
          color: #0f172a;
        }
        .portfolio-chat-bubble-bot {
          align-self: flex-start;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          color: #e2e8f0;
        }
        .portfolio-chat-bubble-inner {
          font-size: 0.9rem;
          line-height: 1.5;
          word-break: break-word;
        }
        .portfolio-chat-md-p {
          margin: 0 0 6px;
        }
        .portfolio-chat-md-p:last-child {
          margin-bottom: 0;
        }
        .portfolio-chat-md-list {
          margin: 4px 0 6px;
          padding-left: 18px;
        }
        .portfolio-chat-md-list li {
          margin-bottom: 4px;
        }
        .portfolio-chat-md-list li:last-child {
          margin-bottom: 0;
        }
        .portfolio-chat-sources {
          margin-top: 12px;
          padding-top: 10px;
          border-top: 1px solid rgba(255,255,255,0.12);
        }
        .portfolio-chat-sources-label {
          font-size: 0.75rem;
          color: #94a3b8;
          margin-right: 8px;
        }
        .portfolio-chat-source-link {
          display: inline-block;
          margin: 4px 8px 4px 0;
          padding: 4px 10px;
          border-radius: 8px;
          background: rgba(29, 233, 182, 0.15);
          color: #1de9b6;
          border: none;
          font-size: 0.78rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .portfolio-chat-source-link:hover {
          background: rgba(29, 233, 182, 0.25);
        }
        .portfolio-chat-typing {
          display: flex;
          gap: 6px;
          padding: 4px 0;
        }
        .portfolio-chat-typing span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #64748b;
          animation: portfolio-chat-bounce 0.6s ease-in-out infinite;
        }
        .portfolio-chat-typing span:nth-child(2) { animation-delay: 0.1s; }
        .portfolio-chat-typing span:nth-child(3) { animation-delay: 0.2s; }
        @keyframes portfolio-chat-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .portfolio-chat-input-wrap {
          display: flex;
          gap: 10px;
          padding: 14px 16px;
          background: rgba(0,0,0,0.2);
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .portfolio-chat-input {
          flex: 1;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.06);
          color: #f1f5f9;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .portfolio-chat-input::placeholder { color: #64748b; }
        .portfolio-chat-input:focus {
          border-color: #1de9b6;
          box-shadow: 0 0 0 2px rgba(29, 233, 182, 0.2);
        }
        .portfolio-chat-send {
          padding: 12px 20px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #1de9b6, #159c94);
          color: #0f172a;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
        }
        .portfolio-chat-send:hover:not(:disabled) {
          opacity: 0.95;
          transform: translateY(-1px);
        }
        .portfolio-chat-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .portfolio-chat-fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9997;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 22px;
          border-radius: 28px;
          border: none;
          background: linear-gradient(135deg, #1de9b6, #159c94);
          color: #0f172a;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(29, 233, 182, 0.4);
          transition: box-shadow 0.2s;
        }
        .portfolio-chat-fab:hover {
          box-shadow: 0 12px 32px rgba(29, 233, 182, 0.5);
        }
        .portfolio-chat-fab-icon {
          font-size: 1.3rem;
        }
        .portfolio-chat-fab-hidden {
          opacity: 0;
          pointer-events: none;
        }
        @media (max-width: 480px) {
          .portfolio-chat-fab-label { display: none; }
          .portfolio-chat-fab { padding: 16px; }
          .portfolio-chat-container { bottom: 16px; right: 16px; }
          .portfolio-chat-fab { bottom: 16px; right: 16px; }
        }
      `}</style>
    </>
  );
}
