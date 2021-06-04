import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BasketContext } from "../../contexts/BasketContext";
import axios from "axios";
import { getShoppingIcon } from "../../utils/styling";

export default function LoadBasket(props) {
  const { api_host, isAuthenticated } = useContext(GlobalContext);
  const basketContext = useContext(BasketContext);

  function loadBasket(basketContext){

    const profileUrl = api_host + "accounts/user-profiles/";
    axios
      .get(profileUrl, {withCredentials: true})
      .then((response) => {
        console.log(response.data)
        const userProfileUrl = profileUrl + response.data.results[0].user_name + "/";

        axios
          .get(userProfileUrl, {withCredentials: true})
          .then((response) => {
            console.log("get", response);
            // load the shopping_cart into the basketContext
            basketContext.setDatasets(response.data.shopping_cart)
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // fake authentication when in 'development' mode.
  //let authenticated = isAuthenticated || (process.env.NODE_ENV === "development")
  let authenticated = isAuthenticated

  if(authenticated) {

    return (
        <Button
          type="button"
          variant="primary"
          onClick={() => loadBasket(basketContext)}
          {...props}>
            {getShoppingIcon("cart")} Load Basket</Button>
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
