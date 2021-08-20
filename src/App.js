import React from "react";
import "./App.css";
import Routes from "./routes/Routes";
import { GlobalContextProvider } from "./contexts/GlobalContext";
import { BasketContextProvider } from "./contexts/BasketContext";
import { QueryContextProvider } from "./contexts/QueryContext";
import { IVOAContextProvider } from "./contexts/IVOAContext";
import { IDAContextProvider } from "./contexts/IDAContext";

// This is the App, only application global stuff goes here, like the global state provider.

export default function App() {
  return (
    <div>
      <GlobalContextProvider>
          <BasketContextProvider>
            <QueryContextProvider>
              <IDAContextProvider>
                <IVOAContextProvider>
                  <Routes />
                </IVOAContextProvider>
              </IDAContextProvider>
            </QueryContextProvider>
          </BasketContextProvider>
      </GlobalContextProvider>
    </div>
  );
}
