import React, { useContext, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { GlobalContext } from "../../contexts/GlobalContext";
import { getAPIIcon } from "../../utils/styling";

export default function APIButton(props) {
    const { api_host, isAuthenticated } = useContext(GlobalContext);

    const profileUrl = api_host + "accounts/user-profiles/";

    if (isAuthenticated) {

        return <a href={profileUrl} target="_blank">
                <Button variant="outline-primary">{getAPIIcon()}&nbsp;API
                </Button>
        </a>

    } else {
        // do not show shopping basket when not authenticated
        return null
    }
}