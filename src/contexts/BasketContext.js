import React, { useState, createContext } from "react";

export const BasketContext = createContext();

export function BasketContextProvider({ children }) {
    const [datasets, setDatasets] = useState([]);

    const [hasChanged, setHasChanged] = useState(false);

    function handleAddDataset(dataset) {
      setDatasets([...datasets, dataset]);
      setHasChanged(true)
    }

    function handleRemoveDataset(dataset) {
      const copy = [...datasets];
      const index = copy.findIndex((ds) => ds === dataset);
      copy.splice(index, 1);
      setDatasets(copy);
      setHasChanged(true)
    }

    return (
      <BasketContext.Provider
        value={{
            datasets,
            setDatasets,
            hasChanged,
            setHasChanged,
            add: handleAddDataset,
            remove: handleRemoveDataset,
        }}
      >
      {children}
    </BasketContext.Provider>
  );
}
