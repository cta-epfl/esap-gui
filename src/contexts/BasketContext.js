import React, { useState, createContext } from "react";
import Databasket from "../components/basket/databasket";
import Addtobasket from "../components/basket/addtobasket";
import BasketContext from "../contexts/BasketContext";

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
      value={{ datasets, add: handleAddDataset, remove: handleRemoveDataset }}
    >
      {children}
    </BasketContext.Provider>
  );
}
