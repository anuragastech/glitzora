import { useState } from "react";
import "./chatbot.css";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 Welcome to Glitzora!" }
  ]);

  const phoneNumber = "919995937035";

  const sendMessage = (text) => {
    setMessages((prev) => [...prev, { from: "user", text }]);

    let reply = "";

    if (text === "Price") {
      reply = "Prices are shown in each product 💰";
    } else if (text === "Delivery") {
      reply = "Delivery within 3-5 days 🚚";
    } else if (text === "WhatsApp") {
      window.open(`https://wa.me/${phoneNumber}`, "_blank");
      return;
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    }, 500);
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      <div className="chat-icon" onClick={() => setOpen(!open)}>
        💬
      </div>

      {/* CHAT BOX */}
      {open && (
        <div className="chat-box">
          <div className="chat-header">Glitzora Chat</div>

          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={m.from === "bot" ? "bot" : "user"}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="chat-options">
            <button onClick={() => sendMessage("Price")}>Price</button>
            <button onClick={() => sendMessage("Delivery")}>Delivery</button>
            <button onClick={() => sendMessage("WhatsApp")}>WhatsApp</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;