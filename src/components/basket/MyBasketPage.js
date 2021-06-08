import React, { useEffect, useContext } from "react";
import { Button, Table, Container, Alert } from "react-bootstrap";
import { IDAContext } from "../../contexts/IDAContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BasketContext } from "../../contexts/BasketContext";
import SaveBasketButton from "./SaveBasketButton";
import { LoadBasketButton, loadBasket } from "./LoadBasket";
import AddToBasket from "./AddToBasketCheckBox";

export default function MyBasketPage() {
    const { api_host, isAuthenticated } = useContext(GlobalContext);
    const basketContext = useContext(BasketContext);

    useEffect(() => {
        loadBasket(basketContext,api_host, isAuthenticated)
    },[])


    let items = basketContext.datasets
    if (!items) {
        return (<LoadBasketButton />)
    }

    // parse the items and build a line to display
    let my_list = items.map((item, index) => {
        let id = `${index}`
        let item_data = item.item_data

        // currently item data is not stored as proper json, but as a stringified dict.
        // this converts all ' to "", so that it can be used by the JSON parser.
        let j = item_data.replaceAll("'",'"')
        let o = JSON.parse(j)
        let archive = o.archive

        return <tr>
            <td>
                <AddToBasket id={id}  item={item_data} />
            </td>
            <td>{archive}</td>
            <td>{item_data}</td>
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
