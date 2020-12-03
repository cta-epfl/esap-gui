import React, { useState, createContext } from 'react';

export const IDAContext = createContext();
export function IDAContextProvider({ children }) {
    const [jhubURL, setJhubURL] = useState("https://srcdev.skatelescope.org/escape");
    const [jnotebookURL, setJnotebookURL] = useState("https://mybinder.org/v2/gh/AMIGA-IAA/hcg-16/master");
    const [batchsystemsURL, setBatchsystemsURL] = useState("https://dirac.egi.eu");
    return (
        <IDAContext.Provider
            value={{
                jhubURL,
                setJhubURL,
                jnotebookURL,
                setJnotebookURL,
                batchsystemsURL, 
                setBatchsystemsURL,
            }}
        >
        {children}
        </IDAContext.Provider>
    )
}