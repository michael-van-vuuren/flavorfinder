import React, { useState, useEffect, useRef } from 'react'
import pluralizeIngredient from '../utility/pluralizeIngredient.js'
import "./Pantry.css"
import SearchBar from "./SearchBar.js"
import DropDown from "./DropDown.js"

const Pantry = ({ stuff, setAddingIngredients }) => {
  const [ingredientIdToAdd, setIngredientIdToAdd] = useState("")
  const [quantityToAdd, setQuantityToAdd] = useState("")
  const [unitsToAdd, setUnitsToAdd] = useState("Select Units")
  const [addedIngredientsDisplay, setAddedIngredientsDisplay] = useState([])
  const [addedIngredients, setAddedIngredients] = useState([])

  const [scrollToBottom, setScrollToBottom] = useState(false)
  const ingredientListRef = useRef(null)

  const getIngredientNameById = (id) => {
    const ingredient = stuff.find(item => item._id === id)
    return ingredient ? ingredient.name : ''
  }

  const handleIngredient = (id) => {
    setIngredientIdToAdd(id)
  }

  const handleQuantity = (event) => {
    const quantity = event.target.value
    setQuantityToAdd(quantity)
  }

  const handleUnits = (units) => {
    setUnitsToAdd(units)
  }

  const isValidIngredientId = (id) => {
    return stuff.some((item) => item._id === id)
  }

  const isValidQuantity = (quantity) => {
    return !isNaN(+quantity)
  }

  const createIngredient = () => ({
    ingredientId: ingredientIdToAdd,
    quantity: parseInt(quantityToAdd),
    units: unitsToAdd,
  })

  // TODO: When the Add button is clicked, send object to database
  const handleAdd = async () => {
    if (
      unitsToAdd !== "Select Units" &&
      isValidQuantity(quantityToAdd) &&
      isValidIngredientId(ingredientIdToAdd)
    ) {
      // Create ingredient
      const ingredientObj = createIngredient()
      const imageData = await fetchImage(ingredientIdToAdd)
      // Sent to database
      setAddedIngredients((prevIngredients) => [...prevIngredients, ingredientObj])
      // Used in frontend ingredient display
      setAddedIngredientsDisplay((prevIngredients) => [...prevIngredients, { ...ingredientObj, image: imageData.image }])
      
      setScrollToBottom(true)
    } else {
      console.log("Invalid input")
    }
  }

  useEffect(() => {
    if (scrollToBottom && ingredientListRef.current) {
      ingredientListRef.current.scrollTop = ingredientListRef.current.scrollHeight
      setScrollToBottom(false)
    }
  }, [scrollToBottom])

  const handleRemove = (index) => {
    const updatedIngredients = [...addedIngredientsDisplay]
    updatedIngredients.splice(index, 1)
    setAddedIngredientsDisplay(updatedIngredients)
  }

  const handleConfirm = async (id, addToPantry) => {
    console.log(addedIngredients)
    setAddedIngredients([])
    setAddedIngredientsDisplay([])
    try {
      const url = `http://localhost:3001/api/v1/users/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pantry: addToPantry,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update pantry: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result);

      setAddingIngredients(false);
    } catch (e) {
      console.error('Error updating pantry:', e.message);
    }
  }

  const fetchImage = async (ingredientId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/ingredients/images/${ingredientId}`)
      return await response.json()
    } catch (error) {
      console.error('Error fetching image:', error)
    }
  }

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
      {addedIngredientsDisplay.length > 0 && (
        <div className='ingredient-list' ref={ingredientListRef}>
          <ul>
            {addedIngredientsDisplay.map((ingredient, index) => (
              <li key={index} className='highlight'>
                <span style={{ color: '#99e386', fontWeight: 'bold' }}>+&ensp;</span>
                {ingredient.quantity} {ingredient.units} of {pluralizeIngredient(getIngredientNameById(ingredient.ingredientId), ingredient.units)}
                {ingredient.image && (
                  <img src={ingredient.image} alt="Ingredient" className="ingredient-image" />
                )}
                <button className="remove-button" onClick={() => handleRemove(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        {/* michael - 6556b9a6b7de3c37de02c24b
            tom     - 6556d131755e12ed18838678 */}
        <button className="confirm-button" onClick={() => handleConfirm('6556d131755e12ed18838678', addedIngredients)}>
          Confirm
        </button>
      </div>
    </div>
  )
}

export default Pantry
