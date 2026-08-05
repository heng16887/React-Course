import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import './ChatMessages.css';

function ChatMessages({ chatMessages }) {
  // useRef = automatically save an HTML element from the component. ref is the container with special React feature
  const chatMessagesRef = useRef(null); // this is initial value

  // useEffect = run code after component is created or updated
  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="chat-message-container" 
        ref={chatMessagesRef}>
      {chatMessages.length === 0 ? (
        <p className="welcome-chat-message">
          Welcome to the chatbot project! Send a message using the textbox below.
        </p>
      ) 
      :
      chatMessages.map((chatMessage) => {
          return (
            <ChatMessage
              message={chatMessage.message}
              sender={chatMessage.sender}
              key={chatMessage.id}
              time={chatMessage.time}
            />
          );
        })
      }
    </div>
  );
}

export default ChatMessages;