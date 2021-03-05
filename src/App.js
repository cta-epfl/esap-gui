import React from "react";
import "./App.css";
import Routes from "./routes/Routes";
import { GlobalContextProvider } from "./contexts/GlobalContext";
import { QueryContextProvider } from "./contexts/QueryContext";
import { IDAContextProvider } from "./contexts/IDAContext";

// This is the App, only application global stuff goes here, like the global state provider.

export default function App() {
  return (
    <div>
      <GlobalContextProvider>
        <QueryContextProvider>
          <IDAContextProvider>
            <Routes />
          </IDAContextProvider>
        </QueryContextProvider>
      </GlobalContextProvider>
    </div>
  );
}
