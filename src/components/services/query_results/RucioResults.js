import React, { useContext } from "react";
import { Table, Alert, Form } from "react-bootstrap";
import { QueryContext } from "../../../contexts/QueryContext";
// import { BasketContext } from "../../contexts/BasketContext";
import LoadingSpinner from "../../LoadingSpinner";
import Paginate from "../../Paginate";
import AddToBasket from "../../basket/AddToBasketCheckBox";

function createBasketItem(record){
    return {
        archive: "rucio",
        record: record,
    };
}

function titleCase(string) {
  var sentence = string.toLowerCase().split(" ");
  for (var i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join(" ");
}

function newPageCallback(setPage) {
  return (args) => {
    if (args.target) {
      setPage(parseFloat(args.target.text));
    }
  };
}

export default function RucioResults({ catalog }) {
  const context = useContext(QueryContext);
  // const basketContext = useContext(BasketContext);
  const { queryMap, page, setPage } = context;

  // console.log(queryMap, page, context.queryMap.get(catalog).status);

  if (!context.queryMap) return null;
  if (context.queryMap.get(catalog).status === "fetched") {
    if (context.queryMap.get(catalog).results.results.length === 0)
      return <Alert variant="warning">No matching results found!</Alert>;
    else if (catalog === "rucio") {
      const result = queryMap.get("rucio").results.results[0];
      const numPages = queryMap.get("rucio").results.pages;

      const fields = Object.keys(result).map(
        (key) => key
      );
      const headers = Object.keys(result).map((field) => {
        const title = titleCase(field.replace("_", " "));
        return <th key={`header_${field}`}>{title}</th>;
      });

      return (
        <>
          <Paginate
            getNewPage={newPageCallback(setPage)}
            currentPage={page}
            numAdjacent={3}
            numPages={numPages}
          />
          <Form>
            {/*<SaveBasketButton />*/}
            <Table className="mt-3" responsive>
              <thead>
                <tr className="bg-light">
                  {/* <th>
                <InputGroup>
                  <InputGroup.Checkbox />
                </InputGroup>
              </th> */}
                  <th>Basket</th>
                  {headers}
                </tr>
              </thead>
              <tbody>
                {queryMap
                  .get("rucio")
                  .results.results.map((result, resultCounter) => {
                    const cells = fields.map((field) => {
                      const reactKey = `item_${resultCounter}_${field}`;
                      return (
                        <td key={reactKey}>
                          {result[field]}
                        </td>
                      );
                    });
                    return (
                      <tr key={`item_${resultCounter}`}>
                        {/* <th>
                    <InputGroup>
                      <InputGroup.Checkbox />
                    </InputGroup>
                  </th> */}
                        {/*<td>
                        <Form.Check id={`selectClassifications_${result.project_id}`} type="checkbox" onChange={(event) => {
                          const action = event.target.checked ? addToBasket : removeFromBasket;
                          action(result.project_id, basketContext, "project", "classifications");
                        }} checked={isInBasket(result.project_id, basketContext, "project", "classifications") ? "checked" : ""} />
                      </td>
                      <td>
                        <Form.Check id={`selectSubjects_${result.project_id}`} type="checkbox" onChange={(event) => {
                          const action = event.target.checked ? addToBasket : removeFromBasket;
                          action(result.project_id, basketContext, "project", "subjects");
                        }} checked={isInBasket(result.project_id, basketContext, "project", "subjects") ? "checked" : ""} />
                      </td>*/}
                        {/*<td>{result.project_id}</td>
                      <td>{result.display_name}</td>
                      <td>{created_at}</td>
                      <td>{updated_at}</td>
                      <td>{launch_date}</td>
                      <td>{live}</td>
                      <td>
                        <a href={`https://zooniverse.org/projects/${result.slug}`}>
                          Link
                      </a>
                      </td>*/}
                        <td>
                          <AddToBasket id={result.id} item={createBasketItem(result)} />
                        </td>
                        {cells}
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Form>
          <Paginate
            getNewPage={newPageCallback(setPage)}
            currentPage={page}
            numAdjacent={3}
            numPages={numPages}
          />
        </>
      );
    }
  }
  else {
    return <LoadingSpinner />;
  }
}
