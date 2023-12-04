import React, { useState, useEffect, useRef } from 'react';
import OpenAI from 'openai'
import ChatInput from "./ChatInput.js"
import ChatMessageUser from "./ChatMessageUser"
import ChatMessageAssistant from "./ChatMessageAssistant"
import "./Recommender.css";

const RecipeRecommender = () => {
  const [messagesDivList, setMessagesDivList] = useState([]);
  const [messagesSenttoLLM, setMessagesSenttoLLM] = useState([{
    "role": "system", "content": "You are an assistant that is a professional in recommending recipes based on user preferences and recipes that a user can make. Respond with just the recipe and id number (in this format: 'ID: x, Recipe: y'). Here are the recipes: {id:1,tomato soup},{id:2,butter chicken},{id:3,lemon cod and rice},{id:4,ahi poke}"
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
  const handleChatButtonSubmit = async (message) => {
    const userMessage = pushUserMessage(message);
    setMessagesDivList((prevMessages) => [...prevMessages, userMessage]); // how we keep track of divs
    const userMessageforLLM = { "role": "user", "content": message };
    setMessagesSenttoLLM([...messagesSenttoLLM, userMessageforLLM]); // what we send to the LLM

    // get response from LLM based on user input (message)
    const response = await LLMResponse(message);

    // Handle the response from OpenAI and update the state accordingly
    const assistantMessage = response.choices[0].message.content;
    const recipeId = messageParse(assistantMessage);

    // Get recipe information from backend

    const assistantReply = pushAssistantMessage(assistantMessage);
    setMessagesDivList((prevMessages) => [...prevMessages, assistantReply]); // how we keep track of divs
    const assistantMessageforLLM = { "role": "assistant", "content": assistantMessage };
    setMessagesSenttoLLM([...messagesSenttoLLM, assistantMessageforLLM]); // what we send to the LLM
  }

  // Get recipe ID from GPT's response
  // Message in form "ID: x, Recipe: y"
  const messageParse = (message) => {
    const splitString = message.split(',');
    const idPart = splitString.find(part => part.includes('ID:'));
    if (idPart) {
      const extractedId = idPart.split(':')[1].trim();
      return extractedId;
    } else {
      console.log("Could not find ID");
    }
    return null;
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