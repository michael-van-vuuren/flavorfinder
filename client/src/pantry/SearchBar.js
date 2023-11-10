import React, { useEffect, useState } from 'react';
import "./SearchBar.css";

function SearchBar({ placeholder,  data, toSelectIngredient}) {
	const [filteredIngredients, setFilteredIngredients] = useState([]);
	const [ingredEntered, setIngredEntered] = useState("");
	const [showSuggestions, setShowSuggestions] = useState(false);

	// filter out suggested ingredients based on text input
	const handleFilter = (event) => {
		const searchedIngred = event.target.value;
		setIngredEntered(searchedIngred);
		setShowSuggestions(true);
		const newFilter = data.filter((value) => {
			if (value) {
				return value.name.toLowerCase().includes(searchedIngred.toLowerCase());
			}
		});
		if (searchedIngred === "") {
			setFilteredIngredients([]);
		}
		else {
			setFilteredIngredients(newFilter);
		}
	};

	// when a suggested ingredient is clicked on, autofill input and set ingredient
	const selectInput = (text) => {
		setIngredEntered(text);
		setShowSuggestions(false);
		toSelectIngredient(text);
	};

	if(data) {
		return (
			<div className="search">
				<div className="searchInput">
					<input type="text" placeholder={placeholder} value={ingredEntered} onChange={handleFilter}/>
				</div>
				{filteredIngredients.length != 0 && showSuggestions && (
				<div className="dataResult">
					{filteredIngredients.map((value, key) => {
						return (
						<a className="dataItem" onClick={() => selectInput(value.name)}> 
							<p> {value.name} </p>
						</a>
						);
					})}
				</div>
				)}
			</div>
		);
	}
	else {
		return (
			<div className="search">
				<div className="searchInput">
					<input type="text" placeholder={placeholder} />
				</div>
			</div>
		);
	}
}

export default SearchBar
