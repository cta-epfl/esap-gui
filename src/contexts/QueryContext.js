import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import useMap from "../hooks/useMap";
import { GlobalContext } from "./GlobalContext";

export const QueryContext = createContext();

export function QueryContextProvider({ children }) {
  const defaultConf = "esap_ivoa";
  const queryMap = useMap();
  const [formData, setFormData] = useState();
  const [page, setPage] = useState(1);
  const [fits, setFits] = useState("https://uilennest.net/astrobase/data/191231001/3836665.fits");
  const [dplevel, setDPLevel] = useState();
  const [collection, setCollection] = useState();
  const [config, setConfig] = useState();
  const [configName, setConfigName] = useState(defaultConf);
  const { api_host } = useContext(GlobalContext);

  useEffect(() => {
    let configNameString = "";
    if (configName) {
      configNameString = `?name=${configName}`;
    }
    axios
      .get(api_host + "query/configuration" + configNameString)
      .then((response) => {
        let config = response.data["configuration"];
        let props = config.query_schema.properties;
        console.log("config props: ", props);
        console.log("collection value: ", collection);
        console.log("dplevel value: ", dplevel);
        Object.keys(props).map((key) => {
          if (key == "collection")
            console.log("has key collection, default value is: ", props[key]["default"]);
        });
        setConfig(config);
      });
  }, [api_host, configName, dplevel, collection]);
  console.log("config: ", { config });

  return (
    <QueryContext.Provider
      value={{
        page,
        setPage,
        queryMap,
        formData,
        setFormData,
        fits,
        setFits,
        dplevel,
        setDPLevel,
        collection,
        setCollection,
        config,
        setConfigName,
        defaultConf,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
}
