import { useState } from 'react';
import "./App.css";
import Recommender from './recommender/Recommender';
import AddToPantry from './pantry/AddToPantry';
import RecipePool from './recipe-pool/RecipePool';
import Pantry from './pantry/Pantry';
import PantryHome from './workspace/PantryHome'

function Tabs() {
    const [toggleState, setToggleState] = useState(1)
    const [pantry, setPantry] = useState([])
    const [ingredients, setIngredients] = useState([])

    const fetchPantry = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/api/v1/users/${id}`)
            setPantry(await response.json())
        } catch (e) {
            console.error('error fetching pantry:', e)
        }
    }

    const fetchIngredients = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/v1/ingredients')
          setIngredients(await response.json())
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
                    onClick={() => toggleTab(2)}
                >Recipe Pool</div>
                <div className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                    onClick={() => { toggleTab(3); fetchIngredients(); fetchPantry('6556d131755e12ed18838678') }}
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
                    <PantryHome pantry={pantry} ingredients={ingredients} fetchPantry={fetchPantry} />
                    {/* <div>
                        {addingIngredients ? (
                            <AddToPantry stuff={stuff} setAddingIngredients={setAddingIngredients} />
                        ) : (
                            <Pantry pantryContents={pantryContents} setAddingIngredients={setAddingIngredients} />
                        )}
                    </div> */}
                    {/* <Pantry stuff={stuff} /> */}
                </div>
            </div>

        </div>
    );
}

export default Tabs;