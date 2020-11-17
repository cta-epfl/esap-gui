import React, { useContext } from "react";
import { Alert, Table, Button } from "react-bootstrap";
import axios from "axios";  
import { GlobalContext } from "../../contexts/GlobalContext";
import { QueryContext } from "../../contexts/QueryContext";
import LoadingSpinner from "../LoadingSpinner";
import Paginate from "../Paginate";
import Preview from "./Preview";

export default function VORegistryResults({ catalog }) {
  const { queryMap, page, setPage, preview, setPreview, setURL, setDS9 } = useContext(QueryContext);
  const { api_host } = useContext(GlobalContext);

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
              {queryMap.get(catalog).vo_table_schema.fields.map((field) => {
                return (
                  <th>{field.name}</th>             
              );
              })}
            </tr>
          </thead>
          <tbody>
            {queryMap.get(catalog).results.results.map((result) => {

              let queryResult = result.result.split(",");
              console.log(queryResult);
              return (
                <>
                  <tr key={queryResult[queryMap.get(catalog).vo_table_schema.fields.findIndex((item) => item.name === "access_url")]}>
                    {queryResult.map((field, index) => {
                      if (queryMap.get(catalog).vo_table_schema.fields[index].name === "access_url") {
                        return (<td><a href={field} rel="noopener noreferrer" download>Download data</a></td>);
                      }
                      if (queryMap.get(catalog).vo_table_schema.fields[index].name === "obs_publisher_did") {
                        return (<td><a href={field} rel="noopener noreferrer">Obs Publisher DID</a></td>);
                      }
                      if (queryMap.get(catalog).vo_table_schema.fields[index].name === "preview") {
                        return (<td>
                          {
                            <Button
                                onClick={()=>{
                                    setPreview(field);
                                    setURL(field);
                                }}
                            >
                                View Thumbnail
                            </Button>
                          }
                        </td> );
                      }
                      return (<td>{field}</td>) ;
                    })}
                  </tr>
                  { 
                    preview === queryResult[queryMap.get(catalog).vo_table_schema.fields.findIndex((item) => item.name === "preview")] && 
                      <tr key={queryResult.preview}>
                        <td colSpan={queryResult.length} ><Preview /></td>
                      </tr>
                  }
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
