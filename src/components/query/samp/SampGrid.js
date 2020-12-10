import React from "react";
import { Table } from "react-bootstrap";

export default function SampResults(props) {

    //alert('SampGrid')
    let fieldnames = props.fieldnames
    let data = props.votable_in_json['data']

    return (
        <>
        <Table className="mt-3" responsive>
            <thead>

            <tr className="bg-light">
                {fieldnames.map((field) => {
                    return (
                        <th key={field}>{field}</th>
                    );
                })}

            </tr>

            </thead>
            <tbody>
                {data.map((record) => {
                    return (
                        <tr key={record}>
                            {record.map((col) => {
                                return (
                                    <td key={col}>{col}</td>
                                )
                            })}
                        </tr>
                    );
                })}
            </tbody>

        </Table>
        </>
    );

}
