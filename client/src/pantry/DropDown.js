import React, { useState } from 'react';
function DropDown({ toSelectUnits }) {

    return (
        <div className="drop-down">
            <select id="unitSelect" onChange= {event => toSelectUnits(event.target.value)}>
                <option>Select Units</option>
                <option>oz</option>
                <option>fl oz</option>
                <option>grams</option>
                <option>lb</option>
                <option>ml</option>
                <option>L</option>
            </select>
	    </div>
    );
}

export default DropDown
