import React, { useState, useEffect, useRef } from 'react'
import SearchBar from "./SearchBar.js"
import DropDown from "./DropDown.js"
import IngredientList from './IngredientList.js'
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
    if (scrollToBottom && ingredientListRef.current) {
      ingredientListRef.current.scrollTop = ingredientListRef.current.scrollHeight
      setScrollToBottom(false)
    }
  }, [scrollToBottom])

  const getIngredientNameById = (id) => {
    if (id) { return ingredients.find(item => item._id === id).name }
    else { return '' }
  }
  const getIngredientImageById = (id) => {
    if (id) { return ingredients.find(item => item._id === id).image }
    else { return '' }
  }

  const handleAdd = async () => {
    const ingredientObj = createIngredient()
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
    return ingredientId &&
      ingredients.some((item) => item._id === ingredientId) &&
      !isNaN(+quantity) && quantity > 0.0 &&
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

      <div className='pantry-add-page'>
        <div className='ingredient-list' ref={ingredientListRef}>
          <ul>
            <IngredientList mode={false} pantry={pantryAddition} removeToggle={true} handleRowClick={() => {}} handleRemove={handleRemove} />
          </ul>
        </div>
      </div>

    </div>
  )
}

export default AddToPantry