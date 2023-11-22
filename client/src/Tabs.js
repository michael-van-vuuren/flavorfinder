import { useState, useEffect } from 'react';
import "./App.css";
import Recommender from './recommender/Recommender';
import RecipePool from './recipe-pool/RecipePool';
import PantryHome from './pantry/PantryHome'

function Tabs() {
    const [toggleState, setToggleState] = useState(3)
    const [pantry, setPantry] = useState([])
    const [ingredients, setIngredients] = useState([])

    // LOGIN USER ID SET HERE RIGHT NOW
    // below users are currently in flavorfinder.pantries in the db
    // michael - 6556b9a6b7de3c37de02c24b
    // tom     - 6556d131755e12ed18838678
    const [userId, setUserId] = useState('6556d131755e12ed18838678')

    useEffect(() => {
        // entry
        fetchIngredients() 
        fetchPantry()
        
        return () => {
            // exit
        };
    }, []);

    const fetchClientId = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/v1/clientid`)
            const res = await response.json()
            console.log(res.clientid)
        } catch (e) {
            console.error('error fetching pantry:', e)
        }
    }

    const fetchPantry = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/v1/users/${userId}`)
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
                    onClick={() => { toggleTab(3); fetchIngredients(); fetchPantry() }}
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
                    <PantryHome pantry={pantry} ingredients={ingredients} fetchPantry={fetchPantry} userId={userId} />
                </div>
            </div>

        </div>
    );
}

export default Tabs;