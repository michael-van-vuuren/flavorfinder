import e from 'cors';
import React, { useState, useEffect, useRef } from 'react';
import "./Recommender.css";

const RecipeRecommender = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([])
  const messagesRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the messages when messages are updated
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);


  const handleChatButtonSubmit = () => {
    const userMessage = pushMessage(userInput);
    setMessages([...messages, userMessage]); // display the message
    setUserInput(""); // reset input field
  }

  const handleClearLog = () => {
    setMessages([]);
  }


  const pushMessage = (message) => {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div className='indivdualMessage'>
            <p>
              Me:
            </p>
            <p>{message}</p>

          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div className='botMessage'>
            <p>RecipeBot:</p>
            <p>response</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={handleClearLog}>Clear Messages</button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
        <div className='chatBox' ref={messagesRef}>
          <div className='messages'>
            {messages.map((element) => { return (<div style={{ marginBottom: "10px" }}>{element}</div>) })}
          </div>

        </div >
      </div>
      <div className="inputDiv">
        <input type="text" value={userInput} placeholder="Chat with RecipeBot..." style={{ width: "500px", }} onChange={(e) => setUserInput(e.target.value)} />
        <button onClick={handleChatButtonSubmit} style={{ backgroundColor: "rgb(97, 172, 246)", color: "white", borderRadius: "10px" }}>Send</button>
      </div>
    </div>

  );
}

export default RecipeRecommender;
