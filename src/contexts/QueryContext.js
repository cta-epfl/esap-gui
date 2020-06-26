import React, { createContext, useState } from "react";
import useMap from "../hooks/useMap";

export const QueryContext = createContext();

export function QueryContextProvider({ children }) {
  const queryMap = useMap();
  const [formData, setFormData] = useState();
  return (
    <QueryContext.Provider
      value={{
        queryMap,
        formData,
        setFormData,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
}
