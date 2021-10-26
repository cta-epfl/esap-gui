import React, { useContext, useState } from "react";
import {Container, Card, Table } from 'react-bootstrap'
import SelectQueryCheckBox from "./SelectQueryCheckBox";

function createItem(result){
    return {
        query_step: "create_query",
        result: result,
    };
}

export default function CreateQueryResults(props) {
    return (
        <Container fluid>
        <Card>
            <Table>
                <thead>
                <tr className="bg-light">
                    <th>Select</th>
                    <th>Archive</th>
                    <th>Dataset</th>
                    <th>Created Query</th>
                </tr>
                </thead>

                <tbody>
                {props.results.map((result, index) => (
                    <tr key={result.dataset}>
                        <td>
                            <SelectQueryCheckBox id={result.dataset} item={createItem(result)} />
                        </td>
                        <td>{result.archive}</td>
                        <td>{result.dataset}</td>
                        <td><a href={result.query} target="_blank">{result.query}</a></td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Card>
        </Container>
    );
}