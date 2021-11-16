import React, { createContext, useState, useEffect, useContext } from "react";

// Multiple Archives Query (MAQ) context

// statusses
export const QUERY_FORM = 'query-form'
export const PREPARE_QUERIES = 'prepare-queries'
export const PREPARED_QUERIES = 'prepared-queries'
export const CREATE_QUERIES = 'create-queries'
export const FETCHING_CREATE_QUERY = 'fetching-create-query'
export const FETCHED_CREATE_QUERY = 'fetched-create-query'
export const QUERIES_SELECTED = 'queries-selected'
export const RUN_SELECTED_QUERIES = 'run-selected-queries'
export const FETCHING_SELECTED_QUERIES = 'fetching-selected-queries'
export const FETCHED_SELECTED_QUERIES = 'fetched-selected-queries'
export const ERROR_FETCHING_QUERY = 'error-fetching-query'

export const MAQContext = createContext();

export function MAQContextProvider({ children }) {
    const [datasets, setDatasets] = useState([]);
    const [selectedDatasets, setSelectedDatasets] = useState([]);
    const [availableDatasets, setAvailableDatasets] = useState([]);
    const [queryResults, setQueryResults] = useState([]);
    const [status, setStatus] = useState(PREPARE_QUERIES);

    function handleAddDataset(access_url) {
        setSelectedDatasets([...selectedDatasets, access_url]);
    }

    function handleRemoveDataset(access_url) {
        const copy = [...selectedDatasets];
        const index = copy.findIndex((url) => url === access_url);
        copy.splice(index, 1);
        setSelectedDatasets(copy);
    }

  return (
    <MAQContext.Provider
      value={{
        datasets,
        setDatasets,
        availableDatasets,
        setAvailableDatasets,
        selectedDatasets,
        setSelectedDatasets,
        selectDataset: handleAddDataset,
        unselectDataset: handleRemoveDataset,

        status,
        setStatus,
        queryResults,
        setQueryResults,
      }}
    >
      {children}
    </MAQContext.Provider>
  );
}
