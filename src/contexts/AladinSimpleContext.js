import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AladinSimpleContext = createContext();

//const url = "https://uilennest.net/my_astrobase/exoplanets-all/?soltype__icontains=confirmed"
const url = "https://uilennest.net/my_astrobase/asteroids-all/"

export function AladinSimpleContextProvider({ children }) {
    const [skyCoords, setSkyCoords] = useState([0,0]);
    const [fov, setFov] = useState(10);
    const [fetchedData, setFetchedData] = useState(undefined)
    const [status, setStatus ] = useState(undefined)
    const [selectedDataItem, setSelectedDataItem ] = useState(undefined)

    // Fetch data
    useEffect(() => {
            fetchData()
        }, []
    );


    const fetchData = () => {

        if (status !== "fetching") {
            //const url = "https://uilennest.net/my_astrobase/asteroids-all/"
            setStatus("fetching")
            axios
                .get(url)
                .then((response) => {
                    setFetchedData(response.data.results);
                    setStatus("fetched")
                    //alert(response.data.results)
                })

                .catch((error) => {
                    let description = `fetch to ${url} failed`;
                    alert(error.toString() + description)
            });
        }

    }

    return (
        <AladinSimpleContext.Provider
            value={{
                skyCoords,
                setSkyCoords,
                fov,
                setFov,
                status,
                fetchedData,
                selectedDataItem,
                setSelectedDataItem
            }}
        >
        {children}
        </AladinSimpleContext.Provider>
    )
}
