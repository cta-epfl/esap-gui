import React, { createContext, useState, useEffect, useContext } from "react";

export const IVOAContext = createContext();

export function IVOAContextProvider({ children }) {
  const [registryList, setRegistryList] = useState([]);
 // const [selectedRegistry, setSelectedRegistry] = useState([]);
  const [queryStep, setQueryStep] = useState("get-services");
  const [regPage, setRegPage] = useState(1);

  /* 
    IVOA query steps:
    1. get-services
    2. run-query: query selected registry
  */

  // For testing purpose
  // start manual setup block
  //const [queryStep, setQueryStep] = useState("run-query");
  const [selectedRegistry, setSelectedRegistry] = useState("http://astron.nl/tap");
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
        setSelectedRegistry,
        addRegistry: handleAddRegistry,
        removeRegistry: handleRemoveRegistry,
        regPage,
        setRegPage,
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
