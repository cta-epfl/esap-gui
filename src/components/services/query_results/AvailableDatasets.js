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
                    <thead>
                    <th>Select Datasets to query</th>
                    </thead>
                    <tbody>
                    <tr>
                    {props.results.map((result, index) => (
                        <td key={result.dataset}>
                            <td>
                                <SelectDatasetCheckBox id={result.dataset} item={result} />
                            </td>
                            <td>{result.dataset} ({result.archive})</td>
                        </td>
                    ))}
                    </tr>
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
}