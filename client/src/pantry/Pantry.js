import React from 'react';
import "./Pantry.css";
import SearchBar from "./SearchBar.js"
import DropDown from "./DropDown.js"

const Pantry = () => {
  return (
    <div>
	  <h2 id="pantry-title">Add ingredients</h2>
	  <div className="pantry-buttons">
	  	<div class="button 1">
	  		<SearchBar placeholder="Enter an Ingredient..." />
	  	</div>
	  	<div class="button 2">
	  		<SearchBar placeholder="Enter the quantity..." />
	 	</div>
	  	<div class="button 3">
	  		<DropDown/>
	  	</div>
	  	<div>
          <button className="add-button" onClick={() => { }}>Add</button>
	  	</div>
	  </div>
    </div>
  );
}

export default Pantry;
