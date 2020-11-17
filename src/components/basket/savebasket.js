import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BasketContext } from "../../contexts/BasketContext";
import axios from "axios";


export default function SaveBasket(props) {
  const { api_host, isAuthenticated } = useContext(GlobalContext);
  const basketContext = useContext(BasketContext);

  function saveBasket(basketData){
    const payload = {shopping_cart: basketData};
    console.log(payload);

    const profileUrl = api_host + "accounts/user-profiles/";
    axios
      .get(profileUrl, {withCredentials: true})
      .then((response) => {
        const userProfileUrl = profileUrl + response.data.results[0].user_name + "/";

        axios
          .patch(userProfileUrl, payload, {withCredentials: true})
          .then((response) => {
            console.log("patch", response);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }


  if(isAuthenticated){
    return (
        <Button
          type="button"
          variant="primary"
          onClick={() => saveBasket(basketContext.datasets)}
          {...props}
        >Save Data Selection</Button>
    );
  }
  else{
    return (<>
      <Button variant="warning" disabled {...props}>
        Log In to Enable Data Selection
      </Button>
    </>
    );
  }
}
