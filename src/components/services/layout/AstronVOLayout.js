import React, { useContext, useState, useEffect } from "react";

export function renderHeaderAstronVO() {

    return (<>
            <th>Collection</th>
            <th>RA</th>
            <th>Dec</th>
            <th>fov</th>
            <th>Data Product Type</th>
            <th>Calibration Level</th>
            <th>Size</th>
        </>
    );
}

export function renderRowAstronVO(result) {

    return (<>
        <td>{result.obs_collection}</td>
        <td>{Number(result.ra).toFixed(1)}</td>
        <td>{Number(result.dec).toFixed(1)}</td>
        <td>{Number(result.fov).toFixed(1)}</td>
        <td>{result.dataproduct_type}</td>
        <td>{result.calibration_level}</td>
        <td>{Number((result.size / 1024).toFixed(1))} MB</td>
        </>
    );
}
