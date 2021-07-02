import React, { useEffect, useContext } from "react";
import { Table, Container, Alert } from "react-bootstrap";

import { BasketContext } from "../../contexts/BasketContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import AddToBasket from "./AddToBasketCheckBox";
import APIButton from "./APIButton"
import EmptyBasketButton from "./EmptyBasketButton"

export default function MyBasketPage() {
    const { api_host, isAuthenticated } = useContext(GlobalContext);
    const basketContext = useContext(BasketContext);

    let items = basketContext.datasets
    if (!items) {
        return null
    }

    // parse the items and build a line to display
    let my_list = items.map((item, index) => {
        let id = `${index}`
        let archive = item.archive
        let item_as_string = JSON.stringify(item)

        return <tr>
            <td>
                <AddToBasket id={id} item={item} label=""/>
            </td>
            <td>{archive}</td>
            <td>{item_as_string}</td>
        </tr>
    })

    return (
        <>
        <Container fluid>
            &nbsp;
            <h3>Data Checkout &nbsp;&nbsp; <EmptyBasketButton/> <APIButton/></h3>

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
