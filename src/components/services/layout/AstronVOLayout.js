import React, { useContext, useState, useEffect } from "react";

export function renderHeaderAstronVO() {

    return (<>
        <th style={{width: '10%'}}>Collection</th>
        <th style={{width: '5%'}}>RA</th>
        <th style={{width: '5%'}}>Dec</th>
        <th style={{width: '5%'}}>fov</th>
            <th style={{width: '10%'}}>DataProduct Type</th>
            <th style={{width: '10%'}}>Calibration Level</th>
            <th style={{width: '5%'}}>Size</th>
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
