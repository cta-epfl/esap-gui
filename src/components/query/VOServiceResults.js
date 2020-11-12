import React, { useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Alert, Table, Button } from "react-bootstrap";
import { QueryContext } from "../../contexts/QueryContext";
import LoadingSpinner from "../LoadingSpinner";
import Paginate from "../Paginate";

export default function VORegistryResults({ catalog }) {
  const { queryMap, page, setPage, setFits } = useContext(QueryContext);
  const history = useHistory();

  if (!queryMap.get(catalog)) return null;
  console.log("VO service queryMap:", queryMap.get(catalog));

  if (queryMap.get(catalog).status === "fetched") {
    // if (queryMap.get(catalog).results[0].includes("ERROR"))
    //   return (
    //     <Alert variant="warning">{queryMap.get(catalog).results[0]}</Alert>
    //   );
    if (queryMap.get(catalog).results.results.length === 0)
      return <Alert variant="warning">No matching results found!</Alert>;

    const numPages = queryMap.get(catalog).results.pages;

    return (
      <div>
        <h1>Results from {catalog}</h1>
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
              <th>Link to data</th>
            </tr>
          </thead>
          <tbody>
            {queryMap.get(catalog).results.results.map((result) => {
              return (
                <tr key={result.result}>
                  <td>
                    <a href={result.result} rel="noopener noreferrer" download>
                      {result.result}
                    </a>
                  </td>
                  <td>
                    {/* if results is in .fits format
                      display it with js9 */}
                    {(result.result.endsWith('.fits')) && 
                      <Button 
                        value={result.result} 
                        onClick={(event) => {
                          setFits(event.target.value);
                          history.push('/fitsviewer');
                        }}
                      >View fits</Button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  } else {
    return <LoadingSpinner />;
  }
  return null;
}
