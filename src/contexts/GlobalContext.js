import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import getCookie from "../utils/getCookie";

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const defaultConf = "esap_ivoa";
  console.log("ASTRON ESAP version ", Date());
  const api_host =
    process.env.NODE_ENV === "development"
      ? "http://localhost:15671/esap-api/"
      : "/esap-api/";
  // "http://localhost:15671/esap-api/"
  // "http://sdc.astron.nl:5557/esap-api/"
  const [config, setConfig] = useState();
  const [configName, setConfigName] = useState(defaultConf);

  useEffect(() => {
    let configNameString = "";
    if (configName) {
      configNameString = `?name=${configName}`;
    }
    axios
      .get(api_host + "query/configuration" + configNameString)
      .then((response) => setConfig(response.data["configuration"]));
  }, [api_host, configName]);
  console.log("config: ", { config });

  const [archives, setArchives] = useState();
  useEffect(() => {
    axios
      .get(api_host + "query/archives-uri")
      .then((response) => setArchives(response.data.results));
  }, [api_host]);

  const [sessionid, setSessionid] = useState(getCookie("sessionid"));
  console.log("waah", sessionid, getCookie("sessionid"), document.cookie);
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionid ? true : false
  );

  const handleLogin = ({ history }) => {
    setIsAuthenticated(true);
    setSessionid(getCookie("sessionid"));
    history.replace("/");
    return null;
  };

  const handleLogout = ({ history }) => {
    setIsAuthenticated(false);
    setSessionid(null);
    history.replace("/");
    return null;
  };

  return (
    <GlobalContext.Provider
      value={{
        api_host,
        isAuthenticated,
        sessionid,
        config,
        archives,
        handleLogin,
        handleLogout,
        setConfigName,
        defaultConf,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
