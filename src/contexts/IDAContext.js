import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";


export const IDAContext = createContext();
export function IDAContextProvider({ children }) {

    const { api_host } = useContext(GlobalContext);
    const [idaSystemURL, setIdaSystemURL] = useState();
    const [jnotebookURL, setJnotebookURL] = useState();
    const [batchsystemsURL, setBatchsystemsURL] = useState();
    const [list_of_jnotebooks, setList_of_jnotebooks] = useState();
    const [list_of_idaSystems, setList_of_idaSystems] = useState();

    // Fetch Notebooks
    useEffect(() => {
      axios
      .get(api_host + "ida/workflows/search")
        .then((response) => {
          setList_of_jnotebooks(response.data.results);
          setJnotebookURL(response.data.results[0].url);
        });
    }, [api_host]);


    // Fetch JHubs
    useEffect(() => {
      axios
      .get(api_host + "ida/facilities/search")
        .then((response) => {
          setList_of_idaSystems(response.data.results);
          setIdaSystemURL(response.data.results[0].url);
        });
    }, [api_host]);


    return (
        <IDAContext.Provider
            value={{
                idaSystemURL,
                setIdaSystemURL,
                jnotebookURL,
                setJnotebookURL,
                batchsystemsURL,
                setBatchsystemsURL,
                list_of_jnotebooks,
                setList_of_jnotebooks,
                list_of_idaSystems,
                setList_of_idaSystems
            }}
        >
        {children}
        </IDAContext.Provider>
    )
}
