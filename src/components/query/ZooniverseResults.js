import React, { useContext, useState } from "react";
import { Table, Alert, Form, Button } from "react-bootstrap";
import * as deepEqual from "deep-equal";
import { QueryContext } from "../../contexts/QueryContext";
import { BasketContext } from "../../contexts/BasketContext";
import LoadingSpinner from "../LoadingSpinner";
import Paginate, { pagination_fields } from "../Paginate";
import SaveBasket from "../basket/savebasket";

const DATETIME_OPTIONS = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
  timeZoneName: "short",
};

Object.isObject = function(obj) {
  return (obj && obj.constructor === this) || false;
};

function renderArray(array, currentReactKey = "") {
  return array.map((element, index) => {
    const updatedReactKey = `${currentReactKey}_${index}`;
    const separator = index < array.length - 1 ? ", " : "";
    return renderIfCompound(element, updatedReactKey, separator);
  });
}

function renderObject(object, currentReactKey = "") {
  return (
    <Table key={currentReactKey + "_objTable"}>
      <tbody>
        {Object.entries(object).map(([key, value]) => {
          const updatedReactKey = `${currentReactKey}_${key}`;
          return (
            <tr key={updatedReactKey}>
              <td className="b">{key}</td>
              <td>{renderIfCompound(value, updatedReactKey)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

function renderIfCompound(
  element,
  currentReactKey = "",
  separatorForPod = "",
  floatPrecision = 3
) {
  if (Array.isArray(element)) {
    return renderArray(element, currentReactKey, separatorForPod);
  } else if (Object.isObject(element)) {
    return renderObject(element, currentReactKey, separatorForPod);
  } else if (typeof element === "boolean") {
    return JSON.stringify(element) + separatorForPod;
  } else if (Number.isInteger(element)) {
    return element.toString() + separatorForPod;
  } else {
    try {
      return element.toFixed(floatPrecision) + separatorForPod;
    } catch (err) {
      return `${element}` + separatorForPod;
    }
  }
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

function isInBasket(id, basketContext, catalog, category) {
  const testBasketItem = {
    archive: "zooniverse",
    catalog: catalog,
    id: id,
    category: category
  };

  const found = basketContext.datasets.some(basketItem => deepEqual(basketItem, testBasketItem));
  console.log(found);
  return found;
}

function addToBasket(id, basketContext, catalog, category) {
  const basketItem = {
    archive: "zooniverse",
    catalog: catalog,
    id: id,
    category: category
  };
  basketContext.add(basketItem);
  console.log([basketItem, basketContext]);
}

function removeFromBasket(id, basketContext, catalog, category) {
  const basketItem = {
    archive: "zooniverse",
    catalog: catalog,
    id: id,
    category: category
  }
  basketContext.remove(basketItem);
  console.log([basketItem, basketContext]);
}

function ZooniverseProjectResults(context, basketContext) {
  const { queryMap, page, setPage } = context;
  const date_formatter = new Intl.DateTimeFormat("default", DATETIME_OPTIONS);
  const result = queryMap.get("zooniverse_projects").results.results[0];
  const numPages = result.pages;
  const mandatory_fields = [
    "launch_date",
    "created_at",
    "live",
    "updated_at",
    "project_id",
    "display_name",
    "slug",
  ];
  const remaining_fields = Object.keys(result).filter(
    (key) =>
      !(mandatory_fields.includes(key) || pagination_fields.includes(key))
  );
  const remaining_headers = remaining_fields.map((field) => {
    const title = titleCase(field.replace("_", " "));
    return <th key={`project_header_${field}`}>{title}</th>;
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
        <SaveBasket />
        <Table className="mt-3" responsive>
          <thead>
            <tr className="bg-light">
              {/* <th>
              <InputGroup>
                <InputGroup.Checkbox />
              </InputGroup>
            </th> */}
              <th>Select Classification Data</th>
              <th>Select Subject Data</th>
              <th>ID</th>
              <th>Display Name</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Launched</th>
              <th>Live</th>
              <th>View</th>
              {remaining_headers}
            </tr>
          </thead>
          <tbody>
            {queryMap
              .get("zooniverse_projects")
              .results.results.map((result) => {
                const launch_date = result.launch_date
                  ? date_formatter.format(new Date(result.launch_date))
                  : "Not Launched";
                const created_at = date_formatter.format(
                  new Date(result.created_at)
                );
                const updated_at = date_formatter.format(
                  new Date(result.updated_at)
                );
                const live = result.live ? "Yes" : "No";
                const remaining_cells = remaining_fields.map((field) => {
                  const reactKey = `project_${result.project_id}_${field}`;
                  return (
                    <td key={reactKey}>
                      {renderIfCompound(result[field], reactKey)}
                    </td>
                  );
                });
                return (
                  <tr key={`project_${result.project_id}`}>
                    {/* <th>
                  <InputGroup>
                    <InputGroup.Checkbox />
                  </InputGroup>
                </th> */}
                    <td>
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
                    </td>
                    <td>{result.project_id}</td>
                    <td>{result.display_name}</td>
                    <td>{created_at}</td>
                    <td>{updated_at}</td>
                    <td>{launch_date}</td>
                    <td>{live}</td>
                    <td>
                      <a href={`https://zooniverse.org/projects/${result.slug}`}>
                        Link
                    </a>
                    </td>
                    {remaining_cells}
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

function ZooniverseWorkflowResults(context, basketContext) {
  const { queryMap, page, setPage } = context;
  let date_formatter = new Intl.DateTimeFormat("default", DATETIME_OPTIONS);
  let result = queryMap.get("zooniverse_workflows").results.results[0];
  let result_workflow = result.workflows[0];
  const numPages = result.pages;
  let mandatory_fields = [
    "created_at",
    "updated_at",
    "workflow_id",
    "display_name",
  ];
  let remaining_fields = Object.keys(result_workflow).filter(
    (key) =>
      !(mandatory_fields.includes(key) || pagination_fields.includes(key))
  );
  let remaining_headers = remaining_fields.map((field) => {
    let title = titleCase(field.replace("_", " "));
    return <th key={`project_header_${field}`}>{title}</th>;
  });
  return (
    <>
      <Paginate
        getNewPage={newPageCallback(setPage)}
        currentPage={page}
        numAdjacent={3}
        numPages={numPages}
      />
      {queryMap
        .get("zooniverse_workflows")
        .results.results.map((project) => {
          return (
            <div key={project.project_id}>
              <h4>{project.display_name}</h4>
              <Table className="mt-3" responsive>
                <thead>
                  <tr className="bg-light">
                    {/* <th>
              <InputGroup>
                <InputGroup.Checkbox />
              </InputGroup>
            </th> */}
                    <th>Select Classification Data</th>
                    <th>Select Subject Data</th>
                    <th>ID</th>
                    <th>Display Name</th>
                    <th>Created</th>
                    <th>Updated</th>
                    {remaining_headers}
                    {/* <th>View</th> */}
                  </tr>
                </thead>
                <tbody>
                  {project.workflows.map((workflow) => {
                    let created_at = date_formatter.format(
                      new Date(workflow.created_at)
                    );
                    let updated_at = date_formatter.format(
                      new Date(workflow.updated_at)
                    );
                    let remaining_cells = remaining_fields.map((field) => {
                      let reactKey = `workflow_${workflow.workflow_id}_${field}`;
                      return (
                        <td key={reactKey}>
                          {renderIfCompound(workflow[field], reactKey)}
                        </td>
                      );
                    });
                    return (
                      <tr key={`workflow_${workflow.workflow_id}`}>
                        {/* <th>
                    <InputGroup>
                      <InputGroup.Checkbox />
                    </InputGroup>
                  </th> */}
                        <td>
                          <Form.Check id={`selectClassifications_${result.workflow_id}`} type="checkbox" onChange={(event) => {
                            const action = event.target.checked ? addToBasket : removeFromBasket;
                            action(result.workflow_id, basketContext, "workflow", "classifications");
                          }} checked={isInBasket(result.project_id, basketContext, "workflow", "classifications") ? "checked" : ""} />
                        </td>
                        <td>
                          <Form.Check id={`selectSubjects_${result.workflow_id}`} type="checkbox" onChange={(event) => {
                            const action = event.target.checked ? addToBasket : removeFromBasket;
                            action(result.workflow_id, basketContext, "workflow", "subjects");
                          }} checked={isInBasket(result.project_id, basketContext, "workflow", "subjects") ? "checked" : ""} />
                        </td>
                        <td>{workflow.workflow_id}</td>
                        <td>{workflow.display_name}</td>
                        <td>{created_at}</td>
                        <td>{updated_at}</td>
                        {remaining_cells}
                        {/* <td><a href={`https://zooniverse.org/workflows/${workflow.slug}`}>Link</a></td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          );
        })}
      <Paginate
        getNewPage={newPageCallback(setPage)}
        currentPage={page}
        numAdjacent={3}
        numPages={numPages}
      />
    </>
  );
}

export default function ZooniverseResults({ catalog }) {
  const context = useContext(QueryContext);
  const basketContext = useContext(BasketContext);
  if (!context.queryMap) return null;
  if (context.queryMap.get(catalog).status === "fetched") {
    if (context.queryMap.get(catalog).results.results.length === 0)
      return <Alert variant="warning">No matching results found!</Alert>;
    else if (catalog === "zooniverse_projects") {
      console.log(`basketContext -> ${basketContext}`);
      console.log(basketContext);
      return ZooniverseProjectResults(context, basketContext);
    } else if (catalog === "zooniverse_workflows") {
      return ZooniverseWorkflowResults(context, basketContext);
    } else {
      return <Alert variant="warning">Unrecognised Zooniverse Catalog!</Alert>;
    }
  } else {
    return <LoadingSpinner />;
  }
}
