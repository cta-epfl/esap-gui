import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faShoppingCart,
    faCartArrowDown,
    faCartPlus,
    faImage,
    faRunning,
    faTrashAlt,
    faCheck,
    faCog,
    faSearchPlus }
    from '@fortawesome/free-solid-svg-icons'


export const getShoppingIcon = (type) => {
    let icon = undefined
    let color = "darkgreen"
    let size = 'md'

    if (type === 'cart') {
        icon = faShoppingCart
        size = "md"
        color = "white"
    }

    if (type === 'cart_dark_large') {
        icon = faShoppingCart
        size = "md"
        color = "blue"
    }

    if (type === 'must_save_cart') {
        icon = faShoppingCart
        size = "md"
        color = "red"
    }

    if (type === 'save_cart') {
        icon = faCartArrowDown
        size = "md"
        color = "white"
    }

    if (type === 'plus_cart') {
        icon = faCartPlus
        size = "md"
        color = "white"
    }

    return <FontAwesomeIcon size={size} icon={icon} color={color}/>
}

export const getThumbnailIcon = () => {
    let icon = faImage
    let color = "white"
    let size = 'md'

    return <FontAwesomeIcon size={size} icon={icon} color={color}/>
}

export const getQueryIcon = () => {
    let icon = faSearchPlus
    let color = "white"
    let size = 'md'

    return <FontAwesomeIcon size={size} icon={icon} color={color}/>
}

export const getTrashIcon = (color) => {
    let icon = faTrashAlt
    //let color = "white"
    let size = 'md'

    return <FontAwesomeIcon size={size} icon={icon} color={color}/>
}

export const getAPIIcon = () => {
    let icon = faCog
    let color = "black"
    let size = 'md'

    return <FontAwesomeIcon size={size} icon={icon} color={color}/>
}

export const getOKIcon = () => {
    let icon = faCheck
    let color = "white"
    let size = 'md'

    return <FontAwesomeIcon size={size} icon={icon} color={color}/>
}