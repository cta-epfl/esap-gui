
import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import axios from "axios";
import getCookie from "../utils/getCookie";


export const IDAContext = createContext();
export function IDAContextProvider({ children }) {

    const api_host =
      process.env.NODE_ENV === "development"
        ? "http://localhost:5555/esap-api/"
        : "https://sdc-dev.astron.nl:5555/esap-api/";

    const [jhubURL, setJhubURL] = useState("https://srcdev.skatelescope.org/escape");
    const [jnotebookURL, setJnotebookURL] = useState("https://mybinder.org/v2/gh/AMIGA-IAA/hcg-16/master");
    const [batchsystemsURL, setBatchsystemsURL] = useState("https://dirac.egi.eu");
    const [list_of_jnotebooks, setList_of_jnotebooks] = useState();
    const [list_of_jhubs, setList_of_jhubs] = useState();

    // Fetch Notebooks
    useEffect(() => {
      axios
      .get(api_host + "ida/workflows/search")
        .then((response) => {
          setList_of_jnotebooks(response.data.results);
        });
    }, [api_host]);


    // Fetch JHubs
    useEffect(() => {
      axios
      .get(api_host + "ida/facilities/search")
        .then((response) => {
          setList_of_jhubs(response.data.results);
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
