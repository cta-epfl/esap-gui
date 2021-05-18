import React, { useContext } from "react";
import * as deepEqual from "deep-equal";
import { Form } from "react-bootstrap";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BasketContext } from "../../contexts/BasketContext";

export default function AddtoBasket(props) {
  const { isAuthenticated } = useContext(GlobalContext);
  const basketContext = useContext(BasketContext);

  function isInBasket(testBasketItem) {
    const found = basketContext.datasets.some(basketItem => deepEqual(basketItem, testBasketItem));
    return found;
  }

  function addToBasket(addToBasketItem) {
    basketContext.add(addToBasketItem);
    console.log([addToBasketItem, basketContext]);
  }

  function removeFromBasket(removeFromBasketItem) {
    basketContext.remove(removeFromBasketItem);
    console.log([removeFromBasketItem, basketContext]);
  }

  // fake authentication when in 'development' mode.
  let authenticated = isAuthenticated || (process.env.NODE_ENV === "development")

  if (authenticated){
    return (
      <Form.Check id={props.id} type="checkbox" onChange={(event) => {
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
