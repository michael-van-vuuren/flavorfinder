import { useState } from 'react';
import "./App.css";
import Recommender from './recommender/Recommender';
import Pantry from './pantry/Pantry';

function Tabs() {

    const [toggleState, setToggleState] = useState(1);

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
                >Pantry</div>
            </div>

            <div className="content-tabs">

                <div className={toggleState === 1 ? "content active-content" : "content"}>
                    <Recommender />
                </div>
                <div className={toggleState === 2 ? "content active-content" : "content"}>
                    <Pantry />
                </div>
            </div>

        </div>
    );
}

export default Tabs;