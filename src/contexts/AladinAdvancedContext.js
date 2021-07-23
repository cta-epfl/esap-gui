import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AladinAdvancedContext = createContext();

export function AladinAdvancedContextProvider({ children }) {
    const [skyCoords, setSkyCoords] = useState([0,0]);
    const [fov, setFov] = useState(45);
    const [fetchedData, setFetchedData] = useState(undefined)
    const [status, setStatus ] = useState(undefined)
    const [selectedDataItem, setSelectedDataItem ] = useState(undefined)
    const [filteredDataItems, setFilteredDataItems ] = useState(undefined)
    const [showItemList, setShowItemList] = useState(false)

    // Fetch data
    useEffect(() => {
            fetchData()
        }, []
    );


    const fetchData = () => {

        if (status !== "fetching") {
            const url = "https://uilennest.net/my_astrobase/exoplanets-all/?soltype__icontains=confirmed"
            //const url = "https://uilennest.net/my_astrobase/exoplanets/?hostname__icontains=K2-111"
            setStatus("fetching")
            axios
                .get(url)
                .then((response) => {
                    setFetchedData(response.data.results)
                    setFilteredDataItems(response.data.results)
                    setStatus("fetched")
                })

                .catch((error) => {
                    setStatus("error")
                    let description = `fetch to ${url} failed`;
                    alert(error.toString() + description)
            });
        }

    }

    return (
        <AladinAdvancedContext.Provider
            value={{
                skyCoords,
                setSkyCoords,
                fov,
                setFov,
                status,
                fetchedData,
                selectedDataItem,
                setSelectedDataItem,
                filteredDataItems,
                setFilteredDataItems,
                showItemList,
                setShowItemList
            }}
        >
        {children}
        </AladinAdvancedContext.Provider>
    )
}
