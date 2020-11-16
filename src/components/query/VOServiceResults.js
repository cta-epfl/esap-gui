import React, { useContext } from "react";
import { Alert, Table, Button } from "react-bootstrap";
import { QueryContext } from "../../contexts/QueryContext";
import LoadingSpinner from "../LoadingSpinner";
import Paginate from "../Paginate";
import Preview from "./Preview";

export default function VORegistryResults({ catalog }) {
  const { queryMap, page, setPage, preview, setPreview, setURL, setDS9 } = useContext(QueryContext);

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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {queryMap.get(catalog).results.results.map((result) => {
              return (
                <>
                  <tr key={result.result}>
                    <td>
                      <a href={result.result} rel="noopener noreferrer" download>
                        {result.result}
                      </a>
                    </td>
                    <td>
                      {/* if results is in .fits format and is smaller than 10 MB,
                      display it with js9 */}
                      {((result.result.includes('fits')  || (result.result.includes('FITS'))) && 
                        Number(result.size) < 10000) ? 
                        (<Button 
                          onClick={() => {
                            preview ? setPreview("") : setPreview(result.result);
                            setURL(result.result);
                            //setDS9(true);
                          }}
                        >View fits with DS9</Button>) :
                        (result.thumbnail && (
                          <Button
                              onClick={()=>{
                                  preview ? setPreview("") : setPreview(result.result);
                                  setURL(result.thumbnail);
                              }}
                          >
                              View Thumbnail
                          </Button>
                      ))}
                    </td>
                  </tr>
                  {preview === result.result && 
                    <tr key={result.result}>
                      <td colSpan="2" ><Preview /></td>
                    </tr>}
                </>
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
