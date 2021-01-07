import React from "react";
import { Table } from "react-bootstrap";

export default function SampResults(props) {

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
                                let value = col.toString()

                                if (value.includes('http')) {
                                    value = <a href={value} target="_blank" rel="noopener noreferrer">{value}</a>
                                }
                                return (
                                    <td key={value}>{value}</td>
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
