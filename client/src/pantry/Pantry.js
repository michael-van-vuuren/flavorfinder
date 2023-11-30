import React, { useState } from 'react'
import './Pantry.css'
import Tags from './Tags.js'
import InfoBox from './InfoBox.js'
import IngredientList from './IngredientList.js'

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
      setInfo(member => ({ ...member, image: null }))

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
      {pantry.length > 0 ? (
        <div className="pantry-page">

          <div className="ingredient-list">
            <ul>
              <IngredientList mode={true} pantry={pantry} removeToggle={removeToggle} handleTagClick={handleTagClick} handleRemove={handleRemove} />
            </ul>
          </div>

          <InfoBox name={info.name} image={info.image} longName={info.longName} description={info.description} />

        </div>
      ) : (
        <p>Add ingredients, then visit the Recipes tab</p>
      )}
    </div>
  )
}

export default Pantry
