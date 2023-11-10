import React, { useEffect, useState } from 'react';
import "./Pantry.css";
import SearchBar from "./SearchBar.js"
import DropDown from "./DropDown.js"

const Pantry = () => {
	const [stuff, setStuff] = useState([]);
	const [ingredientToAdd, setIngredientToAdd] = useState("");
	const [quantityToAdd, setQuantityToAdd] = useState("");
	const [unitsToAdd, setUnitsToAdd] = useState("Select Units");
	const [isValidQuantity, setIsValidQuantity] = useState(false);

	// get list of ingredients from database
	useEffect(() => {
		fetch('http://localhost:3001/api/v1/ingredients')
		  .then(res => {
			return res.json()
		  })
		  .then(data => {
			  setStuff(data);
			  console.log(stuff)
		  })
		  .catch(err => {
			  console.log(err.message);
		  })
		});

	// function passed into SearchBar to send back ingredient entered to Pantry
	const handleIngredient = (name) => {
		setIngredientToAdd(name);
	};

	// check if quantity input is a #, allow it to be added if so
	const handleQuantity = (event) => {
		const quantity = event.target.value;
		setIsValidQuantity(false);
		if (!isNaN(+quantity)) {
			setIsValidQuantity(true);
		}
		setQuantityToAdd(quantity);
	};

	// function passed into DropDown to send the selected units to Pantry
	const handleUnits = (units) => {
		setUnitsToAdd(units);
	};

	// when the Add button is clicked, send object to database
	const handleAdd = () => {
		// TODO: add newIngredient object to user's pantry
		const newIngredient = {
			ingredientId: ingredientToAdd,
			quantity: quantityToAdd,
			units: unitsToAdd
		}
		if (unitsToAdd !== "Select Units" && isValidQuantity) {
			console.log(newIngredient);
		}
	};

	return (
		<div>
			<h2 id="pantry-title">Add ingredients</h2>
			<div className="pantry-buttons">
			<div class="button 1">
				<SearchBar placeholder="Enter an Ingredient..." data={stuff} toSelectIngredient={handleIngredient}/>
			</div>
			<div class="button 2">
				<input type="text" placeholder="Enter a Quantity..." onChange={handleQuantity}/>
			</div>
			<div class="button 3">
				<DropDown toSelectUnits={handleUnits}/>
			</div>
			<div>
				<button className="add-button" onClick={() => handleAdd()}>Add</button>
			</div>
			</div>
		</div>
	);
}

export default Pantry;
