import React, { useContext, useState, useEffect } from "react";
import { Table, Alert } from "react-bootstrap";
import axios from "axios";
import { QueryContext } from "../../../contexts/QueryContext";
import { GlobalContext } from "../../../contexts/GlobalContext";
import LoadingSpinner from "../../LoadingSpinner";
import Paginate from "../../Paginate";
import HandlePreview from "../../query/HandlePreview";
import Preview from "../../query/Preview";
import AddToBasket from "../../basket/AddToBasketCheckBox";
import { renderRowAstronVO, renderHeaderAstronVO }  from "../layout/AstronVOLayout"

function createBasketItem(record){
    return {
        archive: "astron_vo",
        record: record,
    };
}

export default function ASTRONVOResults({ catalog }) {
  const { queryMap, preview } = useContext(QueryContext);
  const { api_host } = useContext(GlobalContext);
  const [page, setPage] = useState(queryMap.get(catalog).page);

  useEffect(() => {
    queryMap.set(catalog, {
      catalog: catalog,
      page: page,
      esapquery: queryMap.get(catalog).esapquery + `&page=${page}`,
    });
    const url = api_host + "query/query/?" + queryMap.get(catalog).esapquery;
    axios
      .get(url)
      .then((queryResponse) => {
        queryMap.set(catalog, {
          catalog: catalog,
          esapquery: queryMap.get(catalog).esapquery,
          page: page,
          status: "fetched",
          results: queryResponse.data,
        });
      })
      .catch(() => {
        queryMap.set(catalog, {
          catalog: catalog,
          esapquery: queryMap.get(catalog).esapquery,
          page: page,
          status: "error",
          results: null,
        });
      });
  }, [page])

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
              <th>Basket</th>
                {renderHeaderAstronVO()}
              <th>Link to data</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {queryMap.get(catalog).results.results.map((result) => {
              return (
                <>
                  <tr key={result.url}>
                    <td>
                      <AddToBasket id={result.id} item={createBasketItem(result)} />
                    </td>
                      {renderRowAstronVO(result)}

                    <td>
                      <a href={result.url} rel="noopener noreferrer" download>
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
        {/* <Paginate /> */}
      </>
    );
  } else {
    return <LoadingSpinner />;
  }
}
