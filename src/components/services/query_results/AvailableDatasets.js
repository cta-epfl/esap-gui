import React, { useContext, useState } from "react";
import {Container, Card, Table } from 'react-bootstrap'
import SelectDatasetCheckBox from "./SelectDatasetCheckBox";

function createItem(result){
    return {
        query_step: "dataset",
        result: result,
    };
}

export default function AvailableDatasets(props) {
    return (
        <Container fluid>
            <Card>
                <Table>

                    <tbody>
                    <tr>
                    {props.results.map((result, index) => (

                        <td key={result.dataset}>
                            <Card>

                            <td><SelectDatasetCheckBox id={result.dataset} item={result} />
                                {result.dataset} ({result.archive})
                            </td>
                            </Card>
                        </td>

                    ))}
                    </tr>
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
}