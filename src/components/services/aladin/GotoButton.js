import React, { useContext } from "react";
import { Button } from 'react-bootstrap';
import { AladinAdvancedContext } from "../../../contexts/AladinAdvancedContext";

import { getMoveIcon } from '../../../utils/styling'

export default function GotoButton(props) {
    const { setSkyCoords, setSelectedDataItem, fetchedData, setShowItemList } = useContext(AladinAdvancedContext);

    const handleClick = () => {
        let radec = [props.ra,props.dec]
        setSkyCoords(radec)
        setShowItemList(false)
        setSelectedDataItem(props.pl_name)
    }


    return <Button variant="outline-danger" onClick={() => handleClick(props.pl_name, props.ra,props.dec)}>{getMoveIcon()}&nbsp;{props.pl_name}</Button>

}