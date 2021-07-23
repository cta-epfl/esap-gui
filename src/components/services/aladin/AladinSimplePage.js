import React, { useContext } from "react";
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

import LoadingSpinner from '../../LoadingSpinner';
import { AladinSimpleContext } from "../../../contexts/AladinSimpleContext";

import Aladin from './AladinSimple'

export default function AladinPage(props) {
    const { skyCoords, fov, status, fetchedData } = useContext(AladinSimpleContext);

    // https://stackoverflow.com/questions/61347860/using-aladin-lite-app-not-built-for-react-in-react-app
    let defaultSurvey = {survey: "P/DSS2/color"}

    let renderPage

    if (status === "fetched") {
        renderPage = <div className="aladin">
            <Aladin ra={skyCoords[0]}
                    dec={skyCoords[1]}
                    fov={fov}
                    data={fetchedData}/>
        </div>
    } else {
        renderPage = <LoadingSpinner/>
    }

    return (
        <div>
            <Container fluid>
                <Row>

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