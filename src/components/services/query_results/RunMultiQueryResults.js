import React, { useContext, useState } from "react";
import {Container, Card, Table } from 'react-bootstrap'
import AddToBasket from "../../basket/AddToBasketCheckBox";

function createItem(result){
    return {
        archive: "multi_query",
        record: result,
    };
}

export default function RunQueryResults(props) {
    return (
        <Container fluid>
            <Card>
            <Table>
                <thead>
                <h3>Query Results</h3>
                <tr className="bg-light">
                    <th>Select</th>
                    <th>url</th>
                </tr>
                </thead>

                <tbody>
                {props.results.map((result, index) => (
                    <tr key={result.url}>
                        <td>
                            <AddToBasket id={result.url} item={createItem(result)} />
                        </td>
                        <td><a href={result.url} target="_blank">{result.url}</a></td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </Card>
        </Container>
    );
}