import React, { useContext } from "react";
import { Button, Table, Container, Alert } from "react-bootstrap";
import { IDAContext } from "../../contexts/IDAContext";
import { BasketContext } from "../../contexts/BasketContext";
import SaveBasket from "./SaveBasket";
import LoadBasket from "./LoadBasket";

export default function MyBasketPage() {
    const { datasets, setDatasets } = useContext(BasketContext);
    const basketContext = useContext(BasketContext);

    // when is the basket loaded from the REST API and stored into the context?
    let items
    try {
        items = basketContext.datasets
        alert(items)
    } catch (e) {
        return (<LoadBasket />)
    }

    // parse the items and build a line to display
    let my_list = items.map((item) => {
        return <tr><td>item.archive</td><td>item.record</td></tr>
    })


    return (
        <>
        <Container fluid>
            <LoadBasket />
            <SaveBasket />

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
