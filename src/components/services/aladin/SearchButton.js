import React, { useContext } from "react";
import { Form, FormControl, Button } from 'react-bootstrap';

import { getBackspaceIcon } from '../../../utils/styling'
import { AladinAdvancedContext } from "../../../contexts/AladinAdvancedContext";

// return a list of planets where 'pl_name' has the value of 'searchText' in it
function filterPlanets(planets, searchText, maxResults) {

    return planets.filter((planet) => {

        if (planet.pl_name.toUpperCase().includes(searchText)) {
            return true;
        }

        return false;
    }).slice(0, maxResults);
}

// typing in the search box will execute a filter and dispatch it. The observation screen responds instantly.
export default function SearchButton(props) {
    const { filteredDataItems, setFilteredDataItems, fetchedData, showItemList, setShowItemList } = useContext(AladinAdvancedContext);

    let text_to_search

    function doFilter() {
        let filtered_exoplanets = filterPlanets(fetchedData, text_to_search, 5000)

        setFilteredDataItems(filtered_exoplanets)

        if (filtered_exoplanets.length <= 50) {
            setShowItemList(true)
        } else {
            if (showItemList) {
                setShowItemList(false)
            }
        }
        return
    }

    const handleResetClick = (event) => {
        setFilteredDataItems(fetchedData)
        setShowItemList(false)
    }

    // use if you want the search to start while you hit enter
        const handleKeyUp = (event) => {

        text_to_search = event.target.value.toUpperCase()

        //if (event.charCode === 13) {
            doFilter()

            // prevent the enter key to reload the whole page
            //event.preventDefault()
        //}

    }

    return <Form inline>
        <td>
            <FormControl
                type="text"
                placeholder={props.default}
                className="mr-sm-1"
                onKeyUp={handleKeyUp}>
            </FormControl>
        </td>
        <td><Button type="reset" variant="outline-primary" onClick={handleResetClick}>{getBackspaceIcon()}&nbsp;Reset</Button></td>
        </Form>


}
