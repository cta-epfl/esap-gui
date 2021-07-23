import React, { useContext } from "react";
import { Button, Dropdown } from 'react-bootstrap';

import { AladinAdvancedContext } from "../../../contexts/AladinAdvancedContext";

import { getClockIcon } from '../../../utils/styling'

function filterYear(planets, year) {

    return planets.filter((planet) => {
        // year is a range

        if (year.includes('-')) {
            let years = year.split('-')

            if ( parseInt(planet.disc_year) >= parseInt(years[0])
                && parseInt(planet.disc_year) <= parseInt(years[1])) {
                return true
            }
        }

        // year is a number
        if (parseInt(planet.disc_year)===parseInt(year)) {
            return true;
        }
        return false;
    }).slice(0);
}


export default function YearFilterButton() {
    const { filteredDataItems, setFilteredDataItems, fetchedData, showItemList, setShowItemList } = useContext(AladinAdvancedContext);


    const handleClick = (year) => {
        let filtered_exoplanets
        if (year === 'All') {
            filtered_exoplanets = fetchedData
        } else {
            filtered_exoplanets = filterYear(fetchedData, year)
        }
        setFilteredDataItems(filtered_exoplanets)
    }


    return <Dropdown>
        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
            {getClockIcon()}&nbsp;Year of discovery
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleClick("All")}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("1992-1999")}>1992 - 1999</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2000-2004")}>2000 - 2004</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2005-2009")}>2000 - 2009</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2010-2014")}>2000 - 2014</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2015")}>2015</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2016")}>2016</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2017")}>2017</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2018")}>2018</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2019")}>2019</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2020")}>2020</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2021")}>2021</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>


}