import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Archives } from "../components/archives/Archives";
import ArchiveDetails from "../components/archives/ArchiveDetails";
import { GlobalContext } from "../contexts/GlobalContext";
import QueryCatalogs from "../components/query/QueryCatalogs";
import QueryIVOARegistry from "../components/query/QueryIVOARegistry";
import QueryMultipleArchives from "../components/query/QueryMultipleArchives";
//import QueryMultipleArchives from "../components/query/QueryNico";

import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../components/NavBar";
import Rucio from "../components/services/Rucio";
import Interactive from "../components/services/Interactive";
import Batch from "../components/services/Batch";
import MyBasketPage from "../components/basket/MyBasketPage";

import { IVOAContextProvider } from "../contexts/IVOAContext";
import { IDAContext } from "../contexts/IDAContext";
import { BATCHContext } from "../contexts/BATCHContext";
import { AladinSimpleContextProvider } from "../contexts/AladinSimpleContext";
import { AladinAdvancedContextProvider } from "../contexts/AladinAdvancedContext";

import SampPage from '../components/services/samp/SampPage';
import AladinSimplePage from '../components/services/aladin/AladinSimplePage';
import AladinAdvancedPage from '../components/services/aladin/AladinAdvancedPage';

export default function Routes() {
    const { navbar, handleLogin, handleLogout, handleError } = useContext(GlobalContext);
    const { jhubURL } = useContext(IDAContext);

    if (!navbar) return null;

    // nv: if no jhubURL can be loaded then whole website should be blank? Isn't that overkill? commented it out for now
    // if (!jhubURL) return null;

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
            <Route exact path="/batch">
                <Batch />
            </Route>
            /*
            <Route exact path="/vo-query">
                <Redirect to="/archives/ivoa/query" />
            </Route>
            */
            <Route exact path="/jhub" render={() => (window.location = {jhubURL})} />
            <Route exact path="/login" component={handleLogin} />
            <Route exact path="/logout" component={handleLogout} />
            <Route exact path="/error" component={handleError} />


            <Route exact path="/archives/:uri" component={ArchiveDetails} />

            /* specific behaviour for IVOA 'archive' to enable a 2-stage query  */
            <Route exact path="/archives/ivoa/query">
                <IVOAContextProvider>
                    <QueryIVOARegistry />
                </IVOAContextProvider>
            </Route>


            /* default 1-stage synchronous query behaviour for most archives */
            <Route exact path={["/archives/:uri/query"]}>
                <QueryCatalogs />
            </Route>

            /* query multiple archives */
            <Route exact path="/query">
                <QueryMultipleArchives />
            </Route>

            <Route exact path="/samp"  >
                <SampPage/>
            </Route>

            <Route exact path="/aladin_simple"  >
                <AladinSimpleContextProvider>
                    <AladinSimplePage/>
                </AladinSimpleContextProvider>
            </Route>
            <Route exact path="/aladin_advanced"  >
                <AladinAdvancedContextProvider>
                    <AladinAdvancedPage/>
                </AladinAdvancedContextProvider>
            </Route>

          <Route exact path="/basket"  >
              <MyBasketPage/>
          </Route>

        </Switch>

      <footer><small>esap-gui version 21 jan 2022 - 10:00</small></footer>
    </Router>
  );
}
