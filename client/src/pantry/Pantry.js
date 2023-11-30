import React, { useState } from 'react'
import './Pantry.css'
import Tags from './Tags.js'
import InfoBox from './InfoBox.js'
import IngredientList from './IngredientList.js'

const Pantry = ({ pantry, fetchPantry, userId, removeToggle }) => {
  const [info, setInfo] = useState({ name: '', longName: '', description: '', group: '', subgroup: '', image: null })

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

  const handleTagClick = async (name, id, event) => {
    try {
      // reset image for fade in
      event.stopPropagation()
      setInfo(member => ({ ...member, image: null }))

      const tagResult = await Tags.ingredientTag(id);
      const imagePath = `https://foodb.ca/system/foods/pictures/${id}/full/${id}.png`;

      setInfo({
        name: name,
        group: tagResult.food_group,
        subgroup: tagResult.food_subgroup,
        image: imagePath,

        longName: '',
        description: '',
      });
    } catch (error) {
      console.error('Error handling tag click:', error);
    }
  }

  const handleRowClick = async (name, id) => {
    try {
      // reset image for fade in
      setInfo(member => ({ ...member, image: null }))

      const tagResult = await Tags.ingredientTag(id);
      const imagePath = `https://foodb.ca/system/foods/pictures/${id}/full/${id}.png`;

      setInfo({
        name: name,
        longName: tagResult.name_scientific,
        description: tagResult.description,
        image: imagePath,

        group: '',
        subgroup: '',
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

          <div>
            <ul className="ingredient-list">
              <IngredientList mode={true} pantry={pantry} removeToggle={removeToggle} handleRowClick={handleRowClick} handleTagClick={handleTagClick} handleRemove={handleRemove} />
            </ul>
          </div>

          <InfoBox name={info.name} longName={info.longName} description={info.description} group={info.group} subgroup={info.subgroup} image={info.image} />

        </div>
      ) : (
        <p>Add ingredients, then visit the Recipes tab</p>
      )}
    </div>
  )
}

export default Pantry
