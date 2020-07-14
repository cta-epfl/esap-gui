import React, { useContext } from "react";
import { Table, Alert } from "react-bootstrap";
import { QueryContext } from "../../contexts/QueryContext";
import LoadingSpinner from "../LoadingSpinner";
import Paginate from "../Paginate";

export default function ApertifResults({ catalog }) {
  const { queryMap } = useContext(QueryContext);
  if (!queryMap) return null;
  if (queryMap.get(catalog).status === "fetched") {
    if (queryMap.get(catalog).results.query_results.length === 0)
      return <Alert variant="warning">No matching results found!</Alert>;
    console.log(
      "Query results:",
      queryMap.get(catalog).results.query_results["query_results"]
    );
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
              <th>Name</th>
              <th>RA</th>
              <th>Dec</th>
              <th>fov</th>
              <th>Dataset ID</th>
              <th>Data Product Type</th>
              <th>Data Product Subtype</th>
              <th>Link to data</th>
            </tr>
          </thead>
          <tbody>
            {queryMap.get(catalog).results.query_results.map((result) => {
              return (
                <tr key={result.PID}>
                  {/* <th>
                  <InputGroup>
                    <InputGroup.Checkbox />
                  </InputGroup>
                </th> */}
                  <td>{result.name}</td>
                  <td>{Number(result.RA).toFixed(1)}</td>
                  <td>{Number(result.dec).toFixed(1)}</td>
                  <td>{Number(result.fov).toFixed(1)}</td>
                  <td>{result.datasetID}</td>
                  <td>{result.dataProductType}</td>
                  <td>{result.dataProductSubType}</td>
                  <td>
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View data
                    </a>
                    {result.dataProductSubType === "continuumMF" ? (
                      <a
                        href={result.thumbnail}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-3"
                      >
                        Thumbnail
                      </a>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Paginate />
      </>
    );
  } else {
    return <LoadingSpinner />;
  }
}
