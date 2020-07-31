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

function ZooniverseProjectResults(queryMap){
  let date_formatter=new Intl.DateTimeFormat("default", DATETIME_OPTIONS);
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
            </tr>
          </thead>
          <tbody>
            {queryMap.get("zooniverse_projects").results.query_results.map((result) => {
              let launch_date = result.launch_date ? date_formatter.format(new Date(result.launch_date)) : "Not Launched";
              let created_at = date_formatter.format(new Date(result.created_at));
              let updated_at = date_formatter.format(new Date(result.updated_at));
              let live = result.live ? "Yes" : "No"
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
              {/* <th>View</th> */}
            </tr>
          </thead>
            <tbody>
              {project.workflows.map((workflow) => {
                let created_at = date_formatter.format(new Date(workflow.created_at));
                let updated_at = date_formatter.format(new Date(workflow.updated_at));
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
                    {/* <td><a href={`https://zooniverse.org/workflows/${workflow.slug}`}>Link</a></td> */}
                  </tr>
                );
              })}
            </tbody>
          </Table>
          </div>);
          {/* <Paginate /> */}
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
