import React, { useContext } from "react";
import { Alert, Table, Button } from "react-bootstrap"; 
import { QueryContext } from "../../../contexts/QueryContext";
import LoadingSpinner from "../../LoadingSpinner";
import Paginate from "../../Paginate";
import Preview from "../../query/Preview";
import AddToBasket from "../../basket/AddToBasketCheckBox";
import { renderHeaderIVOA, renderRowIVOA }  from "../layout/IVOALayout"

function createBasketItem(record){
    return {
        archive: "vo_reg",
        record: record,
    };
}

export default function IVOAResults({ catalog }) {
  const { queryMap, page, setPage, preview, setPreview, setURL } = useContext(QueryContext);

  if (!queryMap.get(catalog)) return null;
  console.log("VO service queryMap:", queryMap.get(catalog));

  if (queryMap.get(catalog).status === "error") {
      if (queryMap.get(catalog).results[0].includes("ERROR")) {
          return (
            <Alert variant="danger">{queryMap.get(catalog).results[0]}</Alert>
          );
      } else {
          return (
            <Alert variant="danger">Unknown error while running this query!</Alert>
          );

      }

  }

  if (queryMap.get(catalog).status === "fetched") {

      try {
          if (queryMap.get(catalog).results.results.length === 0)
              return <Alert variant="warning">No matching results found!</Alert>;
      } catch (e) {
          return <Alert variant="warning">No matching results found!</Alert>;
      }

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
                  <th>Basket</th>
                  {renderHeaderIVOA(queryMap, catalog, indice)}
                  <th></th>
              </tr>

          </thead>
          <tbody>
            {queryMap.get(catalog).results.results.map((result) => {

              let queryResult = result.result.split(",");

              return (
                <>
                  <tr key={queryResult[queryMap.get(catalog).vo_table_schema.fields.findIndex((item) => item.name === "access_url")]}>
                      <td>
                          <AddToBasket id={result.id} item={createBasketItem(queryResult)} />
                      </td>
                      {renderRowIVOA(queryResult, queryMap, catalog, indice, setPreview, setURL)}

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
