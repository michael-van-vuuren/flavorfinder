import { useState, useEffect, useContext } from 'react';
import "./App.css";
import Recommender from './recommender/Recommender';
import RecipePool from './recipe-pool/RecipePool';
import PantryHome from './pantry/PantryHome';
import { MainContext } from './MainContext';
import Typewriter from 'typewriter-effect';
import Home from './Home';

function Tabs({ returningUser }) {
    const [toggleState, setToggleState] = useState(1)
    const [pantry, setPantry] = useState([])
    const [ingredients, setIngredients] = useState([])
    const { userId, sliderValue } = useContext(MainContext)
    const [name, setName] = useState('')
    const [recipes, setRecipes] = useState([]);

    const welcomeStrings = returningUser
        ? [`Welcome back ${name}`]
        : [`Welcome, ${name}!`];

    const tutorialStrings = returningUser
        ? ['Visit the Pantry tab to add ingredients']
        : ['Visit the Pantry tab to get started'];

    useEffect(() => {
        // entry
        fetchIngredients()
        fetchPantry()
        console.log(returningUser)

        return () => {
            // exit
        };
    }, []);

    useEffect(() => {
        fetchRecipes()
    }, [sliderValue, pantry])

    const fetchPantry = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/v1/users/${userId}`)
            const pantryData = await response.json()
            setName(pantryData.data.name)
            setPantry(pantryData.data.pantry)
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

    // get personalized list of available recipes
    const fetchRecipes = async () => {
        const url = `http://localhost:3001/api/v1/recipe-pool/${userId}/${sliderValue}`
        const res = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
        })
        let responseData = await res.json()
        const recipes = responseData.recipes;
        setRecipes(recipes);
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
            <div className={toggleState === 1 ? "content active-content" : "content"}>
                <Home returningUser={returningUser} name={name} /> 
            </div>
            <div className={toggleState === 2 ? "content active-content" : "content"}>
                <PantryHome pantry={pantry} ingredients={ingredients} fetchPantry={fetchPantry} fetchIngredients={fetchIngredients} userId={userId} />
            </div>
             <div className={toggleState === 3 ? "content active-content" : "content"}>
                <RecipePool recipes={recipes} />
            </div>
            <div className={toggleState === 4 ? "content active-content" : "content"}>
                <Recommender recipes={recipes} />
            </div>
        </div>
    );
}

export default Tabs;