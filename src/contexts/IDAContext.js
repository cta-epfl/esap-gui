import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";


export const IDAContext = createContext();
export function IDAContextProvider({ children }) {

    const { api_host } = useContext(GlobalContext);
    const [idaSystemURL, setIdaSystemURL] = useState();
    const [workflowURL, setWorkflowURL] = useState();
    const [batchsystemsURL, setBatchsystemsURL] = useState();
    const [list_of_workflows, setList_of_workflows] = useState();
    const [list_of_idaSystems, setList_of_idaSystems] = useState();

    // Fetch Notebooks
    useEffect(() => {
      axios
      .get(api_host + "ida/workflows/search")
        .then((response) => {
          setList_of_workflows(response.data.results);
          setWorkflowURL(response.data.results[0].url);
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
                workflowURL,
                setWorkflowURL,
                batchsystemsURL,
                setBatchsystemsURL,
                list_of_workflows,
                setList_of_workflows,
                list_of_idaSystems,
                setList_of_idaSystems
            }}
        >
        {children}
        </IDAContext.Provider>
    )
}
