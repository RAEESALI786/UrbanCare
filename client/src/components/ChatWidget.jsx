import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";

const WELCOME = {
  role: "assistant",
  content:
    "Hi! I'm the UrbanCare assistant. Ask me about our services, get a painting quote, or say something like \"book a plumber for tomorrow at 3pm\" and I'll walk you through it.",
};

export default function ChatWidget() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, busy]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;

    setError("");
    setInput("");
    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setBusy(true);

    try {
      // Send only role+content (strip the initial local-only welcome message)
      const apiMessages = nextMessages
        .filter((m) => m !== WELCOME)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await api.post("/assistant/chat", { messages: apiMessages });
      setMessages((prev) => [...prev, { role: "assistant", content: res.data.reply }]);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Couldn't reach the assistant. Make sure the backend is running and ANTHROPIC_API_KEY is set."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close assistant" : "Open assistant"}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-navy text-cream shadow-lift transition-transform hover:-translate-y-0.5 focus-ring"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-line bg-cream shadow-lift">
          <div className="flex items-center gap-2 bg-navy px-4 py-3 text-cream">
            <Sparkles size={16} className="text-brass-light" />
            <div>
              <p className="font-display text-sm leading-none">UrbanCare Assistant</p>
              <p className="mt-0.5 text-[11px] text-cream/60">
                {user ? "Ready to help & book" : "Log in to book directly"}
              </p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-navy text-cream"
                    : "mr-auto border border-line bg-paper text-ink"
                }`}
              >
                {m.content}
              </div>
            ))}
            {busy && (
              <div className="mr-auto max-w-[85%] rounded-2xl border border-line bg-paper px-3.5 py-2.5 text-sm text-ink-soft">
                Thinking…
              </div>
            )}
            {error && (
              <div className="mr-auto max-w-[90%] rounded-2xl border border-brass/40 bg-brass/10 px-3.5 py-2.5 text-xs text-brass-dark">
                {error}
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-line p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask or book a service…"
              className="flex-1 rounded-full border border-line bg-paper px-4 py-2.5 text-sm outline-none focus:border-brass focus-ring"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-cream transition-opacity disabled:opacity-40 focus-ring"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
