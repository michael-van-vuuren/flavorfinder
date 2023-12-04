import React, { useState } from 'react';

export const MainContext = React.createContext();

function MainContextProvider({ children }) {
    const [login, setLogin] = useState(false);
    const [userId, setUserId] = useState(null);
    const [sliderValue, setSliderValue] = useState(0);

    return (
        <MainContext.Provider
            value={{
                login,
                setLogin,
                userId,
                setUserId,
                sliderValue,
                setSliderValue
            }}>
            {children}
        </MainContext.Provider>
    )
}

export default MainContextProvider