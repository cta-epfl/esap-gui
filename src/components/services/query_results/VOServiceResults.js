import React, { useContext } from "react";
import { Alert, Table, Button } from "react-bootstrap"; 
import { QueryContext } from "../../../contexts/QueryContext";
import LoadingSpinner from "../../LoadingSpinner";
import Paginate from "../../Paginate";
import Preview from "../../query/Preview";

export default function VORegistryResults({ catalog }) {
  const { queryMap, page, setPage, preview, setPreview, setURL } = useContext(QueryContext);

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
    let indice = [];

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
              {queryMap.get(catalog).vo_table_schema.fields.map((field, index) => {
                if ((field.name === "dataproduct_type") || (field.name === "dataproduct_subtype") ||
                    (field.name === "calib_level") || (field.name === "obs_collection") ||
                    (field.name === "obs_id") ||
                    (field.name === "calib_level") || (field.name === "access_url") ||
                    (field.name === "access_estsize") || (field.name === "target_name") ||
                    (field.name === "s_ra") || (field.name === "s_dec") ||
                    (field.name === "s_fov") ||
                    (field.name === "instrument_name") || (field.name === "preview")
                ) {
                  indice.push(index);
                  return (<th>{field.name}</th>);
                }
                return null;
              })}
            </tr>
          </thead>
          <tbody>
            {queryMap.get(catalog).results.results.map((result) => {

              let queryResult = result.result.split(",");

              return (
                <>
                  <tr key={queryResult[queryMap.get(catalog).vo_table_schema.fields.findIndex((item) => item.name === "access_url")]}>

                    {queryResult.map((field, index) => {

                      if (indice.includes(index)) {
                        if (queryMap.get(catalog).vo_table_schema.fields[index].name === "access_url") {
                          return (<td><a href={field} rel="noopener noreferrer" download>Download data</a></td>);
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
                        if ((queryMap.get(catalog).vo_table_schema.fields[index].name === "s_ra") ||
                            (queryMap.get(catalog).vo_table_schema.fields[index].name === "s_dec") ||
                            (queryMap.get(catalog).vo_table_schema.fields[index].name === "s_fov")
                        ) {
                          return (<td>{Number(field).toFixed(1)}</td>)
                        }
                        return (<td>{field}</td>) ;
                      }
                      return null;
                    })}
                  </tr>
                  { 
                    preview === queryResult[queryMap.get(catalog).vo_table_schema.fields.findIndex((item) => item.name === "preview")] && 
                      <tr key={queryResult.preview}>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td colSpan={queryResult.length-3} ><Preview /></td>
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
}
