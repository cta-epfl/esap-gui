import React, { createContext, useState } from "react";
import useMap from "../hooks/useMap";

export const QueryContext = createContext();

export function QueryContextProvider({ children }) {
  const queryMap = useMap();
  const [formData, setFormData] = useState();
  const [page, setPage] = useState(1);
  const [fits, setFits] = useState("https://uilennest.net/astrobase/data/191231001/3836665.fits");
  const [dplevel, setDPLevel] = useState();
  const [category, setCategory] = useState();
  // const [category, setCategory] = useState();
  // const [level, setLevel] = useState();

  return (
    <QueryContext.Provider
      value={{
        page,
        setPage,
        queryMap,
        formData,
        setFormData,
        fits,
        setFits,
        dplevel,
        setDPLevel,
        category,
        setCategory,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
}
