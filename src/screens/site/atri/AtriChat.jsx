import { useState, useEffect } from "react";
import { Atri, Cloud, Analytics, Performance, Chevron, Plus, Up } from "../../../assets/Icons";
import { ButtonMainBlueIconLight } from "../../../components/buttons/ButtonMain";
import { ButtonTrans } from "../../../components/buttons/TransButton";
import "./AtriChat.css";
import Messages from "./Components/Messages";

export default function AtriChat() {
  const [inputFocus, setInputFocus] = useState(false);
  const [chatActivated, setChatActivated] = useState(false);
  const [chatHeadingRender, setChatHeadingRender] = useState(true);
  const [messages, setMessages] = useState([]); // { role: "user" | "assistant", content: string }
  const [loading, setLoading] = useState(false);

  // Ensure sessionId persists across refresh but resets on tab close
  const [sessionId, setSessionId] = useState(null);
  useEffect(() => {
    let existing = sessionStorage.getItem("atri-session-id");
    if (!existing) {
      existing = crypto.randomUUID(); // unique ID for this tab
      sessionStorage.setItem("atri-session-id", existing);
    }
    setSessionId(existing);
  }, []);

  function handleChatActivation() {
    setChatActivated(true);
    setTimeout(() => setChatHeadingRender(false), 900);
  }

  async function handleSend(input) {
    if (!input.trim() || !sessionId) return;
    handleChatActivation();

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setLoading(true);

    try {
      const res = await fetch("https://dashboard.hypeify.io/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, sessionId }), // include sessionId
      });

      if (!res.ok) {
        console.error("Chat request failed", await res.text());
        return;
      }

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="content-wrap-top-pad atri">
      <div className={`atr-wrap f-col mob-pad g36 ${chatActivated ? "active" : ""}`}>
        {chatHeadingRender && (
          <div className="atri-heading-wrap f-col g16">
            <div className="atri-chat-icon-wrap cen">
              <Atri />
            </div>
            <h2>How can I assist you today, David?</h2>
          </div>
        )}

        <div className="atri-chat-message-wrap flex">
          {chatActivated && <Messages messages={messages} loading={loading} />}
        </div>

        {/* Input + prompt suggestions */}
        <div className="atri-input-canvas-wrap g12">
          {chatHeadingRender && (
            <div className="f-col prompt-suggestions-wrap g8">
              <button className="prompt-suggestion f-row g10" onClick={() => handleSend("Show me top analytics insights from the past 30 days.")}>
                <Cloud />
                Show me top analytics insights from the past 30 days.
              </button>
              <button className="prompt-suggestion f-row g10" onClick={() => handleSend("Compare the last two deployments and highlight improvements or regressions.")}>
                <Analytics />
                Compare the last two deployments and highlight improvements or regressions
              </button>
              <button className="prompt-suggestion f-row g10" onClick={() => handleSend("Give me a Lighthouse breakdown for performance, accessibility, SEO, and best practices.")}>
                <Performance />
                Give me a Lighthouse breakdown for performance, accessibility, SEO, and best practices
              </button>
            </div>
          )}

          <ButtonTrans style="not-finished">
            <Plus />
          </ButtonTrans>

          <button className="f-row not-finished g8 atri-theme-dropdown">
            <Atri style="atri" />
            General
            <Chevron style="chevron" />
          </button>

          <div className={`atri-input trans ${inputFocus ? "focus" : ""}`}>
            <input
              type="text"
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
              placeholder="Ask your question"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSend(e.target.value);
                  e.target.value = "";
                }
              }}
            />
            <ButtonMainBlueIconLight
              click={() => {
                const input = document.querySelector(".atri-input input");
                if (input && input.value) {
                  handleSend(input.value);
                  input.value = "";
                }
              }}
            >
              <Up />
            </ButtonMainBlueIconLight>
          </div>
        </div>
      </div>
    </div>
  );
}
