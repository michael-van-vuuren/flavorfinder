import React, { useState } from 'react';

export const MainContext = React.createContext();

function MainContextProvider({ children }) {
    const [login, setLogin] = useState(false);

    return (
        <MainContext.Provider
            value={{
                login,
                setLogin
            }}>
            {children}
        </MainContext.Provider>
    )
}

export default MainContextProvider