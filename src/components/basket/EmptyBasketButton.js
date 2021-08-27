import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BasketContext } from "../../contexts/BasketContext";
import { getTrashIcon, getOKIcon } from "../../utils/styling";
import { saveBasket } from "./SaveBasketButton"

export default function EmptyBasketButton(props) {
    const { api_host, isAuthenticated, isTokenValid, loginAgain } = useContext(GlobalContext);
    const basketContext = useContext(BasketContext);
    const { setHasChanged, refresh, setRefresh } = useContext(BasketContext);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let history = useHistory()

    function emptyBasket(basketContext , api_host, isTokenValid, loginAgain, history){
        basketContext.clear()
        setHasChanged(true)
        setShow(false)
        setRefresh(!refresh)
    }


    if (isAuthenticated)  {
        //alert(basketContext.datasets)
        if (basketContext.datasets.length>0) {
            return (
                <>
                <Button
                    type="button"
                    variant="primary"
                    onClick={handleShow}
                    {...props}>
                    {getTrashIcon('white')} Empty Basket
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{getTrashIcon('black')}{' '}Empty Basket</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><h5>Are you sure you want to empty the basket?</h5>
                        <i>(don't forget to click 'Save Basket' afterward)</i>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success"
                                onClick={() => emptyBasket(basketContext, api_host, isTokenValid, loginAgain, history)}
                        >
                            {getOKIcon()}{' '}OK
                        </Button>

                    </Modal.Footer>
                </Modal>
                </>
            )

        } else {
            return null
        }
    }
    else{
        return null
    }
}
