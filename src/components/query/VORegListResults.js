import React, { useContext, useEffect, useState } from "react";
import { Table, Alert, InputGroup } from "react-bootstrap";
import { QueryContext } from "../../contexts/QueryContext";
import LoadingSpinner from "../LoadingSpinner";
import Paginate from "../Paginate";
import { IVOAContext } from "../../contexts/IVOAContext";

export default function VORegListResults({ catalog }) {
  const { queryMap } = useContext(QueryContext);
  const {
    selectedRegistry,
    addRegistry,
    removeRegistry,
    registryList,
    setRegistryList,
    regPage,
    setRegPage,
  } = useContext(IVOAContext);
  // const [checkAll, setCheckAll] = useState("");

  useEffect(() => {
    console.log("Selected Registry:", selectedRegistry);
  }, [selectedRegistry]);

  // useEffect(() => {
  //   console.log("checkAll:", checkAll);
  // }, [checkAll]);

  if (!queryMap) return null;
  console.log("VOReg queryMap:", queryMap.get(catalog));

  if (queryMap.get(catalog).status === "fetched") {
    if (queryMap.get(catalog).results.results.length === 0)
      return <Alert variant="warning">No matching results found!</Alert>;

    console.log("VO Registry results:", queryMap.get(catalog).results.results);
    setRegistryList(queryMap.get(catalog).results.results);
    console.log("Registry List:", registryList);

    const numPages = queryMap.get(catalog).results.pages;

    return (
      <>
        <Paginate
          getNewPage={(args) => {
            return args.target
              ? setRegPage(parseFloat(args.target.text))
              : null;
          }}
          currentPage={regPage}
          numAdjacent={3}
          numPages={numPages}
        />
        <Table className="mt-3" responsive>
          <thead>
            <tr className="bg-light">
              <th>
                <InputGroup>
                  <InputGroup.Checkbox
                  // onChange={(event) => {
                  //   setCheckAll(event.target.checked);
                  //   event.target.checked
                  //     ? queryMap
                  //         .get(catalog)
                  //         .results.results.map((result) => {
                  //           addRegistry(result.access_url);
                  //         })
                  //     : queryMap
                  //         .get(catalog)
                  //         .results.results.map((result) => {
                  //           removeRegistry(result.access_url);
                  //         });
                  // }}
                  />
                </InputGroup>
              </th>
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
                <tr key={result.short_name}>
                  <th>
                    <InputGroup>
                      <InputGroup.Checkbox
                        // checked={checkAll}
                        onChange={(event) => {
                          console.log(event.target.checked);
                          event.target.checked
                            ? addRegistry(result.access_url)
                            : removeRegistry(result.access_url);
                        }}
                      />
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
      </>
    );
  } else {
    return <LoadingSpinner />;
  }
}
