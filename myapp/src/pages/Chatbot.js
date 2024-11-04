import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  const sendMessage = async () => {
    if (!message) return;

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponses([...responses, { user: message, bot: data.response }]);
        setMessage("");
      } else {
        console.error(data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "'Inter', sans-serif",
    },
    container: {
      width: "100%",
      maxWidth: "800px",
      background: "rgba(26, 26, 26, 0.95)",
      borderRadius: "16px",
      boxShadow: "0 24px 48px rgba(0, 0, 0, 0.4)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      overflow: "hidden",
    },
    header: {
      background: "#2a2a2a",
      padding: "1.5rem",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    },
    title: {
      margin: 0,
      color: "#ffffff",
      fontSize: "1.5rem",
      fontWeight: "600",
      textAlign: "center",
      background: "linear-gradient(120deg, #00c4ff, #00ff8f)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    chatContainer: {
      maxHeight: "500px",
      overflowY: "auto",
      padding: "1.5rem",
      background: "rgba(0, 0, 0, 0.2)",
    },
    messageGroup: {
      marginBottom: "1.5rem",
    },
    messageLabel: {
      display: "block",
      marginBottom: "0.5rem",
      color: "#888",
      fontSize: "0.9rem",
    },
    userMessage: {
      background: "rgba(0, 196, 255, 0.1)",
      color: "#fff",
      padding: "1rem",
      borderRadius: "12px",
      marginBottom: "1rem",
      borderLeft: "3px solid #00c4ff",
    },
    botMessage: {
      background: "rgba(0, 255, 143, 0.1)",
      color: "#fff",
      padding: "1rem",
      borderRadius: "12px",
      marginBottom: "1rem",
      borderLeft: "3px solid #00ff8f",
    },
    inputContainer: {
      padding: "1.5rem",
      background: "#2a2a2a",
      display: "flex",
      gap: "1rem",
    },
    input: {
      flex: 1,
      background: "rgba(0, 0, 0, 0.3)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "8px",
      padding: "1rem",
      color: "#fff",
      fontSize: "1rem",
      outline: "none",
      transition: "border-color 0.3s ease",
      "&:focus": {
        borderColor: "#00c4ff",
      },
    },
    button: {
      background: "linear-gradient(135deg, #00c4ff, #00ff8f)",
      color: "#000",
      border: "none",
      borderRadius: "8px",
      padding: "0 1.5rem",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      boxShadow: "0 4px 12px rgba(0, 196, 255, 0.2)",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 6px 16px rgba(0, 196, 255, 0.3)",
      },
    },
  };

  return (
    <div style={styles.wrapper}>
      <motion.div
        style={styles.container}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div style={styles.header}>
          <h1 style={styles.title}>AI Assistant</h1>
        </div>

        <div style={styles.chatContainer}>
          <AnimatePresence>
            {responses.map((resp, index) => (
              <motion.div
                key={index}
                style={styles.messageGroup}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
              >
                <div style={styles.userMessage}>
                  <span style={styles.messageLabel}>You</span>
                  {resp.user}
                </div>
                <div style={styles.botMessage}>
                  <span style={styles.messageLabel}>Assistant</span>
                  {resp.bot}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div style={styles.inputContainer}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            style={styles.input}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <motion.button
            onClick={sendMessage}
            style={styles.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Chatbot;
