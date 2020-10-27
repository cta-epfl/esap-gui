import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BasketContext } from "../../contexts/BasketContext";
import axios from "axios";


export default function SaveBasket({ add }) {
  const [info, setInfo] = useState("");
  const { api_host } = useContext(GlobalContext);
  const basketContext = useContext(BasketContext);

  function saveBasket(basketData){

    const payload = {shopping_cart: basketData};
    console.log(payload);
    // basketData.map((basketDatum) => {
    //   const url = api_host + "accounts/user_profiles/hughdickinson";
    //   axios
    //     .patch(url, {item_data: basketData})
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // });
    const profileUrl = api_host + "accounts/user-profiles/hughdickinson/";
    console.log(profileUrl);
    axios
      .patch(profileUrl, payload)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    // input field is only here for testing
    // this will be replaced by real dataset later.
      <Button
        type="button"
        variant="primary"
        onClick={() => saveBasket(basketContext.datasets)}
      >Save Basket Contents</Button>
  );
}
