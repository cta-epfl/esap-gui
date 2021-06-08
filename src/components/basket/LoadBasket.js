import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BasketContext } from "../../contexts/BasketContext";
import axios from "axios";
import { getShoppingIcon } from "../../utils/styling";

export function loadBasket(basketContext, api_host, isAuthenticated){
    //alert('loadBasket: authenticated = '+isAuthenticated)
    if (!isAuthenticated) {
        return
    }

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
                    //alert('loaded basket:  '+response.data.shopping_cart.length)

                    // only update the datasets when there are changes,
                    // because the shoppingbasket button responds to these changes
                    let current_datasets = basketContext.datasets
                    if (current_datasets.length !== response.data.shopping_cart.length) {
                        //alert('loadBasket changes')
                        basketContext.setDatasets(response.data.shopping_cart)
                    }

                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
}

export function LoadBasketButton(props) {
  const { api_host, isAuthenticated } = useContext(GlobalContext);
  const basketContext = useContext(BasketContext);

  // fake authentication when in 'development' mode.
  //let authenticated = isAuthenticated || (process.env.NODE_ENV === "development")
  let authenticated = isAuthenticated

  if(authenticated) {

    return (
        <Button
          type="button"
          variant="primary"
          onClick={() => loadBasket(basketContext, api_host, authenticated)}
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
