import React, { useContext } from "react";
import { Table, Alert } from "react-bootstrap";
import { QueryContext } from "../../contexts/QueryContext";
import LoadingSpinner from "../LoadingSpinner";
import Paginate from "../Paginate";

export default function ASTRONVOResults({ catalog }) {
  const { queryMap } = useContext(QueryContext);
  if (!queryMap) return null;
  if (queryMap.get(catalog).status === "fetched") {
    if (queryMap.get(catalog).results.query_results.length === 0)
      return <Alert variant="warning">No matching results found!</Alert>;
    console.log(queryMap.get(catalog).results.query_results);
    return (
      <>
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
              return (
                <tr key={result.result}>
                  {/* <th>
                  <InputGroup>
                    <InputGroup.Checkbox />
                  </InputGroup>
                </th> */}
                  <td>{result.obs_collection}</td>
                  <td>{Number(result.ra).toFixed(1)}</td>
                  <td>{Number(result.dec).toFixed(1)}</td>
                  <td>{Number(result.fov).toFixed(1)}</td>
                  <td>{result.dataproduct_type}</td>
                  <td>{result.calibration_level}</td>
                  <td>{Number((result.size / 1024).toFixed(1))} MB</td>
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
        {/* <Paginate /> */}
      </>
    );
  } else {
    return <LoadingSpinner />;
  }
}
