import "./App.css";
import Typewriter from 'typewriter-effect';

function Home ({ returningUser, name }) {
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
            <p>
                {tutorialStrings}
            </p>
        </div>
    )
}

export default Home;
