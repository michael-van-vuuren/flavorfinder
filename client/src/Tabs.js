import { useState, useEffect, useContext } from 'react';
import "./App.css";
import Recommender from './recommender/Recommender';
import RecipePool from './recipe-pool/RecipePool';
import PantryHome from './pantry/PantryHome';
import { MainContext } from './MainContext';

function Tabs() {
    const [toggleState, setToggleState] = useState(1)
    const [pantry, setPantry] = useState([])
    const [ingredients, setIngredients] = useState([])
    const { userId } = useContext(MainContext)
    const [name, setName] = useState('')

    useEffect(() => {
        // entry
        fetchName()
        fetchIngredients()
        fetchPantry()

        return () => {
            // exit
        };
    }, []);

    const fetchName = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/v1/users/name/${userId}`)
            setName(await response.json())
        } catch (e) {
            console.error('error fetching name:', e)
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
                >Home</div>
                <div className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => { toggleTab(2); fetchIngredients(); fetchPantry() }}
                >Pantry</div>
                <div className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(3)}
                >Recipes</div>
                <div className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(4)}
                >RecipeBot</div>
            </div>

            <div className="content-tabs">
                <div className={toggleState === 1 ? "content active-content" : "content"}>
                    <h2>{name ? `Welcome, ${name}!` : ''}</h2>
                    <p>tutorial text</p>
                </div>
                <div className={toggleState === 2 ? "content active-content" : "content"}>
                    <PantryHome pantry={pantry} ingredients={ingredients} fetchPantry={fetchPantry} userId={userId} />
                </div>
                <div className={toggleState === 3 ? "content active-content" : "content"}>
                    <RecipePool />
                </div>
                <div className={toggleState === 4 ? "content active-content" : "content"}>
                    <Recommender />
                </div>
            </div>

        </div>
    );
}

export default Tabs;