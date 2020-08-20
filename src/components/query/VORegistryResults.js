import React, { useContext } from "react";
import { Table, Alert, InputGroup } from "react-bootstrap";
import { QueryContext } from "../../contexts/QueryContext";
import LoadingSpinner from "../LoadingSpinner";
import Paginate from "../Paginate";

export default function VORegistryResults({ catalog }) {
  const { queryMap } = useContext(QueryContext);
  if (!queryMap) return null;
  console.log("VOReg queryMap:", queryMap.get(catalog));
  if (queryMap.get(catalog).status === "fetched") {
    if (queryMap.get(catalog).results.results.length === 0)
      return <Alert variant="warning">No matching results found!</Alert>;
    console.log("VO Registry results:", queryMap.get(catalog).results.results);
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
              <th>Access URL</th>
              <th>Waveband</th>
              <th>Title</th>
              <th>Service Type</th>
              <th>Content Types</th>
            </tr>
          </thead>
          <tbody>
            {queryMap.get(catalog).results.results.map((result) => {
              return (
                <tr key={result.PID}>
                  <th>
                    <InputGroup>
                      <InputGroup.Checkbox />
                    </InputGroup>
                  </th>
                  <td>{result.short_name}</td>
                  <td>{result.access_url}</td>
                  <td>{result.waveband}</td>
                  <td>{result.title}</td>
                  <td>{result.service_type}</td>
                  <td>{result.content_types}</td>
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
