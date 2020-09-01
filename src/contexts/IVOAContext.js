import React, { createContext, useState } from "react";

export const IVOAContext = createContext();

export function IVOAContextProvider({ children }) {
  const [registryList, setRegistryList] = useState([]);
  function handleAddRegistry(access_url) {
    setRegistryList([...registryList, access_url]);
  }

  function handleRemoveRegistry(access_url) {
    const copy = [...registryList];
    const index = copy.findIndex((url) => url === access_url);
    copy.splice(index, 1);
    setRegistryList(copy);
  }
  return (
    <IVOAContext.Provider
      value={{
        registryList,
        add: handleAddRegistry,
        remove: handleRemoveRegistry,
      }}
    >
      {children}
    </IVOAContext.Provider>
  );
}
