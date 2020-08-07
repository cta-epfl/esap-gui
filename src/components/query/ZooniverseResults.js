import React, { useContext } from "react";
import { Table, Alert } from "react-bootstrap";
import { QueryContext } from "../../contexts/QueryContext";
import LoadingSpinner from "../LoadingSpinner";
import Paginate from "../Paginate";

const DATETIME_OPTIONS = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false,
  timeZoneName: 'short'
};

Object.isObject = function(obj) {
    return obj && obj.constructor === this || false;
};

function renderArray(array, currentReactKey=""){
  return array.map((element, index) => {
    let updatedReactKey = `${currentReactKey}_${index}`;
    return renderIfCompound(element, updatedReactKey);
  });
}

function renderObject(object, currentReactKey=""){
  return (
    <Table key={currentReactKey + "_objTable"}>
    <tbody>
    {Object.entries(object).map(([key, value]) =>{
      let updatedReactKey=`${currentReactKey}_${key}`;
      return(
        <tr key={updatedReactKey}><td className="b">{key}</td><td>{renderIfCompound(value, updatedReactKey)}</td></tr>
      )
    })}
    </tbody>
    </Table>
  )
}

function renderIfCompound(element, currentReactKey="") {
  if (Array.isArray(element)) {
    return renderArray(element, currentReactKey);
  } else if (Object.isObject(element)) {
    return renderObject(element, currentReactKey);
  } else if (typeof element === "boolean") {
    return JSON.stringify(element)
  }
  return element
}

function titleCase(string) {
      var sentence = string.toLowerCase().split(" ");
      for(var i = 0; i< sentence.length; i++){
         sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
      }
   return sentence.join(" ");
   }

function ZooniverseProjectResults(queryMap){
  let date_formatter=new Intl.DateTimeFormat("default", DATETIME_OPTIONS);
  let result = queryMap.get("zooniverse_projects").results.query_results[0];
  let mandatory_fields = ["launch_date", "created_at", "live", "updated_at", "project_id", "display_name", "slug"];
  let remaining_fields = Object.keys(result).filter(key => !mandatory_fields.includes(key));
  let remaining_headers = remaining_fields.map((field) => {
    let title=titleCase(field.replace("_", " "));
    return (<th key={`project_header_${field}`}>{title}</th>);
  });
    return (
      <>
        <Table className="mt-3" responsive>
          <thead>
            <tr className="bg-light">
              {/* <th>
              <InputGroup>
                <InputGroup.Checkbox />
              </InputGroup>
            </th> */}
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
            {queryMap.get("zooniverse_projects").results.query_results.map((result) => {
              let launch_date = result.launch_date ? date_formatter.format(new Date(result.launch_date)) : "Not Launched";
              let created_at = date_formatter.format(new Date(result.created_at));
              let updated_at = date_formatter.format(new Date(result.updated_at));
              let live = result.live ? "Yes" : "No"
              let remaining_cells = remaining_fields.map((field) => {
                let reactKey = `project_${result.project_id}_${field}`;
                return (<td key={reactKey}>{renderIfCompound(result[field], reactKey)}</td>);
              });
              return (
                <tr key={`project_${result.project_id}`}>
                  {/* <th>
                  <InputGroup>
                    <InputGroup.Checkbox />
                  </InputGroup>
                </th> */}
                  <td>{result.project_id}</td>
                  <td>{result.display_name}</td>
                  <td>{created_at}</td>
                  <td>{updated_at}</td>
                  <td>{launch_date}</td>
                  <td>{live}</td>
                  <td><a href={`https://zooniverse.org/projects/${result.slug}`}>Link</a></td>
                  {remaining_cells}
                </tr>
              );
            })}
          </tbody>
        </Table>
        {/* <Paginate /> */}
      </>
    );

}

function ZooniverseWorkflowResults(queryMap){
  let date_formatter=new Intl.DateTimeFormat("default", DATETIME_OPTIONS);
  let result = queryMap.get("zooniverse_workflows").results.query_results[0];
  let result_workflow = result.workflows[0]
  let mandatory_fields = ["created_at", "updated_at", "workflow_id", "display_name"];
  let remaining_fields = Object.keys(result_workflow).filter(key => !mandatory_fields.includes(key));
  let remaining_headers = remaining_fields.map((field) => {
    let title=titleCase(field.replace("_", " "));
    return (<th key={`project_header_${field}`}>{title}</th>);
  });
    return (
      <>
      {queryMap.get("zooniverse_workflows").results.query_results.map((project) => {
        return (<div key={project.project_id}>
        <h4>{project.display_name}</h4>
        <Table className="mt-3" responsive>
          <thead>
            <tr className="bg-light">
              {/* <th>
              <InputGroup>
                <InputGroup.Checkbox />
              </InputGroup>
            </th> */}
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
                let created_at = date_formatter.format(new Date(workflow.created_at));
                let updated_at = date_formatter.format(new Date(workflow.updated_at));
                let remaining_cells = remaining_fields.map((field) => {
                  let reactKey = `workflow_${workflow.workflow_id}_${field}`;
                  return (<td key={reactKey}>{renderIfCompound(workflow[field], reactKey)}</td>);
                });
                return (
                  <tr key={`workflow_${workflow.workflow_id}`}>
                    {/* <th>
                    <InputGroup>
                      <InputGroup.Checkbox />
                    </InputGroup>
                  </th> */}
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
          {/* <Paginate /> */}
          </div>);
        })}
      </>
    );
}

export default function ZooniverseResults({ catalog }) {
  const { queryMap } = useContext(QueryContext);
  if (!queryMap) return null;
  if (queryMap.get(catalog).status === "fetched") {
    if (queryMap.get(catalog).results.query_results.length === 0)
      return <Alert variant="warning">No matching results found!</Alert>;
    else if (catalog === "zooniverse_projects"){
      return ZooniverseProjectResults(queryMap);
    }
    else if (catalog === "zooniverse_workflows"){
      return ZooniverseWorkflowResults(queryMap);
    }
    else {
      return <Alert variant="warning">Unrecognised Zooniverse Catalog!</Alert>;
    }
  } else {
    return <LoadingSpinner />;
  }
}
