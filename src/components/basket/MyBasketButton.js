import React, { useContext, useEffect } from "react";
import { Button, Badge } from 'react-bootstrap';
import { GlobalContext } from "../../contexts/GlobalContext";
import { BasketContext } from "../../contexts/BasketContext";
import { getShoppingIcon } from "../../utils/styling";
import { loadBasket } from "./LoadBasket";


export default function MyBasketButton(props) {
    const { api_host, isAuthenticated } = useContext(GlobalContext);
    const basketContext = useContext(BasketContext);

    useEffect(() => {
        loadBasket(basketContext,api_host, isAuthenticated)
    },[isAuthenticated])

    if (isAuthenticated) {
        try {
            let nr_of_items = basketContext.datasets.length
            if (nr_of_items > 0) {
                return <Button>{getShoppingIcon("cart")}&nbsp;
                    <Badge variant="light">{nr_of_items}</Badge>
                </Button>
            } else {
                // do not show shopping basket when the basket is empty
                return null
            }

        } catch (e) {
            // do not show shopping basket when there is no basket at all
            return null
        }

    } else {
        // do not show shopping basket when not authenticated
        return null
    }
}