import e from 'cors';
import React, { useState } from 'react';
import "./Recommender.css";

const RecipeRecommender = () => {
  const [userInput, setUserInput] = useState("");
  const [shownUserText, setShownUserText] = useState("");


  const handleChatButtonSubmit = () => {
    setShownUserText(userInput);

  }
  return (
    <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
      <div className='chatBox' >

        {shownUserText}
        <div className="inputDiv">
          <input type="text" placeholder="Message RecipeBot..." style={{ width: "500px", }} onChange={(e) => setUserInput(e.target.value)} />
          <button onClick={handleChatButtonSubmit} style={{ backgroundColor: "green" }}></button>
        </div>



      </div >
    </div>

  );
}

export default RecipeRecommender;
