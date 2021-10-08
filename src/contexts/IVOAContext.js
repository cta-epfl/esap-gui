import React, { createContext, useState, useEffect, useContext } from "react";

export const IVOAContext = createContext();

export function IVOAContextProvider({ children }) {
  const [registryList, setRegistryList] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
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
  // const [selectedServices, setSelectedServices] = useState("http://astron.nl/tap");
  // end block

  function handleAddService(access_url) {
    setSelectedServices([...selectedServices, access_url]);
  }

  function handleRemoveService(access_url) {
    const copy = [...selectedServices];
    const index = copy.findIndex((url) => url === access_url);
    copy.splice(index, 1);
    setSelectedServices(copy);
  }
  return (
    <IVOAContext.Provider
      value={{
        selectedServices,
        setSelectedServices,
        addRegistry: handleAddService,
        removeService: handleRemoveService,
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
