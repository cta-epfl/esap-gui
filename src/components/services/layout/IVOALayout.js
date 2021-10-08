import React, { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Preview from "../../query/Preview";

export function renderHeaderIVOA(queryMap, catalog, indice) {

    return (<>
        {queryMap.get(catalog).vo_table_schema.fields.map((field, index) => {
            if ((field.name === "dataproduct_type") || (field.name === "dataproduct_subtype") ||
                (field.name === "calib_level") || (field.name === "obs_collection") ||
                (field.name === "obs_id") ||
                (field.name === "calib_level") || (field.name === "access_url") ||
                (field.name === "access_estsize") || (field.name === "target_name") ||
                (field.name === "s_ra") || (field.name === "s_dec") ||
                (field.name === "s_fov") ||
                (field.name === "instrument_name") || (field.name === "preview")
            ) {
                indice.push(index);
                return (<th>{field.name}</th>);
            }
            return null;
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
