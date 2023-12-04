import React from 'react';

const ChatMessageUser = ({ userMessage }) => {
  return (
    <div>
      <div className="chat-message">
        <div className="center-chat-message user">
          <div className="user-response">
            <div className="actual-user-msg" data-testid="user-message">{userMessage}</div>
          </div>
          <div className="avatar user">
            <img className="avatar-image" src={"/images/svg/user-avatar.svg"} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatMessageUser;
