import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import axios from "axios";
import getCookie from "../utils/getCookie";

export const GlobalContext = createContext();

function getUserName(api_host, setLoggedInUserName){
  const profileUrl = api_host + "accounts/user-profiles/";
  axios
    .get(profileUrl, {withCredentials: true})
    .then((response) => {
      setLoggedInUserName(response.data.results[0].full_name);
    })
}

export function GlobalContextProvider({ children }) {
  
  const api_host =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/esap-api/"
      : "https://sdc-dev.astron.nl:5555/esap-api/";
  // "https://sdc.astron.nl:5555/esap-api/"
  // "http://localhost:5555/esap-api/"

  const [archives, setArchives] = useState();
  const [navbar, setNavbar] = useState();
  const [loggedInUserName, setLoggedInUserName] = useState();

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
    getUserName(api_host, setLoggedInUserName);
    return null;
  };

  const handleLogout = ({ history }) => {
    setIsAuthenticated(false);
    setSessionid(null);
    history.replace("/");
    setLoggedInUserName("");
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
        loggedInUserName,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
