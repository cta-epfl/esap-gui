import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import { QueryContext } from "../../contexts/QueryContext";
import LoadingSpinner from "../LoadingSpinner";

export default function ApertifResults({ catalog }) {
  const { queryMap } = useContext(QueryContext);
  if (!queryMap) return null;
  if (queryMap.get(catalog).status === "fetched") {
    console.log(
      "LAla:",
      queryMap.get(catalog).results.query_results["query_results"]
    );
    return (
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
            <th>Thumbnail</th>
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
                <td>{result.RA}</td>
                <td>{result.dec}</td>
                <td>{result.fov}</td>
                <td>{result.datasetID}</td>
                <td>{result.dataProductType}</td>
                <td>{result.dataProductSubType}</td>
                <td>
                  {result.dataProductSubType === "continuumMF" ? (
                    <a
                      href={result.thumbnail}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Image
                    </a>
                  ) : null}
                </td>
                <td>
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View data
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
