import React, { useState, createContext } from "react";
import Databasket from "../components/basket/databasket";
import Addtobasket from "../components/basket/addtobasket";
import BasketContext from "../contexts/BasketContext";

const BasketContext = createContext();
const initialDatasets = ["First Dataset 1", "Just another dataset"];

function mydatasets() {
  const [datasets, setDatasets] = useState(initialDatasets);

  function handleAddDataset(Dataset) {
    setDatasets([...datasets, Dataset]);
  }

  function handleRemoveDataset(index) {
    const copy = [...datasets];
    copy.splice(index, 1);
    setDatasets(copy);
  }
  return (
    <BasketContext.Provider
      value={{ datasets, add: handleAddDataset, remove: handleRemoveDataset }}
    >
      <div className="App">
        <header className="App-header">
          <h2>DataBasket App</h2>
          <Addtobasket />
          <Databasket />
        </header>
      </div>
    </BasketContext.Provider>
  );
}

export default BasketContext;
