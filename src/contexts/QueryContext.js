import React, { createContext, useState, useEffect, useContext } from "react";
import { Alert } from "react-bootstrap";
import axios from "axios";
import useMap from "../hooks/useMap";
import { GlobalContext } from "./GlobalContext";

export const QueryContext = createContext();

export function QueryContextProvider({ children }) {
    const defaultConf = "esap_ivoa";
    const queryMap = useMap();
    const [formData, setFormData] = useState();
    const [page, setPage] = useState(1);
    const [url, setURL] = useState("");
    const [dplevel, setDPLevel] = useState();
    const [collection, setCollection] = useState();
    const [config, setConfig] = useState();
    const [configName, setConfigName] = useState(defaultConf);
    const { api_host, loginAgain } = useContext(GlobalContext);
    const [preview, setPreview] = useState(false);
    const [ds9, setDS9] = useState(false);


    // this hook executes fetchConfiguration every time that the values between brackets are changed
    useEffect(() => {

        if (!fetchConfiguration(configName)) {
            fetchConfigurationAnonymous(configName)
        }

    }, [api_host, configName]);
    //}, [api_host, configName, dplevel, collection]);


    function fetchConfiguration(configName) {
        let configNameString = "";
        if (configName) {
            configNameString = `?name=${configName}`;
        }

        axios
            .get(api_host + "query/configuration" + configNameString, {withCredentials: true})
            .then((response) => {
                //alert(configNameString)
                let config = response.data["configuration"];
                let props = config.query_schema.properties;

                Object.keys(props).map((key) => {
                    if (key === "collection" && collection) {
                        console.log("has key collection, default value is: ", props[key]["default"]);
                        props[key]["default"] = collection;
                    }
                    if (key === "level" && dplevel) {
                        console.log("has key dplevel, default value is: ", props[key]["default"]);
                        props[key]["default"] = dplevel;
                    }
                    return null;
                });
                setConfig(config);
            })
            .catch((error) => {
                let description = ". Configuration not loaded. Is ESAP-API online? " + api_host
                console.log(error.toString() + description)
                //alert(description)
                // frantic attempt to solve cors errors by trying to trigger a login
                //const loginUrl = api_host + "oidc/authenticate"
                //alert('(QueryContext) token expired, attempting login: '+loginUrl)
                //window.location = loginUrl
                loginAgain()
                return false
            });

        return true
    }


    function fetchConfigurationAnonymous(configName) {
        let configNameString = "";
        if (configName) {
            configNameString = `?name=${configName}`;
        }

        axios
            .get(api_host + "query/configuration" + configNameString)
            .then((response) => {
                //alert(configNameString)
                let config = response.data["configuration"];
                let props = config.query_schema.properties;

                Object.keys(props).map((key) => {
                    if (key === "collection" && collection) {
                        console.log("has key collection, default value is: ", props[key]["default"]);
                        props[key]["default"] = collection;
                    }
                    if (key === "level" && dplevel) {
                        console.log("has key dplevel, default value is: ", props[key]["default"]);
                        props[key]["default"] = dplevel;
                    }
                    return null;
                });
                setConfig(config);
            })
            .catch((error) => {

                let description = ". Configuration not loaded. Is ESAP-API online? " + api_host
                console.log(error.toString() + description)
                alert(description)
                //const loginUrl = api_host + "oidc/authenticate"
                // window.location = loginUrl
                loginAgain()
            });

        return true
    }

  console.log("config: ", { config });

  return (
    <QueryContext.Provider
      value={{
        page,
        setPage,
        queryMap,
        formData,
        setFormData,
        url,
        setURL,
        dplevel,
        setDPLevel,
        collection,
        setCollection,
        config,
        configName,
        setConfigName,
        defaultConf,
        ds9,
        setDS9,
        preview,
        setPreview,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
}
