import React, { useState, useRef } from 'react'
import "./ChatInput.css"

const ChatInput = ({ onSubmit }) => {
  const [userInput, setUserInput] = useState("")
  const inputRef = useRef(null)

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  const handleSubmit = () => {
    if (userInput.length !== 0) {
      onSubmit(userInput);
      setUserInput("");
    }
  }

  return (
    <div>
      <div className="inputDiv">
            <input
                ref={inputRef}
                className="textInputBox"
                type="text"
                value={userInput}
                placeholder="Chat with RecipeBot..."
                style={{ width: "625px", height: "36px" }}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <div className="buttonDiv">
                <button className="submitButton" onClick={handleSubmit}>Send</button>
            </div>
        </div>
    </div>
  )
}

export default ChatInput;