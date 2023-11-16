import React, { useState, useEffect, useRef } from 'react'
import pluralizeIngredient from '../utility/pluralizeIngredient.js'
import "./Pantry.css"
import SearchBar from "./SearchBar.js"
import DropDown from "./DropDown.js"

const Pantry = ({ stuff }) => {
  const [ingredientIdToAdd, setIngredientIdToAdd] = useState("")
  const [quantityToAdd, setQuantityToAdd] = useState("")
  const [unitsToAdd, setUnitsToAdd] = useState("Select Units")
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

  // TODO: When the Add button is clicked, send object to database
  const handleAdd = async () => {
    if (
      unitsToAdd !== "Select Units" &&
      isValidQuantity(quantityToAdd) &&
      isValidIngredientId(ingredientIdToAdd)
    ) {
      // Fetch image
      const imageData = await fetchImage(ingredientIdToAdd)

      // Add ingredient with image to state
      setAddedIngredients((prevIngredients) => [
        ...prevIngredients,
        {
          ingredientId: ingredientIdToAdd,
          quantity: quantityToAdd,
          units: unitsToAdd,
          image: imageData.image,
        },
      ])

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
    const updatedIngredients = [...addedIngredients]
    updatedIngredients.splice(index, 1)
    setAddedIngredients(updatedIngredients)
  }

  const handleConfirm = () => {
    console.log(`confirmed: ${addedIngredients}`)
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
        <div className='ingredient-list' ref={ingredientListRef}>
          <ul>
            {addedIngredients.map((ingredient, index) => (
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
        <button className="confirm-button" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  )
}

export default Pantry
