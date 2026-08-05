import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import './ChatMessages.css';

type chatMessagesProps = {
  chatMessages: {
    id: string;
    message: string;
    sender: string;
    time: number;
  }[];
};

function ChatMessages({ chatMessages }: chatMessagesProps) {
  // useRef = automatically save an HTML element from the component. ref is the container with special React feature

  // In exercise 11i, because of typescript, the exercise said: use <> --> useRef<HTMLDivElement>(null) to fix an error of containerElem (line 20)
  const chatMessagesRef = useRef<HTMLDivElement>(null); // this is initial value

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