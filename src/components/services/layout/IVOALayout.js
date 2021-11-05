import React, { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Preview from "../../query/Preview";

export function renderHeaderIVOA(queryMap, catalog, indice) {

    return (<>
        {queryMap.get(catalog).vo_table_schema.fields.map((field, index) => {
                indice.push(index);
                return (<th>{field.name}</th>);
        })}
        </>
    );
}

export function renderRowIVOA(queryResult, queryMap, catalog, indice, setPreview, setURL) {

    return (<>
        {queryResult.map((field, index) => {

            if (indice.includes(index)) {
                if (queryMap.get(catalog).vo_table_schema.fields[index].name === "access_url") {
                    return (<td><a href={field} rel="noopener noreferrer" download>Download data</a></td>);
                }
                if (queryMap.get(catalog).vo_table_schema.fields[index].name === "preview") {
                    return (<td>
                        {
                            <Button
                                onClick={()=>{
                                    setPreview(field);
                                    setURL(field);
                                }}
                            >
                                View Thumbnail
                            </Button>
                        }
                    </td> );
                }
                if ((queryMap.get(catalog).vo_table_schema.fields[index].name === "s_ra") ||
                    (queryMap.get(catalog).vo_table_schema.fields[index].name === "s_dec") ||
                    (queryMap.get(catalog).vo_table_schema.fields[index].name === "s_fov")
                ) {
                    return (<td>{Number(field).toFixed(1)}</td>)
                }
                return (<td>{field}</td>) ;
            }
            return null;
        })}
        </>
    );
}
