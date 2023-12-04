import React from 'react';
function DropDown({ toSelectUnits }) {

    return (
        <div className="drop-down">
            <select id="unitSelect" onChange= {event => toSelectUnits(event.target.value)} data-testid={"Select Units"}>
                <option>Select Units</option>
                <option>count</option>
                <option>oz</option>
                <option>fl-oz</option>
                <option>g</option>
                <option>lb</option>
                <option>ml</option>
                <option>l</option>
            </select>
	    </div>
    );
}

export default DropDown
