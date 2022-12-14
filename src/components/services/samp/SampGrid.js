import React, {useState, useContext }  from 'react';
import { Table } from "react-bootstrap";
import { BasketContext } from "../../../contexts/BasketContext";
import AddToBasket from "../../basket/AddToBasketCheckBox";

function SAMPBasketItem(record){
    return {
        archive: "samp",
        record: record,
    };
}

export default function SampResults(props) {
    const basketContext = useContext(BasketContext);

    let fieldnames = props.fieldnames
    let data = props.votable_in_json['data']

    return (
        <>
        <Table className="mt-3" responsive>
            <thead>

            <tr className="bg-light">
                <th>Basket</th>
                {fieldnames.map((field) => {
                    return (
                        <th key={field}>{field}</th>
                    );
                })}

            </tr>

            </thead>
            <tbody>

                {data.map((record, index) => {

                    let id = `samp${index}`
                    if (index > 1000) {
                        return
                    }
                    return (
                        <tr key={record}>
                            <td>
                                <AddToBasket id={id} item={SAMPBasketItem(record)} />
                            </td>
                            {record.map((col) => {
                                let value = 'n/a'

                                try {
                                    value = col.toString()
                                } catch (e) {
                                }

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
