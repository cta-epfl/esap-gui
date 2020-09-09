import React, { createContext, useState } from "react";
import useMap from "../hooks/useMap";

export const QueryContext = createContext();

export function QueryContextProvider({ children }) {
  const queryMap = useMap();
  const [formData, setFormData] = useState();
  const [page, setPage] = useState(1);

  function newPageCallback(setPage) {
    return (args) => {
      if (args.target) {
        setPage(parseFloat(args.target.text));
      }
    };
  }
  return (
    <QueryContext.Provider
      value={{
        page,
        setPage,
        newPageCallback,
        queryMap,
        formData,
        setFormData,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
}
