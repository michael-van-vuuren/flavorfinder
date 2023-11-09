import React from 'react';
import "./Pantry.css";

const Pantry = () => {
  return (
    <div>
      <h2 id="pantry-title">Add ingredients</h2>
        <select id="fruitSelect">
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="cherry">Cherry</option>
        <option value="grape">Grape</option>
        <option value="orange">Orange</option>
        <option value="strawberry">Strawberry</option>
        <option value="watermelon">Watermelon</option>
        </select>
    </div>
  );
}

export default Pantry;
