import React, { useState } from 'react';
import "./Pantry.css";
import SearchBar from "./SearchBar.js";
import DropDown from "./DropDown.js";

const Pantry = ({ stuff }) => {
  const [ingredientIdToAdd, setIngredientIdToAdd] = useState("");
  const [quantityToAdd, setQuantityToAdd] = useState("");
  const [unitsToAdd, setUnitsToAdd] = useState("Select Units");
  const [addedIngredients, setAddedIngredients] = useState([]);

  const getIngredientNameById = (id) => {
    const ingredient = stuff.find(item => item._id === id);
    return ingredient ? ingredient.name : '';
  };

  const handleIngredient = (id) => {
    setIngredientIdToAdd(id);
  };

  const handleQuantity = (event) => {
    const quantity = event.target.value;
    setQuantityToAdd(quantity);
  };

  const handleUnits = (units) => {
    setUnitsToAdd(units);
  };

  const isValidIngredientId = (id) => {
    return stuff.some((item) => item._id === id);
  };

  const isValidQuantity = (quantity) => {
    return !isNaN(+quantity);
  };

  // TODO: When the Add button is clicked, send object to database
  const handleAdd = () => {
    if (
      unitsToAdd !== "Select Units" &&
      isValidQuantity(quantityToAdd) &&
      isValidIngredientId(ingredientIdToAdd)
    ) {
      const newIngredient = {
        ingredientId: ingredientIdToAdd,
        quantity: quantityToAdd,
        units: unitsToAdd,
      };
      setAddedIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    } else {
      console.log("Invalid input");
    }
  };

  return (
    <div>
      <h2 id="pantry-title">Add ingredients</h2>
      <div className="pantry-buttons">
        <div className="button 1">
          <SearchBar
            placeholder="Enter an Ingredient..."
            ingredients={stuff}
            toSelectIngredient={handleIngredient}
          />
        </div>
        <div className="button 2">
          <input
            type="text"
            placeholder="Enter a Quantity..."
            onChange={handleQuantity}
            value={quantityToAdd}
          />
        </div>
        <div className="button 3">
          <DropDown toSelectUnits={handleUnits} />
        </div>
        <div>
          <button className="add-button" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
      {/* Display added ingredients */}
      {addedIngredients.length > 0 && (
        <div className='ingredient-list'>
          <ul>
            {addedIngredients.map((ingredient, index) => (
              <li key={index}>
                <span style={{ color: '#99e386', fontWeight: 'bold' }}>+</span> {ingredient.quantity} {ingredient.units} of {getIngredientNameById(ingredient.ingredientId)}s
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Pantry;
