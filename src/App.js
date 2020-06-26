import React from "react";
import "./App.css";
import Routes from "./routes/Routes";
import { GlobalContextProvider } from "./contexts/GlobalContext";

// This is the App, only application global stuff goes here, like the global state provider.

export default function App() {
  return (
    <div>
      <GlobalContextProvider>
        <Routes />
      </GlobalContextProvider>
    </div>
  );
}
