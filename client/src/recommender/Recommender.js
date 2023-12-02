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
    if (userInput.length !== 0) {
      const userMessage = pushMessage(userInput);
      setMessages([...messages, userMessage]); // display the message
      setUserInput(""); // reset input field
    }
  }

  const handleClearLog = () => {
    setMessages([]);
  }


  const pushMessage = (message) => {
    return (
      <div>
        <div className="chat-message">
            <div className="center-chat-message user">
              <div className="avatar">
                <img className="avatar-image" src={"/images/svg/user-avatar.svg"}/>
              </div>
              <div className="bot-response">
                <p>{message}</p>
              </div>
            </div>
          </div>
          <div className="chat-message">
            <div className="center-chat-message recipeBot">
              <div className="avatar">
              <img className="avatar-image" src={"/images/svg/bot-avatar.svg"}/>
              </div>
              <div className="bot-response">
                <p>response</p>
              </div>
            </div>
          </div>
      </div>
    )
  }

  return (
    <div>
      <div>
        <button className="clearButton" onClick={handleClearLog}>Clear Messages</button>
      </div>
      <div className='chatBox'>
        <div className='chatBox chatLog' ref={messagesRef}>
          <div className='messages'>
            {messages.map((element) => { return (<div>{element}</div>) })}
          </div>
        </div >
      </div>
      <div className="inputDiv">
        <input className="textInputBox" type="text" value={userInput} placeholder="Chat with RecipeBot..." style={{ width: "625px", height: "36px" }} onChange={(e) => setUserInput(e.target.value)} />
        <div className="buttonDiv">
          <button className="submitButton" onClick={handleChatButtonSubmit}>Send</button>
        </div>
      </div>
    </div>

  );
}

export default RecipeRecommender;