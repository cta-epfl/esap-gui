import React, { useContext, useEffect } from "react";
import * as deepEqual from "deep-equal";
import { Form } from "react-bootstrap";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BasketContext } from "../../contexts/BasketContext";
import { getTrashIcon } from "../../utils/styling";

export default function AddToBasket(props) {
  const { api_host, isAuthenticated } = useContext(GlobalContext);
  const basketContext = useContext(BasketContext);

  function isInBasket(testBasketItem) {
    const found = basketContext.datasets.some(basketItem => deepEqual(basketItem, testBasketItem));
    console.log('found = '+found+' testBasketItem = '+testBasketItem)
    return found;
  }

  function addToBasket(addToBasketItem) {
    basketContext.add(addToBasketItem);
    console.log('addToBasket: '+[addToBasketItem, basketContext]);
  }

  function removeFromBasket(removeFromBasketItem) {
    basketContext.remove(removeFromBasketItem);
    console.log('removeFromBasket: '+[removeFromBasketItem, basketContext]);
  }

  // fake authentication when in 'development' mode.
  // let authenticated = isAuthenticated || (process.env.NODE_ENV === "development")
  let authenticated = isAuthenticated

  if (authenticated){
      //let datasets_in_basket = basketContext.datasets
      //console.log('datasets_in_basket: '+datasets_in_basket)
    return (

      <Form.Check id={props.id} type="checkbox" label={props.label} onChange={(event) => {
        const action = event.target.checked ? addToBasket : removeFromBasket;
        action(props.item);
      }} checked={isInBasket(props.item) ? "checked" : ""} />
    );
  }
  else{
    return (
      <Form.Check id={props.id} type="checkbox" disabled />
    );
  }
}
