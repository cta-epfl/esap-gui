import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import axios from "axios";
import getCookie from "../utils/getCookie";

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  
  const api_host =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/esap-api/"
      : "https://sdc-dev.astron.nl:5555/esap-api/";
  // "https://sdc.astron.nl:5555/esap-api/"
  // "http://localhost:5555/esap-api/"

  const [archives, setArchives] = useState();
  const [navbar, setNavbar] = useState();
  useEffect(() => {
    axios
      .get(api_host + "query/archives-uri")
      .then((response) => setArchives(response.data.results));
  }, [api_host]);

  useEffect(() => {
    axios
    .get(api_host + "query/configuration?name=navbar")
      .then((response) => {
        console.log("navbar response", response.data.configuration);
        setNavbar(response.data.configuration);
      });
  }, [api_host]);

  // !!!!! Still need to look at sessionid and stuff
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

  const handleError = (event) => {
    setIsAuthenticated(false);
    setSessionid(null);

    return (
      <>
      <Alert variant="warning">An error has occurred during login!</Alert>
      <Alert variant="warning">{event.staticContext}</Alert>
      </>
    );
  };
  

  return (
    <GlobalContext.Provider
      value={{
        api_host,
        isAuthenticated,
        sessionid,
        archives,
        navbar,
        handleLogin,
        handleLogout,
        handleError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
