import React, { useState } from 'react'
import "./SearchBar.css"

function SearchBar({ placeholder, ingredients, toSelectIngredient }) {
  const [filteredIngredients, setFilteredIngredients] = useState([])
  const [ingredientEntered, setIngredientEntered] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleFilter = (event) => {
    const searchInput = event.target.value.toLowerCase()
    console.log(searchInput)
    setIngredientEntered(searchInput)
    setShowSuggestions(true)

    const newFilter = ingredients.filter((ingredient) =>
      ingredient && ingredient.name.toLowerCase().includes(searchInput)
    )

    setFilteredIngredients(searchInput === "" ? [] : newFilter)
  }

  const selectInput = (id, name) => {
    setIngredientEntered(name)
    setShowSuggestions(false)
    toSelectIngredient(id)
  }

  return (
    <div className="search">
      <div className="searchInput">
        <input
          type="text"
          placeholder={placeholder}
          value={ingredientEntered}
          onChange={handleFilter}
        />
      </div>
      {ingredients && filteredIngredients.length !== 0 && showSuggestions && (
        <div className="dataResult">
          {filteredIngredients.map((value, key) => (
            <a key={key} className="dataItem" onClick={() => selectInput(value._id, value.name)}>
              <p>{value.name}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
