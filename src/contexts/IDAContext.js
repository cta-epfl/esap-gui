import React, { useState, createContext } from 'react';

export const IDAContext = createContext();
export function IDAContextProvider({ children }) {
    const [jhubURL, setJhubURL] = useState("https://srcdev.skatelescope.org/escape");
    return (
        <IDAContext.Provider
            value={{
                jhubURL,
                setJhubURL,
            }}
        >
        {children}
        </IDAContext.Provider>
    )
}