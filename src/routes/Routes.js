import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { Archives } from "../components/archives/Archives";
import ArchiveDetails from "../components/archives/ArchiveDetails";
import { GlobalContext } from "../contexts/GlobalContext";
import QueryCatalogs from "../components/query/QueryCatalogs";
import QueryIVOARegistry from "../components/query/QueryIVOARegistry";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../components/NavBar";
import Rucio from "../components/Rucio";
import Interactive from "../components/Interactive";
import { IVOAContextProvider } from "../contexts/IVOAContext";
import { IDAContext } from "../contexts/IDAContext";

export default function Routes() {
  const { navbar, handleLogin, handleLogout, handleError } = useContext(GlobalContext);
  const { jhubURL } = useContext(IDAContext);
  if (!navbar) return null;
  if (!jhubURL) return null;

  return (
    <Router basename={navbar.frontend_basename}>
      <NavBar />
      <Switch>
        <Route exact path={["/", "/archives"]}>
          <Archives />
        </Route>
        <Route exact path="/rucio">
          <Rucio />
        </Route>
        <Route exact path="/interactive">
          <Interactive />
        </Route>
        <Route exact path="/jhub" render={() => (window.location = {jhubURL})} />
        <Route exact path="/login" component={handleLogin} />
        <Route exact path="/logout" component={handleLogout} />
        <Route exact path="/error" component={handleError} />
        <Route exact path="/archives/:uri" component={ArchiveDetails} />
        <Route exact path={["/vo-query", "/archives/ivoa/query"]}>
          <IVOAContextProvider>
            <QueryIVOARegistry />
          </IVOAContextProvider>
        </Route>
        <Route exact path={["/adex-query", "/archives/:uri/query"]}>
          <QueryCatalogs />
        </Route>
      </Switch>
    </Router>
  );
}
