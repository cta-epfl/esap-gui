import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { Archives } from "../components/archives/Archives";
import ArchiveDetails from "../components/archives/ArchiveDetails";
import { GlobalContext } from "../contexts/GlobalContext";
import QueryCatalogs from "../components/query/QueryCatalogs";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../components/NavBar";
import { QueryContextProvider } from "../contexts/QueryContext";

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
        <Route path="/query">
          <QueryContextProvider>
            <QueryCatalogs />
          </QueryContextProvider>
        </Route>
        <Route exact path="/login" component={handleLogin} />
        <Route exact path="/logout" component={handleLogout} />
        <Route path="/archives/:uri" component={ArchiveDetails} />
      </Switch>
    </Router>
  );
}
