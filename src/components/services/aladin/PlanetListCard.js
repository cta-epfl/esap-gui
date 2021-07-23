import React, { useContext } from "react";
import {Card, Table } from 'react-bootstrap'
import { AladinAdvancedContext } from "../../../contexts/AladinAdvancedContext";

import GotoButton from './GotoButton'

export default function PlanetListCard(props) {
    const { filteredDataItems, showItemList } = useContext(AladinAdvancedContext);


    if (!showItemList) {
        return null
    }

    let render_planets = filteredDataItems.map( (planet) => {
            return <GotoButton pl_name={planet.pl_name} ra={planet.ra} dec={planet.dec}/>
        }
    )

    return (
        <div className="App">
            <Card>
                <Table striped bordered hover size="sm">
                    <tbody>
                    {render_planets}
                    </tbody>
                </Table>
            </Card>
        </div>
    );

}

