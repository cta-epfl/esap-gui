import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import { QueryContext } from "../../contexts/QueryContext";
import LoadingSpinner from "../LoadingSpinner";

export default function ASTRONVOResults({ catalog }) {
  const { queryMap } = useContext(QueryContext);
  if (!queryMap) return null;
  if (queryMap.get(catalog).status === "fetched") {
    console.log(queryMap.get(catalog).results.query_results);
    return (
      <Table className="mt-3" responsive>
        <thead>
          <tr className="bg-light">
            {/* <th>
              <InputGroup>
                <InputGroup.Checkbox />
              </InputGroup>
            </th> */}
            <th>Collection</th>
            <th>RA</th>
            <th>Dec</th>
            <th>fov</th>
            <th>Data Product Type</th>
            <th>Calibration Level</th>
            <th>Size</th>
            <th>Link to data</th>
          </tr>
        </thead>
        <tbody>
          {queryMap.get(catalog).results.query_results.map((result) => {
            let size = Number((result.size / 1024).toFixed(1));
            return (
              <tr key={result.result}>
                {/* <th>
                  <InputGroup>
                    <InputGroup.Checkbox />
                  </InputGroup>
                </th> */}
                <td>{result.obs_collection}</td>
                <td>{result.ra}</td>
                <td>{result.dec}</td>
                <td>{result.fov}</td>
                <td>{result.dataproduct_type}</td>
                <td>{result.calibration_level}</td>
                <td>{size} MB</td>
                <td>
                  <a href={result.url} rel="noopener noreferrer" download>
                    Download
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  } else {
    return <LoadingSpinner />;
  }
}
