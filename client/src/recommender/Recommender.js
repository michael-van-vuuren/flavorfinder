import e from 'cors';
import React, { useState } from 'react';
import "./Recommender.css";

const RecipeRecommender = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([])



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
        <div className='indivdualMessage'>
          <p>
            Me:
          </p>
          <p>{message}</p>

        </div>
        <div className='indivdualMessage'>
          <p>RecipeBot:</p>
          <p>response</p>
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
        <div className='chatBox' >
          <div className='messages'>
            {messages.map((element) => { return (<div style={{ marginBottom: "10px" }}>{element}</div>) })}
          </div>

          <div className="inputDiv">
            <input type="text" value={userInput} placeholder="Chat with RecipeBot..." style={{ width: "500px", }} onChange={(e) => setUserInput(e.target.value)} />
            <button onClick={handleChatButtonSubmit} style={{ backgroundColor: "green" }}></button>
          </div>
        </div >
      </div>
    </div>

  );
}

export default RecipeRecommender;
