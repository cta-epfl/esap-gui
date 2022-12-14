import React, { useContext } from 'react';
import { Image } from 'react-bootstrap';
import { QueryContext } from '../../contexts/QueryContext';

export default function Preview() {
    const { preview, ds9, url } = useContext(QueryContext);
    return (
        <>
        {console.log("preview: ", preview)}
        {console.log("url: ", url)}
        {(preview &&
            (ds9 ? 
            <iframe 
                title="DS9"
                className="embed-responsive-item"
                height="700"
                width="700"
                src={"https://js9.si.edu/js9/js9.html?url="+JSON.parse(JSON.stringify(url))+"&colormap=viridis&scale=log"}
                allowFullScreen
            ></iframe>
            :
            <Image 
                width={700}
                className={"mt-3"}
                src={url}
                alt=""
            />)
        )}
        </>
    )
}

