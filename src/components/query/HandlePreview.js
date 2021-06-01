import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { QueryContext } from '../../contexts/QueryContext';
import { getThumbnailIcon } from "../../utils/styling";

export default function HandlePreview({ result }) {
    const { preview, setPreview, setDS9, setURL } = useContext(QueryContext);
    return (
        <>
            {/* if results is in .fits format and is smaller than 10 MB,
            display it with js9 */}
            {((result.url.includes('fits')  || (result.url.includes('FITS'))) && 
                Number(result.size) < 10000) ? 
                (<Button 
                    onClick={() => {
                        preview ? setPreview("") : setPreview(result.url);
                        setURL(result.url);
                        setDS9(true);
                    }}
                >View fits with DS9</Button>) :
                (result.thumbnail && (
                    <Button
                        onClick={()=>{
                            setPreview(result.url);
                            setURL(result.thumbnail);
                        }}
                    >
                        {getThumbnailIcon()}  View Thumbnail
                    </Button>
                ))
            }
        </>
    )
}

