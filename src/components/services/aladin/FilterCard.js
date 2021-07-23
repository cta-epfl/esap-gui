import React, { useContext } from "react";
import {Card } from 'react-bootstrap'
import { AladinAdvancedContext } from "../../../contexts/AladinAdvancedContext";

import YearFilterButton from './YearFilterButton'
import SearchButton from './SearchButton'
import PlanetListCard from './PlanetListCard'

export default function FilterCard(props) {
    const { filteredDataItems, setFilteredDataItems, fetchedData } = useContext(AladinAdvancedContext);

    return (
        <div className="App">
            <Card>

                <Card.Body>
                    <tr><td><h5>Selected Planets: {filteredDataItems.length}</h5></td></tr>
                    <tr><td><YearFilterButton year="All" /></td></tr>
                    <table>
                        <tbody>
                            <tr><td><SearchButton default="search planet name" /></td></tr>
                        </tbody>
                    </table>
                    <PlanetListCard/>
                </Card.Body>
            </Card>
        </div>
    );

}

