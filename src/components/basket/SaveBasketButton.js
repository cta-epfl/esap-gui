import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BasketContext } from "../../contexts/BasketContext";
import axios from "axios";
import { getShoppingIcon } from "../../utils/styling";


export function saveBasket(basketContext, api_host, isTokenValid, loginAgain, history){
    const payload = {shopping_cart: basketContext.datasets};
    console.log('saveBasket() '+payload)
    const profileUrl = api_host + "accounts/user-profiles/";

    // check if he token is still valid
    let token_is_valid = isTokenValid()
    console.log('token valid: '+token_is_valid)

    // if the token is not valid, then refresh it by logging in again
    if (token_is_valid < 0) {

        console.log('token no longer valid, retrying login...')
        loginAgain(history)
        //saveBasket(basketContext, api_host, isTokenValid, history)

        return
    }

    axios
        .get(profileUrl, {
            withCredentials: true,
        })
        .then((response) => {
            // build the userProfileUrl based on the user_name in the original id_token
            console.log(response.data)
            const userProfileUrl = profileUrl + response.data.results[0].user_name + "/";

            // send the payload to the userProfile
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

export default function SaveBasketButton(props) {
  const { api_host, isAuthenticated, isTokenValid, loginAgain } = useContext(GlobalContext);
  const basketContext = useContext(BasketContext);
  const { hasChanged, setHasChanged } = useContext(BasketContext);

  let history = useHistory()

  // only show the 'save basket' button when a user is logged in and something in the basket has changed
  if (isAuthenticated)  {
      if (hasChanged) {
          return (
              <Button
                  type="button"
                  variant="primary"
                  onClick={() => saveBasket(basketContext , api_host, isTokenValid, loginAgain, history)}
                  {...props}>
                  {getShoppingIcon("save_cart")} Save Basket</Button>
          )
      } else {
          return null
      }
  }
  else{
    return null

  }
}
