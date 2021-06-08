import React, { useState, createContext } from "react";

export const BasketContext = createContext();

export function BasketContextProvider({ children }) {
  const [datasets, setDatasets] = useState([]);

  function handleAddDataset(dataset) {
    setDatasets([...datasets, dataset]);
  }

  function handleRemoveDataset(dataset) {
    const copy = [...datasets];
    const index = copy.findIndex((ds) => ds === dataset);
    copy.splice(index, 1);
    setDatasets(copy);
  }

  return (
    <BasketContext.Provider
      value={{ datasets, setDatasets, add: handleAddDataset, remove: handleRemoveDataset }}
    >
      {children}
    </BasketContext.Provider>
  );
}
