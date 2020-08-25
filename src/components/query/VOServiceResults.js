import React, { useContext } from "react";
import { Alert, Table } from "react-bootstrap";
import { QueryContext } from "../../contexts/QueryContext";

export default function VORegistryResults({ catalog }) {
  const { queryMap } = useContext(QueryContext);

  if (!queryMap.get(catalog)) return null;
  console.log("VO service queryMap:", queryMap.get(catalog));
  if (queryMap.get(catalog).status === "fetched") {
    if (queryMap.get(catalog).results.length === 0)
      return <Alert variant="warning">No matching results found!</Alert>;
    return (
      <div>
        <h1>Results from {catalog}</h1>
        <Table className="mt-3" responsive>
          <thead>
            <tr className="bg-light">
              <th>Link to data</th>
            </tr>
          </thead>
          <tbody>
            {queryMap.get(catalog).results.query_results.map((result) => {
              return (
                <tr key={result.result}>
                  <td>
                    <a href={result.result} rel="noopener noreferrer" download>
                      {result.result}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
  return null;
}
