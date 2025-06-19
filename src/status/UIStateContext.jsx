import React, { createContext, useContext, useState } from 'react';

const UIStateContext = createContext();

export const UIStateProvider = ({ children }) => {
    const [blocked, setBlocked] = useState(false); // true if loading/error active

    return (
        <UIStateContext.Provider value={{ blocked, setBlocked }}>
        {children}
        </UIStateContext.Provider>
    );
};

export const useUIState = () => useContext(UIStateContext);
