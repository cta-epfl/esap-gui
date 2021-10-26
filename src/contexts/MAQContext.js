import React, { createContext, useState, useEffect, useContext } from "react";

// Multiple Archives Query (MAQ) context

// statusses
export const CREATE_QUERY_PARAMS = 'create-query-params'
export const FETCHING_CREATE_QUERY = 'fetching-create-query'
export const FETCHED_CREATE_QUERY = 'fetched-create-query'
export const QUERIES_SELECTED = 'queries-selected'
export const RUN_SELECTED_QUERIES = 'run-selected-queries'
export const FETCHING_SELECTED_QUERIES = 'fetching-selected-queries'
export const FETCHED_SELECTED_QUERIES = 'fetched-selected-queries'
export const ERROR_FETCHING_QUERY = 'error-fetching-query'

export const MAQContext = createContext();

export function MAQContextProvider({ children }) {
    const [selectedArchives, setSelectedArchives] = useState([]);
    const [queryStep, setQueryStep] = useState("create-query");
    const [archiveQueries, setArchiveQueries] = useState([]);
    const [selectedQueries, setSelectedQueries] = useState([]);
    const [status, setStatus] = useState("");

    /*
    Multiple Archives Query steps:
    1. create-query
    2. run-query
    */

    function handleAddArchive(access_url) {
        setSelectedArchives([...selectedArchives, access_url]);
    }

    function handleRemoveArchive(access_url) {
        const copy = [...selectedArchives];
        const index = copy.findIndex((url) => url === access_url);
        copy.splice(index, 1);
        setSelectedArchives(copy);
    }

    function handleSelectQuery(archiveQuery) {
        setSelectedQueries([...selectedQueries, archiveQuery]);
        setStatus(QUERIES_SELECTED)
        console.log(status)
    }

    function handleUnselectQuery(archiveQuery) {
        const copy = [...selectedQueries];
        const index = copy.findIndex((q) => q === archiveQuery);
        copy.splice(index, 1);
        setSelectedQueries(copy);
    }

  return (
    <MAQContext.Provider
      value={{
        selectedArchives,
        setSelectedArchives,
        addArchive: handleAddArchive,
        removeArchive: handleRemoveArchive,
        queryStep,
        setQueryStep,
        archiveQueries,
        setArchiveQueries,
        status,
        setStatus,
        selectedQueries,
        setSelectedQueries,
        select: handleSelectQuery,
        unselect: handleUnselectQuery,
      }}
    >
      {children}
    </MAQContext.Provider>
  );
}
