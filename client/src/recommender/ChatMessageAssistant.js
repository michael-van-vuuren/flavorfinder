import React from 'react';

const ChatMessageAssistant = ({ assistantMessage }) => {
  return (
    <div>
      <div className="chat-message">
        <div className="center-chat-message recipeBot">
          <div className="avatar">
            <img className="avatar-image" src={"/images/svg/bot-avatar.svg"} />
          </div>
          <div className="bot-response">
            <p onClick={() => {}} style={{marginLeft: '18px', cursor: 'pointer'}}>{assistantMessage}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatMessageAssistant;
