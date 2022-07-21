import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import axios from "axios";
import getCookie from "../utils/getCookie";

export const GlobalContext = createContext();

// request the user profile (async) and on return set pieces of global state
function setProfileState(api_host,
                         setLoggedInUserName,
                         setIdToken,
                         setAccessToken,
                         setTokenExpiration,
                         setIsAuthenticated){

    const profileUrl = api_host + "accounts/user-profiles/";
    axios
    .get(profileUrl, {withCredentials: true})
    .then((response) => {
        setLoggedInUserName(response.data.results[0].full_name);
        setIdToken(response.data.results[0].oidc_id_token)
        setAccessToken(response.data.results[0].oidc_access_token)

        let tokenExpiration = response.data.results[0].id_token_expiration
        setTokenExpiration(tokenExpiration)

        localStorage.setItem('esap_logged_in', true)
        setIsAuthenticated(true);

    })

    .catch((error) => {
        console.log('GlobalContext.setProfileState:' + error)
        // when the token is no longer valid, .get with credentials will fail
        // mark the user as being logged out
        localStorage.removeItem('esap_logged_in')
        setIsAuthenticated(false);
        setLoggedInUserName("");

    });
}

export function GlobalContextProvider({ children }) {

    // const api_host = process.env["API_HOST"];
    // const api_host = "http://localhost:8000/esap-api/";
    const api_host = "/esap-api/";
    // process.env.NODE_ENV === "development"
    //   ? "http://localhost:5555/esap-api/"
    //   : "http://localhost:8000/esap-api/";

    const [archives, setArchives] = useState([]);
    const [datasets, setDatasets] = useState([]);
    const [navbar, setNavbar] = useState();
    const [loggedInUserName, setLoggedInUserName] = useState();
    const [idToken, setIdToken] = useState([]);
    const [accessToken, setAccessToken] = useState([]);
    const [tokenExpiration, setTokenExpiration] = useState([]);

    useEffect(() => {
        axios
          .get(api_host + "query/archives-uri")
          .then((response) => setArchives(response.data.results));
        }, [api_host]);

    useEffect(() => {
        axios
            .get(api_host + "query/datasets-uri")
            .then((response) => setDatasets(response.data.results));
        }, [api_host]);

    useEffect(() => {
        axios
        .get(api_host + "query/configuration?name=navbar")
          .then((response) => {
            console.log("navbar response", response.data.configuration);
            setNavbar(response.data.configuration);
          });
    }, [api_host]);

    // Zheng: "!!!!! Still need to look at sessionid and stuff"
    const [sessionid, setSessionid] = useState(getCookie("sessionid"));
    console.log("waah", sessionid, getCookie("sessionid"), document.cookie);

    const [isAuthenticated, setIsAuthenticated] = useState(sessionid ? true : false);

    const handleLogin = ({ history }) => {
        console.log('handleLogin()')
      setIsAuthenticated(true);
      setSessionid(getCookie("sessionid"));
      history.replace("/");
      setProfileState(
          api_host,
          setLoggedInUserName,
          setIdToken,
          setAccessToken,
          setTokenExpiration,
          setIsAuthenticated);
      return null;
    };

    // used when token expiration is detected before or during an axios fetch
    const loginAgain = (history) => {
        console.log('loginAgain()')
        const loginUrl = api_host + "oidc/authenticate"
        console.log('history = '+history)

        //history.replace("/login");
        window.location = loginUrl
        //alert('history push')
        //history.push("/login");
    }

    const handleLogout = ({ history }) => {
        console.log('handleLogout()')
        setIsAuthenticated(false);
        setSessionid(null);
        history.replace("/");
        setLoggedInUserName("");
        localStorage.removeItem('esap_logged_in')
    return null;
    };

    // when a page refresh is given, react loses its state.
    // handleLogin therefore stores a flag in localstorage, which is checked on refresh
    const refreshLogin = (history) => {
        let loggedIn = localStorage.getItem('esap_logged_in')
        console.log('refreshLogin:',isAuthenticated,loggedIn)
        if ((!isAuthenticated) && (loggedIn)) {
            history.replace("/login");
        }
    }

    // compare the tokenExpiration timestamp with the current time
    // to determine if the token is still valid.
    const isTokenValid = () => {
        let expiration = Date.parse(tokenExpiration)
        let now = Date.parse(new Date())
        let valid = (expiration - now) > 0
        return (expiration - now)/1000
    }

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

    // find a dataset record in the list of datasets
    const getDataset = (uri) => {
        return datasets.filter(
            function(datasets) {
                return datasets.uri == uri
            }
        )
    }

  return (
    <GlobalContext.Provider
      value={{
          api_host,
          isAuthenticated,
          sessionid,
          archives,
          datasets,
          navbar,
          handleLogin,
          handleLogout,
          handleError,
          loggedInUserName,
          idToken,
          accessToken,
          tokenExpiration,
          refreshLogin,
          isTokenValid,
          loginAgain,
          getDataset
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
