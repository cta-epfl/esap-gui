import React, { useState, createContext } from "react";

export const BasketContext = createContext();

export function BasketContextProvider({ children }) {
    const [datasets, setDatasets] = useState([]);

    const [hasChanged, setHasChanged] = useState(false);
    const [refresh, setRefresh] = useState(false);

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

    function handleClearDatasets() {
        const copy = []
        setDatasets(copy);
        setHasChanged(true)
    }

    return (
      <BasketContext.Provider
        value={{
            datasets, setDatasets,
            hasChanged, setHasChanged,
            refresh, setRefresh,
            add: handleAddDataset,
            remove: handleRemoveDataset,
            clear: handleClearDatasets,
            changed: setHasChanged,
        }}
      >
      {children}
    </BasketContext.Provider>
  );
}
