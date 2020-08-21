import React, { createContext, useState } from "react";
import useMap from "../hooks/useMap";

export const IVOAContext = createContext();

export function IVOAContextProvider({ children }) {
  const [registryList, setRegistryList] = useState([]);
  //const [selectedRegistry, setSelectedRegistry] = useState([]);
  //const [queryStep, setQueryStep] = useState("get-services");
  /* 
    IVOA query steps:
    1. get-services
    2. run-query: query selected registry
  */

  // For testing purpose
  // start manual setup block
  const [queryStep, setQueryStep] = useState("run-query");
  const [selectedRegistry, setSelectedRegistry] = useState([
    // "http://astron.nl/tap",
    // "http://aip.gavo.org/tap",
    // "http://archive.stsci.edu/caomtap",
    "http://vao.stsci.edu/CAOMTAP/TapService.aspx",
  ]);
  // end block

  function handleAddRegistry(access_url) {
    setSelectedRegistry([...selectedRegistry, access_url]);
  }

  function handleRemoveRegistry(access_url) {
    const copy = [...selectedRegistry];
    const index = copy.findIndex((url) => url === access_url);
    copy.splice(index, 1);
    setSelectedRegistry(copy);
  }
  return (
    <IVOAContext.Provider
      value={{
        selectedRegistry,
        addRegistry: handleAddRegistry,
        removeRegistry: handleRemoveRegistry,
        registryList,
        setRegistryList,
        queryStep,
        setQueryStep,
      }}
    >
      {children}
    </IVOAContext.Provider>
  );
}
