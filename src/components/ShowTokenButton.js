import React, { useContext, useState, useRef } from "react";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import { GlobalContext } from "../contexts/GlobalContext";
import { getTokenIcon, getOKIcon, getCopyIcon } from "../utils/styling";

export default function ShowTokenButton(props) {
    const { api_host, token, isAuthenticated } = useContext(GlobalContext);
    const [show, setShow] = useState(false);

    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the the whole text area selected.
        e.target.focus();
        setCopySuccess('Copied!');

        setShow(false)
    };

    function close(){
        setShow(false)
    }

    if (isAuthenticated)  {

        return (
            <>
            <Button
                type="button"
                variant="outline-primary"
                onClick={handleShow}
                {...props}>
                {getTokenIcon('white')}
            </Button>

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{getTokenIcon('black')}{' '}oidc_id_token</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control as="textarea" rows={12} ref={textAreaRef} value={token}>
                    {token}
                    </Form.Control>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={copyToClipboard}>
                        {getCopyIcon()}{' '}Copy to Clipboard
                    </Button>

                </Modal.Footer>
            </Modal>
            </>
        )

    }
    else{
        return null
    }
}
