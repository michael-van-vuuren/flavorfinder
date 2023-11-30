import React, { useState } from 'react'
import pluralizeIngredient from '../utility/pluralizeIngredient.js'
import './Pantry.css'
import Tags from './Tags.js'

const Pantry = ({ pantry, fetchPantry, userId, removeToggle }) => {
  const [info, setInfo] = useState({ name: '', longName: '', description: '', image: null })

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

  const handleTagClick = async (name, id) => {
    try {
      // reset image for fade in
      setInfo(member => ({...member, image: null}))

      const tagResult = await Tags.ingredientTag(id);
      const imagePath = `https://foodb.ca/system/foods/pictures/${id}/full/${id}.png`;
      
      setInfo({
        name: name,
        longName: tagResult.name_scientific,
        description: tagResult.description,
        image: imagePath
      });
    } catch (error) {
      console.error('Error handling tag click:', error);
    }
  }

  return (
    <div>
      <h2>Pantry</h2>
      {pantry.length > 0 && (
        <div className="pantry-page">
          <div className="ingredient-list">
            <ul>
              {pantry.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.image && (
                    <img className="ingredient-image" src={process.env.PUBLIC_URL + "/images/svg/" + ingredient.image} alt="Ingredient" />
                  )}
                  <div className="row">
                    <span className="quantity-display">{ingredient.quantity}{ingredient.units} of</span>
                    <div className="col">
                      <span className="tag" onClick={() => handleTagClick(ingredient.name, ingredient.ingredientId)}>
                        {pluralizeIngredient(ingredient.name, ingredient.quantity)}
                      </span>
                    </div>
                  </div>
                  {removeToggle && (
                    <button className="remove-button" onClick={() => handleRemove(ingredient.ingredientId)}>Remove</button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="info-box" style={{ padding: "25px" }}>
            <strong style={{ fontSize: "14pt" }}>{info.name ? info.name.charAt(0).toUpperCase() + info.name.slice(1) : 'No ingredient selected'}</strong>
            {info.image && (
              <img className="ingredient-image" src={info.image} alt={info.name} style={{ marginRight: '10px', float: 'right', borderRadius: '50%', width: '55px', height: '55px' }}></img>
            )}
            <br />
            {info.longName ? (<i>{` ${info.longName.toLowerCase()}`}</i>) : (<i>n/a</i>)}
            <div style={{
              height: "auto",
              margin: "30px 0 0 0",
              padding: "10px",
              border: "1px solid rgba(0, 0, 0, 0.274)",
              borderRadius: "4px"
            }}>
              {info.description ? (info.description) : (<span>No description</span>)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Pantry
