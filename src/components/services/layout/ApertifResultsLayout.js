import React, { useContext, useState, useEffect } from "react";

export function renderHeaderApertif() {

    return (<>
            <th style={{width: '10%'}}>Name</th>
            <th style={{width: '5%'}}>RA</th>
            <th style={{width: '5%'}}>Dec</th>
            <th style={{width: '5%'}}>fov</th>
            <th style={{width: '10%'}}>DataProduct Type</th>
            <th style={{width: '10%'}}>DataProduct SubType</th>
            <th style={{width: '5%'}}>Dataset ID</th>
        </>
    );
}

export function renderRowApertif(result) {

    return (<>
            <td>{result.name}</td>
            <td>{Number(result.ra).toFixed(1)}</td>
            <td>{Number(result.dec).toFixed(1)}</td>
            <td>{Number(result.fov).toFixed(1)}</td>
            <td>{result.dataProductType}</td>
            <td>{result.dataProductSubType}</td>
            <td>{result.datasetID}</td>
        </>
    );
}
