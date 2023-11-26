import React, { useState } from 'react';

export const MainContext = React.createContext();

function MainContextProvider({ children }) {
    const [login, setLogin] = useState(false);
    const [userId, setUserId] = useState(null);

    return (
        <MainContext.Provider
            value={{
                login,
                setLogin,
                userId,
                setUserId
            }}>
            {children}
        </MainContext.Provider>
    )
}

export default MainContextProvider