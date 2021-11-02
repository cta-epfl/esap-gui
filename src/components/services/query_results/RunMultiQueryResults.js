import React, { useContext, useState } from "react";
import {Container, Card, Table } from 'react-bootstrap'
import AddToBasket from "../../basket/AddToBasketCheckBox";
//import { QueryContext } from "../../../contexts/QueryContext";
//import HandlePreview from "../../query/HandlePreview";
//import Preview from "../../query/Preview";

function createItem(result){
    return {
        archive: "multi_query",
        record: result,
    };
}

export default function RunQueryResults(props) {
//    const { preview } = useContext(QueryContext);
    return (

        <Container fluid>
            <Card>
            <Table>
                <thead>
                <tr><td collspan="4">Query Results</td></tr>
                <tr className="bg-light">
                    <th>Select</th>
                    <th>Name</th>
                    <th>Collection</th>
                    <th>RA</th>
                    <th>dec</th>
                    <th>Link to data</th>
                </tr>
                </thead>

                <tbody>
                {props.results.map((result, index) => (
                    <>
                    <tr key={result.url}>
                        <td>
                            <AddToBasket id={result.url} item={createItem(result)} />
                        </td>
                        <td>{result.name}</td>
                        <td>{result.collection}</td>
                        <td>{result.ra}</td>
                        <td>{result.dec}</td>
                        <td>
                            <a
                                href={result.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                            >
                                {result.url}
                            </a>
                        </td>
                    </tr>
                      </>
                ))}
                </tbody>
            </Table>
            </Card>
        </Container>
    );
}