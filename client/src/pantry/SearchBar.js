import React, { useState } from 'react'
import "./SearchBar.css"

function SearchBar({ placeholder, ingredients, toSelectIngredient }) {
  const [filteredIngredients, setFilteredIngredients] = useState([])
  const [ingredientEntered, setIngredientEntered] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleFilter = (event) => {
    const searchInput = event.target.value.toLowerCase()
    setIngredientEntered(searchInput)
    setShowSuggestions(true)

    const newFilter = ingredients
      .filter((ingredient) => ingredient && ingredient.name.toLowerCase().includes(searchInput))
      .sort((a, b) => { // sorts by closest matching name, then by shorter name
        const indexOfA = a.name.toLowerCase().indexOf(searchInput)
        const indexOfB = b.name.toLowerCase().indexOf(searchInput)
        if (indexOfA === indexOfB) {
          return a.name.length - b.name.length;
        }
        return indexOfA - indexOfB
      })

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
