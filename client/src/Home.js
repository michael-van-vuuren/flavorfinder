import "./App.css";
import Typewriter from 'typewriter-effect';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';

function Home({ returningUser, name }) {
    const welcomeStrings = returningUser
        ? [`Welcome back ${name}!`]
        : [`Welcome, ${name}!`];

    const tutorialStrings = returningUser
        ? ['Visit the Pantry tab to add ingredients']
        : ['Visit the Pantry tab to get started'];

    return (
        <div className="content active-content">
            <h2>
                <Typewriter
                    options={{
                        strings: welcomeStrings,
                        autoStart: true,
                        loop: false,
                        delay: 75,
                        deleteSpeed: Infinity,
                        cursor: '',
                    }}
                />
            </h2>
            <div>
                <p>
                </p>
                <p>
                    This is your personal recipe assistant! To get started, click the dropdowns to learn more!
                </p>
                <br></br>
                <div className="accordionContainer">
                    <Accordion>
                        <AccordionSummary>
                            <Typography variant="h6">Stock your Pantry!</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Start by adding ingredients in the <b>Pantry</b> tab.
                            </Typography>
                            <ul>
                                <li className="listElement">Click <b>Add Ingredients</b> at the bottom of the Pantry tab.</li>
                                <li className="listElement">Enter ingredient details and press <b>Add!</b></li>
                                <li className="listElement">Confirm your selections at the bottom of the page when done.</li>
                                <li className="listElement">To remove an ingredient, use the <b>Remove</b> button.</li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary>
                            <Typography variant="h6">View your Recipes!</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Once you are done adding ingredients, please enter the <b>Recipes</b> tab!
                            </Typography>
                            <ul>
                                <li className="listElement">The Tolerance slider allows you to be more lenient with the available ingredients.</li>
                                <li className="listElement">A higher tolerance translates to more ingredients needed.</li>
                                <li className="listElement">Click on a recipe to view the details!</li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary>
                            <Typography variant="h6">Chat with your personal RecipeBot!</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Feeling overwhelmed? Visit the <b>RecipeBot</b> tab!
                            </Typography>
                            <ul>
                                <li className="listElement">The RecipeBot will output a specific recipe based on your personal preference.</li>
                                <li className="listElement">For example, if you like something hot for a cold day, please input that and the RecipeBot will output an appropiate recipe!</li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                </div>

            </div>


        </div>
    )
}

export default Home;
