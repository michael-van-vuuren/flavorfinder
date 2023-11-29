import React from 'react'
import pluralizeIngredient from '../utility/pluralizeIngredient.js'
import './Pantry.css'

const Pantry = ({ pantry, fetchPantry, userId }) => {

  const handleRemove = async (idToRemove) => {
    try {
      const url = `http://localhost:3001/api/v1/users/${userId}`
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

      fetchPantry(userId)
    } catch (e) {
      console.error('Error updating pantry:', e.message)
    }
  }

  return (
    <div>
      <h2>Pantry</h2>
      {pantry.length > 0 && (
        <div className='ingredient-list'>
          <ul>
            {pantry.map((ingredient, index) => (
              <li key={index}>
                {ingredient.quantity} {ingredient.units} of {pluralizeIngredient(ingredient.name, ingredient.quantity)}
                {ingredient.image && (
                  <img src={process.env.PUBLIC_URL + "/images/svg/" + ingredient.image} alt="Ingredient" className="ingredient-image" />
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