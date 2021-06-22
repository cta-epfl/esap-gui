import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BasketContext } from "../../contexts/BasketContext";
import { getTrashIcon, getOKIcon } from "../../utils/styling";

export default function EmptyBasketButton(props) {
    const { api_host, isAuthenticated } = useContext(GlobalContext);
    const basketContext = useContext(BasketContext);
    const { setHasChanged } = useContext(BasketContext);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function emptyBasket(){
        basketContext.setDatasets([])
        setHasChanged(true)
        setShow(false)
    }


    if (isAuthenticated)  {
        if (basketContext.datasets!==[]) {
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
                    <Modal.Body>Are you sure you want to empty the shopping basket?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={emptyBasket}>
                            {getOKIcon()}{' '}OK
                        </Button>
                        <Button variant="warning" onClick={handleClose}>
                            Cancel
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
