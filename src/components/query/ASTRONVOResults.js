import React, { useContext } from "react";
import { Table, Alert } from "react-bootstrap";
import { QueryContext } from "../../contexts/QueryContext";
import LoadingSpinner from "../LoadingSpinner";
import Paginate from "../Paginate";
import HandlePreview from "./HandlePreview";
import Preview from "./Preview";

export default function ASTRONVOResults({ catalog }) {
  const { queryMap, page, setPage, preview } = useContext(QueryContext);
  if (!queryMap) return null;
  if (queryMap.get(catalog).status === "fetched") {
    if (!("results" in queryMap.get(catalog).results))
      return <Alert variant="warning">{queryMap.get(catalog).results}</Alert>;
    if (queryMap.get(catalog).results.results.length === 0)
      return <Alert variant="warning">No matching results found!</Alert>;

    const numPages = queryMap.get(catalog).results.pages;
    console.log(queryMap.get(catalog).results.results);
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
              <th>Collection</th>
              <th>RA</th>
              <th>Dec</th>
              <th>fov</th>
              <th>Data Product Type</th>
              <th>Calibration Level</th>
              <th>Size</th>
              <th>Link to data</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {queryMap.get(catalog).results.results.map((result) => {
              return (
                <>
                  <tr key={result.url}>
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
                        Download data
                      </a>
                    </td>
                    <td>
                      <HandlePreview result={result} />
                    </td>
                  </tr>
                  {preview === result.url && <tr key={result.url}><Preview /></tr>}
                </>
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
