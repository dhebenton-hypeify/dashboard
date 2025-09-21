import { useEffect, useState } from "react"
import { Atri, Copy, Pen, Reload } from "../../../../assets/Icons"
import { ButtonTrans } from "../../../../components/buttons/TransButton"

export default function Messages({ messages, loading }) {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    const last = messages[messages.length - 1]

    if (last && last.role === "assistant") {
      // If message already fully displayed (e.g., after refresh), skip animation
      if (displayedText === last.content) return

      let i = 0
      const interval = setInterval(() => {
        setDisplayedText(last.content.slice(0, i + 1))
        i++
        if (i >= last.content.length) clearInterval(interval)
      }, 30) // typing speed in ms

      return () => clearInterval(interval)
    } else {
      setDisplayedText("")
    }
  }, [messages])

  return (
    <div className="atri-chat-canvas f-col g8 flex">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`atri-message g12 ${msg.role === "user" ? "user" : "atri"} ${loading && msg.role === "assistant" ? "loading" : ""}`}
        >
          {msg.role === "assistant" && (
            <div className="atri-chat-icon-wrap cen">
              <Atri />
            </div>
          )}

          <p>
            {msg.role === "assistant" && idx === messages.length - 1
              ? displayedText || msg.content // animate if new, fallback if saved
              : msg.content}
          </p>

          <ButtonTrans>
            <Copy />
          </ButtonTrans>

          {msg.role === "user" ? (
            <ButtonTrans>
              <Pen />
            </ButtonTrans>
          ) : (
            <ButtonTrans>
              <Reload />
            </ButtonTrans>
          )}
        </div>
      ))}

      {loading && (
        <div className="atri-message atri g12 loading">
          <div className="atri-chat-icon-wrap cen">
            <Atri />
          </div>
          <p>...</p>
        </div>
      )}
    </div>
  )
}
