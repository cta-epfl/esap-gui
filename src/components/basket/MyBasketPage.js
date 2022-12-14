import React, { useState, useEffect, useContext } from "react";
import { Table, Container, Alert } from "react-bootstrap";

import { BasketContext } from "../../contexts/BasketContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import { QueryContext } from "../../contexts/QueryContext";

import AddToBasket from "./AddToBasketCheckBox";
import APIButton from "./APIButton"
import EmptyBasketButton from "./EmptyBasketButton"
import { renderRowApertif, renderHeaderApertif }  from "../services/layout/ApertifResultsLayout"
import { renderRowAstronVO, renderHeaderAstronVO }  from "../services/layout/AstronVOLayout"
import { renderRowIVOA, renderHeaderIVOA }  from "../services/layout/IVOALayout"

function renderRow(item) {
    switch(item.archive) {

        case 'apertif':

            return <div>
                <Table className="mt-3" size="sm" responsive>
                    <thead>
                    <tr className="bg-light">
                        {renderHeaderApertif()}
                    </tr>
                    </thead>
                    <tbody>
                        {renderRowApertif((item.record))}
                    </tbody>
                </Table>
            </div>

        case 'astron_vo':

            return <div>
                <Table className="mt-3" size="sm" responsive>
                    <thead>
                    <tr className="bg-light">
                        {renderHeaderAstronVO()}
                    </tr>
                    </thead>
                    <tbody>
                        {renderRowAstronVO((item.record))}
                    </tbody>
                </Table>
            </div>

        case 'TODO_vo_reg':

            return <div>
                <Table className="mt-3" size="sm" responsive>
                    <thead>
                    <tr className="bg-light">
                        {renderHeaderIVOA()}
                    </tr>
                    </thead>
                    <tbody>
                        {renderRowIVOA((item.record))}
                    </tbody>
                </Table>
            </div>

        default:
            return JSON.stringify(item)
    }
}

function renderBasketPage(items) {

    if (!items) {
        return null
    }

    // parse the items and build a line to display
    let my_list = items.map((item, index) => {
        let id = `${index}`
        let archive = item.archive

        return <><tr>
            <td>
                <AddToBasket id={id} item={item} label=""/>
            </td>
            <td>{archive}</td>
            <td>{renderRow(item)}</td>
        </tr></>
    })

    return (
        <>
        <Container fluid>
            &nbsp;
            <h3>Data Shopping Basket &nbsp;&nbsp; <EmptyBasketButton/> <APIButton/></h3>

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

export default function MyBasketPage() {
    const { api_host, isAuthenticated } = useContext(GlobalContext);
    const basketContext = useContext(BasketContext);
    const { refresh } = useContext(BasketContext);
    const { preview } = useContext(QueryContext);

    // work on a local copy of datasets, to be able (un)(re)select items before saving
    const [items, setItems] = useState(basketContext.datasets);

    useEffect(() => {
        //alert('refresh')
        setItems(basketContext.datasets)
    },[refresh])

    return renderBasketPage(items)
}
