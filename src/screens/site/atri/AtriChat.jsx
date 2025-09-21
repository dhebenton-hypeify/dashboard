import { useEffect, useRef, useState } from "react"
import { Atri, Cloud, Analytics, Performance, Chevron, Plus, Up } from "../../../assets/Icons"
import { ButtonMainBlueIconLight } from "../../../components/buttons/ButtonMain"
import { ButtonTrans } from "../../../components/buttons/TransButton"
import "./AtriChat.css"
import Messages from "./Components/Messages"

export default function AtriChat() {
  const [inputFocus, setInputFocus] = useState(false)
  const [chatActivated, setChatActivated] = useState(false)
  const [chatHeadingRender, setChatHeadingRender] = useState(true)
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("atri-messages")
    return saved ? JSON.parse(saved) : [] // restore from localStorage
  })
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState("")

  const messageWrapRef = useRef(null)

  // Persist messages to localStorage
  useEffect(() => {
    localStorage.setItem("atri-messages", JSON.stringify(messages))
  }, [messages])

  // Clear messages only when tab closes
  useEffect(() => {
    const clearOnUnload = () => {
      localStorage.removeItem("atri-messages")
    }
    window.addEventListener("beforeunload", clearOnUnload)
    return () => window.removeEventListener("beforeunload", clearOnUnload)
  }, [])

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (messageWrapRef.current) {
      messageWrapRef.current.scrollTop = messageWrapRef.current.scrollHeight
    }
  }, [messages, loading])

  function handleChatActivation() {
    setChatActivated(true)
    setTimeout(() => setChatHeadingRender(false), 900)
  }

  async function handleSend(input) {
    if (!input.trim()) return
    handleChatActivation()

    setMessages((prev) => [...prev, { role: "user", content: input }])
    setLoading(true)

    try {
      const res = await fetch("https://dashboard.hypeify.io/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })

      if (!res.ok) {
        console.error("Chat request failed", await res.text())
        return
      }

      const data = await res.json()
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }])
      }
    } catch (err) {
      console.error("Chat error:", err)
    } finally {
      setLoading(false)
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

        <div className="atri-chat-message-wrap flex" ref={messageWrapRef}>
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
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
              placeholder="Ask your question"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleSend(value)
                  setValue("")
                }
              }}
            />
            <ButtonMainBlueIconLight
              click={() => {
                if (value) {
                  handleSend(value)
                  setValue("")
                }
              }}
            >
              <Up />
            </ButtonMainBlueIconLight>
          </div>
        </div>
      </div>
    </div>
  )
}
