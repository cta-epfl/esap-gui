import React, { createContext, useState } from "react";
import useMap from "../hooks/useMap";

export const QueryContext = createContext();

export function QueryContextProvider({ children }) {
  const queryMap = useMap();
  const [formData, setFormData] = useState();
  const [page, setPage] = useState(1);
  return (
    <QueryContext.Provider
      value={{
        page,
        setPage,
        queryMap,
        formData,
        setFormData,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
}
