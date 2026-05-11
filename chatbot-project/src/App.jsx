import { useState, useEffect } from 'react'
import { Chatbot } from "supersimpledev";
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';
import ChatMessages from './components/ChatMessages';
import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem('messages')) || []
  );
  
  // Array Destructuring
  // const [chatMessages, setChatMessages] =  array;
  
  // const chatMessages = array[0]; // current data
  // const setChatMessages = array[1]; // return function (updater function)
  
  // Exercise 5h: add the response to the chatbot by using Chatbot.addResponses() in useEffect
  useEffect(() => {
    Chatbot.addResponses({
      "favorite game": "Wuthering Wave",

      "favorite food": () => {
        return 'Pizza';
      }
    })
  }, []);

  // Exercis 5j: save the message in localStorage
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <div className="app-container">
      <ChatMessages 
        chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}        
      />
    </div>
  );
}

export default App;
