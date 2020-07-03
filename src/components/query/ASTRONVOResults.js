import React, { useContext } from "react";
import { Table, InputGroup } from "react-bootstrap";
import { QueryContext } from "../../contexts/QueryContext";
import LoadingSpinner from "../LoadingSpinner";

export default function ASTRONVOResults({ catalog }) {
  const { queryMap } = useContext(QueryContext);
  if (!queryMap) return null;
  if (queryMap.get(catalog).status === "fetched") {
    console.log(queryMap.get(catalog).results.query_results);
    return (
      <Table className="mt-3">
        <thead>
          <tr className="bg-light">
            <th>
              <InputGroup>
                <InputGroup.Checkbox />
              </InputGroup>
            </th>
            <th>Target</th>
            <th>RA</th>
            <th>Dec</th>
            <th>fov</th>
            <th>StartTime</th>
            <th>EndTime</th>
            <th>Link to data</th>
          </tr>
        </thead>
        <tbody>
          {queryMap.get(catalog).results.query_results.map((result) => {
            return (
              <tr key={result.runId}>
                <th>
                  <InputGroup>
                    <InputGroup.Checkbox />
                  </InputGroup>
                </th>
                <td>{result.target}</td>
                <td>{result.RA}</td>
                <td>{result.dec}</td>
                <td>{result.fov}</td>
                <td>{result.startTime}</td>
                <td>{result.endTime}</td>
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
