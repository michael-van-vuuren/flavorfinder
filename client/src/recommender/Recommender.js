import React, { useState, useEffect, useRef } from 'react'
import ChatInput from "./ChatInput.js"
import ChatMessageBox from "./ChatMessageBox"
import "./Recommender.css"

const RecipeRecommender = () => {
  const [messages, setMessages] = useState([])
  const messagesRef = useRef(null)

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  const handleChatButtonSubmit = (message) => {
    const userMessage = pushMessage(message)
    setMessages([...messages, userMessage])
  }

  const handleClearLog = () => {
    setMessages([])
  }

  const pushMessage = (message) => {
    return (
      <ChatMessageBox userMessage={message}/> 
    )
  }

  return (
    <div>
      <div>
        <button className="clearButton" style={{marginBottom: "20px"}} onClick={handleClearLog}>Clear Messages</button>
      </div>
      <div className='chatBox'>
        <div className='chatBox chatLog' ref={messagesRef}>
          <div className='messages'>
            {messages.map((element, index) => { return (<div key={index}>{element}</div>) })}
          </div>
        </div >
      </div>
      <div className="inputDiv">
        <ChatInput onSubmit={handleChatButtonSubmit}/>
      </div>
    </div>

  )
}

export default RecipeRecommender