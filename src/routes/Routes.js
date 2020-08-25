import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { Archives } from "../components/archives/Archives";
import ArchiveDetails from "../components/archives/ArchiveDetails";
import { GlobalContext } from "../contexts/GlobalContext";
import QueryCatalogs from "../components/query/QueryCatalogs";
import QueryIVOARegistry from "../components/query/QueryIVOARegistry";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../components/NavBar";
import { QueryContextProvider } from "../contexts/QueryContext";
import Rucio from "../components/Rucio";
import Interactive from "../components/Interactive";
import { IVOAContextProvider } from "../contexts/IVOAContext";

export default function Routes() {
  const { config, handleLogin, handleLogout } = useContext(GlobalContext);
  if (!config) return null;

  return (
    <Router basename={config.frontend_basename}>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Archives />
        </Route>
        <Route exact path="/archives">
          <Archives />
        </Route>
        <Route exact path="/query">
          <QueryContextProvider>
            <IVOAContextProvider>
              <QueryIVOARegistry />
            </IVOAContextProvider>
          </QueryContextProvider>
        </Route>
        <Route exact path="/rucio">
          <Rucio />
        </Route>
        <Route exact path="/interactive">
          <Interactive />
        </Route>
        <Route exact path="/login" component={handleLogin} />
        <Route exact path="/logout" component={handleLogout} />
        <Route exact path="/archives/:uri" component={ArchiveDetails} />
        <Route exact path="/archives/ivoa/query">
          <QueryContextProvider>
            <IVOAContextProvider>
              <QueryIVOARegistry />
            </IVOAContextProvider>
          </QueryContextProvider>
        </Route>
        <Route exact path="/archives/:uri/query">
          <QueryContextProvider>
            <QueryCatalogs />
          </QueryContextProvider>
        </Route>
      </Switch>
    </Router>
  );
}
