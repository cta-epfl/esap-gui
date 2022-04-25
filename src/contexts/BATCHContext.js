import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";


export const BATCHContext = createContext();
export function BATCHContextProvider({ children }) {

    const { api_host } = useContext(GlobalContext);
    const [batchSystemURL, setIdaSystemURL] = useState();
    const [workflowURL, setWorkflowURL] = useState();
    const [batchsystemsURL, setBatchsystemsURL] = useState();
    const [list_of_workflows, setList_of_workflows] = useState();
    const [list_of_batchSystems, setList_of_batchSystems] = useState();


    return (
        <BATCHContext.Provider
            value={{
                batchSystemURL,
                setIdaSystemURL,
                workflowURL,
                setWorkflowURL,
                batchsystemsURL,
                setBatchsystemsURL,
                list_of_workflows,
                setList_of_workflows,
                list_of_batchSystems,
                setList_of_batchSystems
            }}
        >
        {children}
        </BATCHContext.Provider>
    )
}
