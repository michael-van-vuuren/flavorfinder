import { useState } from 'react';
import "./App.css";
import Recommender from './recommender/Recommender';
import Pantry from './pantry/Pantry';
import RecipePool from './recipe-pool/RecipePool';

function Tabs() {
    const [toggleState, setToggleState] = useState(1);
    const [stuff, setStuff] = useState([])

    const fetchIngredients = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/v1/ingredients')
            const stuff = await response.json()
            setStuff(stuff)
        } catch (e) {
            console.error('error fetching ingredients:', e)
        }
    }

    const toggleTab = (index) => {
        setToggleState(index);
    }

    return (
        <div className="container">

            <div className="bloc-tabs">
                <div className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1)}
                >Recipe Recommender</div>
                <div className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => {toggleTab(2); fetchIngredients()}}
                >Recipe Pool</div>
                <div className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                onClick={() => {toggleTab(3); fetchIngredients()}}
                >Pantry</div>
            </div>

            <div className="content-tabs">

                <div className={toggleState === 1 ? "content active-content" : "content"}>
                    <Recommender />
                </div>
                <div className={toggleState === 2 ? "content active-content" : "content"}>
                    <RecipePool />
                </div>
                <div className={toggleState === 3 ? "content active-content" : "content"}>
                    <Pantry stuff={stuff} />
                </div>
            </div>

        </div>
    );
}

export default Tabs;