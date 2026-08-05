import { useState } from "react";
import { Chatbot } from "supersimpledev";
import loadingSpinner from "../assets/loading-spinner.gif";
import './ChatInput.css';
import dayjs from "dayjs";
import ChatMessages from "./ChatMessages";

type ChatMessages = {
  id: string;
  message: string | React.JSX.Element;
  sender: string;
  time: number;
}[]; 

type ChatInputProps = {
  chatMessages: ChatMessages;
  setChatMessages: (chatMessages: ChatMessages) => void;
};

export function ChatInput({ chatMessages, setChatMessages }: ChatInputProps) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setLoading] = useState(false);
  
  function saveInputText(event: 
    {target: 
      {value: string;
  }}) {
    setInputText(event.target.value); // this gives us the element that we're typing in
  }

  function handleEvent(event: React.KeyboardEvent<HTMLInputElement>){
    if(event.key === 'Escape')
      // if you see value (red line), you can also add this (event.target as HTMLInputElement) because typescript reads (value) as HTML input element.
      event.currentTarget.value = '';

    if(event.key === 'Enter')
      sendMessage();
  }

  // Exercise 5k: create clear button and update localStorage
  function clearMessages(){
    setInputText("");

    localStorage.removeItem('messages');
  }

  async function sendMessage() {
    if(isLoading || inputText === "") return;

    setLoading(true);

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      },
    ];

    setChatMessages([
      ...newChatMessages,
      {
        message: <img src={loadingSpinner} className="loading-spinner-img" />,
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ]);

    setInputText('');

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ]);

    setLoading(false);
    setInputText(""); // after texting, it will clear the text (this is controlled input)
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size={30}
        onChange={saveInputText}
        onKeyDown={handleEvent}
        value={inputText}
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>

      <button onClick={clearMessages} className="clear-button">
        Clear
      </button>
    </div>
  );
}

export default ChatInput;