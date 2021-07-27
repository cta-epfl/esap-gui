import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";


export const IDAContext = createContext();
export function IDAContextProvider({ children }) {

    const { api_host } = useContext(GlobalContext);
    const [jhubURL, setJhubURL] = useState();
    const [jnotebookURL, setJnotebookURL] = useState();
    const [batchsystemsURL, setBatchsystemsURL] = useState("https://dirac.egi.eu");
    const [list_of_jnotebooks, setList_of_jnotebooks] = useState();
    const [list_of_jhubs, setList_of_jhubs] = useState();

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
          setList_of_jhubs(response.data.results);
          setJhubURL(response.data.results[0].url);
        });
    }, [api_host]);


    return (
        <IDAContext.Provider
            value={{
                jhubURL,
                setJhubURL,
                jnotebookURL,
                setJnotebookURL,
                batchsystemsURL,
                setBatchsystemsURL,
                list_of_jnotebooks,
                setList_of_jnotebooks,
                list_of_jhubs,
                setList_of_jhubs
            }}
        >
        {children}
        </IDAContext.Provider>
    )
}
