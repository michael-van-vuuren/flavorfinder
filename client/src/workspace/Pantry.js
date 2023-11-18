import React, { useState, useEffect } from 'react'
import pluralizeIngredient from '../utility/pluralizeIngredient.js'
import './style.css'

const Pantry = ({ pantry, ingredients, fetchPantry }) => {
  const [pantryDisplay, setPantryDisplay] = useState([])

  const handlePantry = () => {
    console.log(pantry)
  }

  const handleRemove = async (idToRemove) => {
    try {
      const url = `http://localhost:3001/api/v1/users/${'6556d131755e12ed18838678'}`
      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deleteme: idToRemove }),
      })

      if (!response.ok) {
        throw new Error(`Failed to remove ingredient: ${response.statusText}`)
      }
      const result = await response.json()
      console.log(result)

      fetchPantry('6556d131755e12ed18838678')
    } catch (e) {
      console.error('Error updating pantry:', e.message)
    }
  }

  return (
    <div>
      <h1>Pantry</h1>
      <button onClick={handlePantry}>Log A</button>
      {pantry.length > 0 && (
        <div className='ingredient-list'>
          <ul>
            {pantry.map((ingredient, index) => (
              <li key={index} className='highlight'>
                {ingredient.quantity} {ingredient.units} of {pluralizeIngredient(ingredient.name, ingredient.quantity)}
                {ingredient.image && (
                  <img src={ingredient.image} alt="Ingredient" className="ingredient-image" />
                )}
                <button className="remove-button" onClick={() => handleRemove(ingredient.ingredientId)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )

}

export default Pantry