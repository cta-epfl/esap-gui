import React, { useContext, useState, useEffect } from "react";
import { Table, Alert } from "react-bootstrap";
import axios from "axios";
import { QueryContext } from "../../../contexts/QueryContext";
import { GlobalContext } from "../../../contexts/GlobalContext";
import LoadingSpinner from "../../LoadingSpinner";

export default function LOFARResults({ catalog }) {
  const { queryMap } = useContext(QueryContext);
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

    //const numPages = queryMap.get(catalog).results.pages;
    console.log("Query results:", queryMap.get(catalog).results.results);
    return (
      <>
        {/* <Paginate
          getNewPage={(args) => {
            return args.target ? setPage(parseFloat(args.target.text)) : null;
          }}
          currentPage={page}
          numAdjacent={3}
          numPages={numPages}
        /> */}
        <Table className="mt-3" responsive>
          <thead>
            <tr className="bg-light">
              {/* <th>
              <InputGroup>
                <InputGroup.Checkbox />
              </InputGroup>
            </th> */}
              <th>Project</th>
              <th>SAS ID</th>
              <th>Target Name</th>
              <th>RA</th>
              <th>Dec</th>
              <th>Release Date</th>
              <th>Start Time</th>
              <th>Duration</th>
              <th>Pipeline</th>
              <th>Antenna Set</th>
              <th>Instrument Filter</th>
            </tr>
          </thead>
          <tbody>
            {queryMap.get(catalog).results.results.map((result) => {
              return (
                <tr key={result.PID}>
                  {/* <th>
                  <InputGroup>
                    <InputGroup.Checkbox />
                  </InputGroup>
                </th> */}
                  <td>{result.project}</td>
                  <td>{result.sas_id}</td>
                  <td>{result.target}</td>
                  <td>{Number(result.ra).toFixed(1)}</td>
                  <td>{Number(result.dec).toFixed(1)}</td>
                  <td>{result.releaseDate}</td>
                  <td>{result.startTime}</td>
                  <td>{result.duration}</td>
                  <td>{result.pipeline}</td>
                  <td>{result.antennaSet}</td>
                  <td>{result.instrumentFilter}</td>
                  {/* <td>
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View data
                    </a>
                    {result.dataProductSubType === "continuumMF" ? (
                      <a
                        href={result.thumbnail}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-3"
                      >
                        Thumbnail
                      </a>
                    ) : null}
                  </td> */}
                </tr>
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
