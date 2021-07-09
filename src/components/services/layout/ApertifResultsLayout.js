import React, { useContext, useState, useEffect } from "react";

export function renderHeaderApertif() {

    return (<>
            <th>Name</th>
            <th>RA</th>
            <th>Dec</th>
            <th>fov</th>
            <th>Dataset ID</th>
            <th>DataProduct Type</th>
            <th>DataProduct SubType</th>
        </>
    );
}

export function renderRowApertif(result) {

    return (<>
            <td>{result.name}</td>
            <td>{Number(result.RA).toFixed(1)}</td>
            <td>{Number(result.dec).toFixed(1)}</td>
            <td>{Number(result.fov).toFixed(1)}</td>
            <td>{result.datasetID}</td>
            <td>{result.dataProductType}</td>
            <td>{result.dataProductSubType}</td>
        </>
    );
}
