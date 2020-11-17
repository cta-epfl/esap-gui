import React, { useContext } from "react";
import { Table, Alert } from "react-bootstrap";
import { QueryContext } from "../../contexts/QueryContext";
import LoadingSpinner from "../LoadingSpinner";
import Paginate from "../Paginate";
import HandlePreview from "./HandlePreview";
import Preview from "./Preview";

export default function ApertifResults({ catalog }) {
  const { queryMap, page, setPage, preview } = useContext(QueryContext);
  if (!queryMap) return null;
  if (queryMap.get(catalog).status === "fetched") {
    if (!("results" in queryMap.get(catalog).results))
      return <Alert variant="warning">{queryMap.get(catalog).results}</Alert>;
    if (queryMap.get(catalog).results.results.length === 0)
      return <Alert variant="warning">No matching results found!</Alert>;

    const numPages = queryMap.get(catalog).results.pages;
    console.log("Query results:", queryMap.get(catalog).results.results);
    return (
      <>
        <Paginate
          getNewPage={(args) => {
            return args.target ? setPage(parseFloat(args.target.text)) : null;
          }}
          currentPage={page}
          numAdjacent={3}
          numPages={numPages}
        />
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {queryMap.get(catalog).results.results.map((result) => {
              return (
                <>
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
                      download
                    >
                      Download data
                    </a>
                  </td>
                  <td>
                      <HandlePreview result={result} />
                  </td>
                </tr>
                {preview === result.url && 
                    <tr key={result.url}>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td colSpan="4" ><Preview /></td>
                      <td></td>
                    </tr>}
                </>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  } else {
    return <LoadingSpinner />;
  }
}
