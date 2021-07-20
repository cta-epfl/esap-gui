import React, { useContext, useState, useRef, useEffect } from "react";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import { GlobalContext } from "../contexts/GlobalContext";
import { getTokenIcon, getOKIcon, getCopyIcon } from "../utils/styling";

export default function ShowTokenButton(props) {
    const { accessToken, tokenExpiration, isAuthenticated } = useContext(GlobalContext);
    const [show, setShow] = useState(false);
    const [timer, setTimer] = useState(undefined)

    const textAreaRef2 = useRef(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    function copyToClipboard2(e) {

        textAreaRef2.current.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the the whole text area selected.
        e.target.focus();

        setShow(false)
    };
    function close(){
        setShow(false)
    }

    if (isAuthenticated)  {

        let renderAccessToken = <div>
            <Modal.Header closeButton>
                <Modal.Title>{getTokenIcon('black')}{' '}access_token expires at: {tokenExpiration}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control as="textarea" rows={9} ref={textAreaRef2} value={accessToken}>
                    {accessToken}
                </Form.Control>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={copyToClipboard2}>
                    {getCopyIcon()}{' '}Copy to Clipboard
                </Button>
            </Modal.Footer>
        </div>

        return (
            <>
            <Button
                type="button"
                variant="outline-primary"
                onClick={handleShow}
                {...props}>
                {getTokenIcon('white')}&nbsp;
            </Button>

            <Modal size="lg" show={show} onHide={handleClose}>
                {renderAccessToken}
            </Modal>
            </>
        )

    }
    else{
        return null
    }
}
