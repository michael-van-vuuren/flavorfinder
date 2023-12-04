import React, { useState, useEffect, useRef } from 'react';
import OpenAI from 'openai'
import ChatInput from "./ChatInput.js"
import ChatMessageUser from "./ChatMessageUser"
import ChatMessageAssistant from "./ChatMessageAssistant"
import "./Recommender.css";

const RecipeRecommender = () => {
  const [messagesDivList, setMessagesDivList] = useState([]);
  const [messagesSenttoLLM, setMessagesSenttoLLM] = useState([{
    "role": "system", "content": "You are an assistant that is a professional in recommending recipes based on user preferences."
  }]);
  const messagesRef = useRef(null);

  // OpenAI config
  const openai = new OpenAI({
    apiKey: "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" // This is also the default, can be omitted
    , dangerouslyAllowBrowser: true
  });

  // scrolling logic for chatbox
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messagesDivList]);

  // helper functions
  const handleChatButtonSubmit = (message) => {
    const userMessage = pushUserMessage(message);
    setMessagesDivList([...messagesDivList, userMessage]); // how we keep track of divs
    const userMessageforLLM = { "role": "user", "content": message };
    setMessagesSenttoLLM([...messagesSenttoLLM, userMessageforLLM]); // what we send to the LLM

    // get response from LLM based on user input (message)
    const response = LLMResponse(message);

    // Handle the response from OpenAI and update the state accordingly
    const assistantMessage = response.choices[0].message.content;
    const assistantReply = pushAssistantMessage(assistantMessage);
    setMessagesDivList([...messagesDivList, assistantReply]); // how we keep track of divs
    const assistantMessageforLLM = { "role": "assistant", "content": assistantMessage };
    setMessagesSenttoLLM([...messagesSenttoLLM, assistantMessageforLLM]); // what we send to the LLM
  }

  const LLMResponse = async (userMessage) => {
    // Call OpenAI API
    try {
      return await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messagesSenttoLLM.concat([{ role: 'user', content: userMessage }])
      });
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
    }
  }

  const handleClearLog = () => {
    setMessagesDivList([]);
  }

  const pushUserMessage = (message) => {
    return (
      <ChatMessageUser userMessage={message} />
    )
  }

  const pushAssistantMessage = (message) => {
    return (
      <ChatMessageAssistant assistantMessage={message} />
    )
  }

  return (
    <div>
      <div>
        <button className="clearButton" style={{ marginBottom: "20px" }} onClick={handleClearLog}>Clear Messages</button>
      </div>
      <div className='chatBox'>
        <div className='chatBox chatLog' ref={messagesRef}>
          <div className='messages'>
            {messagesDivList.map((element) => { return (<div>{element}</div>) })}
          </div>
        </div >
      </div>
      <div className="inputDiv">
        <ChatInput onSubmit={handleChatButtonSubmit} />
      </div>
    </div>

  );
}

export default RecipeRecommender;