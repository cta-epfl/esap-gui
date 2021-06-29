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
    faSearchPlus,
    faKey,
    faCopy}
    from '@fortawesome/free-solid-svg-icons'


export const getShoppingIcon = (type) => {
    let icon = undefined
    let color = "darkgreen"
    let size = 'sm'

    if (type === 'cart') {
        icon = faShoppingCart
        size = "sm"
        color = "white"
    }

    if (type === 'cart_dark_large') {
        icon = faShoppingCart
        size = "sm"
        color = "blue"
    }

    if (type === 'must_save_cart') {
        icon = faShoppingCart
        size = "sm"
        color = "red"
    }

    if (type === 'save_cart') {
        icon = faCartArrowDown
        size = "sm"
        color = "white"
    }

    if (type === 'plus_cart') {
        icon = faCartPlus
        size = "sm"
        color = "white"
    }

    return <FontAwesomeIcon size={size} icon={icon} color={color}/>
}

export const getThumbnailIcon = () => {
    let icon = faImage
    let color = "white"
    let size = 'sm'

    return <FontAwesomeIcon size={size} icon={icon} color={color}/>
}

export const getQueryIcon = () => {
    let icon = faSearchPlus
    let color = "white"
    let size = 'sm'

    return <FontAwesomeIcon size={size} icon={icon} color={color}/>
}

export const getTrashIcon = (color) => {
    let icon = faTrashAlt
    //let color = "white"
    let size = 'sm'

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

export const getTokenIcon = (color) => {
    let icon = faKey
    let size = 'md'

    return <FontAwesomeIcon size={size} icon={icon} color={color}/>
}

export const getCopyIcon = () => {
    let icon = faCopy
    let color = "white"
    let size = 'md'

    return <FontAwesomeIcon size={size} icon={icon} color={color}/>
}