import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import getCookie from "../utils/getCookie";

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const api_host =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/esap-api/"
      : "/esap-api/";

  const [config, setConfig] = useState();
  useEffect(() => {
    axios
      .get(api_host + "query/configuration")
      .then((response) => setConfig(response.data["configuration"]));
  }, [api_host]);
  console.log("config: ", { config });

  const [archives, setArchives] = useState();
  useEffect(() => {
    axios
      .get(api_host + "query/archives-uri")
      .then((response) => setArchives(response.data.results));
  }, [api_host]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionid, setSessionid] = useState(null);

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
