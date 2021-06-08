import React, { useEffect, useContext } from "react";
import { Button, Table, Container, Alert } from "react-bootstrap";
import { IDAContext } from "../../contexts/IDAContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BasketContext } from "../../contexts/BasketContext";
import SaveBasketButton from "./SaveBasketButton";
import { LoadBasketButton, loadBasket } from "./LoadBasket";

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
    let my_list = items.map((item) => {
        //alert(item.item_data)
        let item_data = item.item_data
        //let obj = JSON.parse(item_data)
        //let archive = obj.archive
        return <tr><td>{item.item_data.archive}</td><td>{item_data}</td></tr>
    })


    return (
        <>
        <Container fluid>
            <SaveBasketButton />

            <Table className="mt-3" responsive>
                <thead>

                <tr className="bg-light">
                    <th>Basket</th>
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
