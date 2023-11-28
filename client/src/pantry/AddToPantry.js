import React, { useState, useEffect, useRef } from 'react'
import SearchBar from "./SearchBar.js"
import DropDown from "./DropDown.js"
import pluralizeIngredient from '../utility/pluralizeIngredient.js'
import './Pantry.css'

const AddToPantry = ({ pantryAddition, setPantryAddition, ingredients }) => {
  const [idSelected, setIdSelected] = useState("")
  const [quantitySelected, setQuantitySelected] = useState("")
  const [unitSelected, setUnitSelected] = useState("Select Units")

  const selectQuantity = (event) => { setQuantitySelected(event.target.value) }
  const selectIngredient = (id) => { setIdSelected(id) }
  const selectUnit = (unit) => { setUnitSelected(unit) }
  
  const [scrollToBottom, setScrollToBottom] = useState(false)
  const ingredientListRef = useRef(null)

  useEffect(() => {
    console.log(ingredients)
    if (scrollToBottom && ingredientListRef.current) {
      ingredientListRef.current.scrollTop = ingredientListRef.current.scrollHeight
      setScrollToBottom(false)
    }
  }, [scrollToBottom])

  // TODO
  const fetchImageBlobFromServer = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/ingredients/images/${id}`)
      return await response.json()
    } catch (e) {
      console.error('Error fetching image:', e)
    }
  }

  const getIngredientNameById = (id) => { return ingredients.find(item => item._id === id).name }
  const getIngredientImageById = (id) => { return ingredients.find(item => item._id === id).image }

  const handleAdd = async () => {
    const ingredientObj = createIngredient()
    console.log(ingredientObj)
    if (isValid(ingredientObj)) {
      setPantryAddition((prevIngredients) => [...prevIngredients, ingredientObj]) // Sent to database
      setScrollToBottom(true)
    } else {
      console.log("Invalid input")
    }
  }

  const createIngredient = () => ({
    name: getIngredientNameById(idSelected),
    ingredientId: idSelected,
    quantity: parseFloat(quantitySelected),
    units: unitSelected,
    image: getIngredientImageById(idSelected)
  })

  const handleRemove = (index) => {
    const pantryAdditionCopy = [...pantryAddition]
    pantryAdditionCopy.splice(index, 1)
    setPantryAddition(pantryAdditionCopy)
  }

  const isValid = ({ ingredientId, quantity, units }) => {
    return ingredients.some((item) => item._id === ingredientId) &&
           !isNaN(+quantity) &&
           units !== "Select Units"
  }

  return (
    <div>
      <h2 id="pantry-title">Add ingredients</h2>
      <div className="pantry-interactives">
        <div className="search">
          <SearchBar
            placeholder="Enter an Ingredient..."
            ingredients={ingredients}
            toSelectIngredient={selectIngredient}
          />
        </div>
        <div className="quantity">
          <input
            placeholder="Enter a Quantity..."
            onChange={selectQuantity}
            value={quantitySelected}
          />
        </div>
        <div className="unit">
          <DropDown toSelectUnits={selectUnit} />
        </div>
        <div>
          <button className="add-button" onClick={handleAdd}>Add</button>
        </div>
      </div>

      {pantryAddition.length > 0 ? (
        <div className='ingredient-list' ref={ingredientListRef}>
          <ul>
            {pantryAddition.map((ingredient, index) => (
              <li key={index} className='highlight'>
                <span style={{ color: '#99e386', fontWeight: 'bold' }}>+&ensp;</span>
                {ingredient.quantity} {ingredient.units} of {pluralizeIngredient(getIngredientNameById(ingredient.ingredientId), ingredient.quantity)}
                {ingredient.image && (
                  <img src={ingredient.image} alt="Ingredient" className="ingredient-image" />
                )}
                <button className="remove-button" onClick={() => handleRemove(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className='ingredient-list' ref={ingredientListRef}></div>
      )}
    </div>
  )

}

export default AddToPantry