import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BasketContext } from "../../contexts/BasketContext";
import axios from "axios";
import { getShoppingIcon } from "../../utils/styling";

export default function SaveBasketButton(props) {
  const { api_host, isAuthenticated } = useContext(GlobalContext);
  const basketContext = useContext(BasketContext);
  const { hasChanged, setHasChanged } = useContext(BasketContext);

  function saveBasket(basketData){
    const payload = {shopping_cart: basketData};
    console.log(payload);

    const profileUrl = api_host + "accounts/user-profiles/";
    axios
      .get(profileUrl, {withCredentials: true})
      .then((response) => {
        console.log(response.data)
        const userProfileUrl = profileUrl + response.data.results[0].user_name + "/";

        axios
          .patch(userProfileUrl, payload, {withCredentials: true})
          .then((response) => {
            console.log("patch", response);
            basketContext.setHasChanged(false)
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

  if (authenticated)  {
      if (hasChanged) {
          return (
              <Button
                  type="button"
                  variant="primary"
                  onClick={() => saveBasket(basketContext.datasets)}
                  {...props}>
                  {getShoppingIcon("save_cart")} Save Basket</Button>
          )
      } else {
          return null
      }
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
