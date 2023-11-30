import React from 'react'
import pluralizeIngredient from '../utility/pluralizeIngredient.js'

function IngredientList({ mode, pantry, removeToggle, handleTagClick, handleRemove }) {

  return (
    <div>
      {
        pantry.map((ingredient, index) => (
          <li key={index} className={mode ? '' : 'highlight'}>
            {ingredient.image && (
              <img
                className="ingredient-image"
                src={process.env.PUBLIC_URL + "/images/svg/" + ingredient.image}
                alt="Ingredient"
              />
            )}
            <div className="row">
              {mode ? (
                <span className="quantity-display">{ingredient.quantity}{ingredient.units} of</span>
              ) : (
                <span className="quantity-display hidden">{ingredient.quantity}{ingredient.units} of</span>
              )}
              <div className="col">
                {mode ? (
                  <span className="tag" onClick={() => handleTagClick(ingredient.name, ingredient.ingredientId)}>
                    {pluralizeIngredient(ingredient.name, ingredient.quantity)}
                  </span>
                ) : (
                  <span className="tag hidden">
                    {pluralizeIngredient(ingredient.name, ingredient.quantity)}
                  </span>
                )}
              </div>
            </div>
            {removeToggle && (
              <button className="remove-button" onClick={() => handleRemove(ingredient.ingredientId)}>
                Remove
              </button>
            )}
          </li>
        ))
      }
    </div>
  )
}

export default IngredientList
