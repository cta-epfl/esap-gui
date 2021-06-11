import React, { useEffect, useContext } from "react";
import { Table, Container, Alert } from "react-bootstrap";
import { IDAContext } from "../../contexts/IDAContext";

import { BasketContext } from "../../contexts/BasketContext";
import SaveBasketButton from "./SaveBasketButton";
import AddToBasket from "./AddToBasketCheckBox";

export default function MyBasketPage() {

    const basketContext = useContext(BasketContext);

    let items = basketContext.datasets
    if (!items) {
        return null
    }

    // parse the items and build a line to display
    let my_list = items.map((item, index) => {
        let id = `${index}`

        // currently item data is not stored as proper json, but as a stringified dict.
        // this converts all ' to "", so that it can be used by the JSON parser.
        // let j = item_data.replaceAll("'",'"')

        //let o = JSON.parse(item)
        let archive = item.archive
        let item_as_string = JSON.stringify(item)

        return <tr>
            <td>
                <AddToBasket id={id} item={item} />
            </td>
            <td>{archive}</td>
            <td>{item_as_string}</td>
        </tr>
    })

    return (
        <>
        <Container fluid>
            <h2>Data Checkout</h2>
            <SaveBasketButton />

            <Table className="mt-3" responsive>
                <thead>

                <tr className="bg-light">
                    <th>Basket</th>
                    <th>Source</th>
                    <th>Item</th>

                </tr>

                </thead>
                <tbody>
                {my_list}
                </tbody>

            </Table>

        </Container>
        </>
    );
}
