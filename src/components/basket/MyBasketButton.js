import React, { useContext } from "react";
import { Button } from 'react-bootstrap';
import { GlobalContext } from "../../contexts/GlobalContext";
import { BasketContext } from "../../contexts/BasketContext";
import { getShoppingIcon } from "../../utils/styling";

export default function MyBasketButton(props) {
    const { api_host, isAuthenticated } = useContext(GlobalContext);
    const basketContext = useContext(BasketContext);

    if (isAuthenticated) {
        return <Button> {getShoppingIcon("cart")} </Button>
    } else {
        return null
    }
}