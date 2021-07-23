import React, { useContext } from "react";
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

import LoadingSpinner from '../../LoadingSpinner';
import { AladinAdvancedContext } from "../../../contexts/AladinAdvancedContext";

import Aladin from './AladinAdvanced'
import DataItemCard from './DataItemCard'
import FilterCard from './FilterCard'

export default function AladinAdvancedPage(props) {
    const { skyCoords, fov, status, fetchedData, filteredDataItems } = useContext(AladinAdvancedContext);

    // https://stackoverflow.com/questions/61347860/using-aladin-lite-app-not-built-for-react-in-react-app
    let defaultSurvey = {survey: "P/DSS2/color"}

    let renderPage

    if (status === "fetched") {

        renderPage = <div className="aladin">
            <Aladin ra={skyCoords[0]}
                    dec={skyCoords[1]}
                    fov={fov}
                    data={filteredDataItems}/>
        </div>
    } else {
        return <LoadingSpinner/>
    }

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col sm={3} md={3} lg={3}>
                        <FilterCard/>
                        <DataItemCard/>

                    </Col>
                    <Col sm={9} md={9} lg={9}>
                        <Card>
                            {renderPage}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}