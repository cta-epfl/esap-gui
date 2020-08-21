import React, { createContext, useState } from "react";
import useMap from "../hooks/useMap";

export const IVOAContext = createContext();

export function IVOAContextProvider({ children }) {
  const [selectedRegistry, setSelectedRegistry] = useState([]);
  const [registryList, setRegistryList] = useState([]);

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
      }}
    >
      {children}
    </IVOAContext.Provider>
  );
}
