import React from 'react';

const ChatMessageBox = ({ userMessage }) => {
    return (
        <div>
          <div className="chat-message">
              <div className="center-chat-message user">
                <div className="user-response">
                  <div className="actual-user-msg">{userMessage}</div>
                </div>
                <div className="avatar user">
                  <img className="avatar-image" src={"/images/svg/user-avatar.svg"}/>
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

export default ChatMessageBox;
