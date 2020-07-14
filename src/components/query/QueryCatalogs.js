import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import Form from "react-jsonschema-form";
import { GlobalContext } from "../../contexts/GlobalContext";
import { QueryContext } from "../../contexts/QueryContext";
import QueryResults from "./QueryResults";
import parseQueryForm from "../../utils/form/parseQueryForm";

export default function QueryCatalogs() {
  // queryMap is a map of dictionaries, where each dictionary consists of
  // {"catalog": "catalogname",
  //  "catalogquery": "querystring",
  //  "status": "fetching|fechted",
  //  "results": null}
  const { queryMap, formData, setFormData } = useContext(QueryContext);
  const { config, api_host } = useContext(GlobalContext);

  console.log(config.query_schema);
  useEffect(() => {
    if (!formData) return;
    let catalogs = config.query_schema.properties.catalog.enum.filter(
      (name) => name !== "all"
    );
    let gui = config.query_schema.name;
    const queries = parseQueryForm(gui, formData, catalogs);

    // Ideally query for each catalog is sent to ESAP API Gateway, and query results is returned
    // This is under development in the backend at the moment
    queries.forEach((query) => {
      queryMap.set(query.catalog, {
        catalog: query.catalog,
        esapquery: query.esapquery,
        status: "fetching",
        results: null,
      });
      let url = api_host + "query/query/?" + query.esapquery;
      axios
        .get(url)
        .then((queryResponse) => {
          queryMap.set(query.catalog, {
            catalog: query.catalog,
            esapquery: query.esapquery,
            status: "fetched",
            results: queryResponse.data,
          });
        })
        .catch(() => {
          queryMap.set(query.catalog, {
            catalog: query.catalog,
            esapquery: query.esapquery,
            status: "error",
            results: null,
          });
        });
    });
  }, [formData]);

  function formTemplate({ TitleField, properties, title, description }) {
    return (
      <div>
        <TitleField title={title} />
        <div className="row">
          {properties.map((prop) => (
            <div
              className="col-lg-2 col-md-4 col-sm-6 col-xs-12"
              key={prop.content.key}
            >
              {prop.content}
            </div>
          ))}
        </div>
        {description}
      </div>
    );
  }

  console.log("queryMap", Array.from(queryMap.values()));

  return (
    <Container fluid>
      <Form
        schema={config.query_schema}
        ObjectFieldTemplate={formTemplate}
        formData={formData}
        onSubmit={({ formData }) => setFormData(formData)}
      ></Form>
      {Array.from(queryMap.keys()).map((catalog) => {
        const details = queryMap.get(catalog);
        console.log("Details:", details);
        console.log("Results:", details.results);
        return (
          <div key={catalog} className="mt-3">
            <h4>Query results for {catalog}</h4>
            <QueryResults catalog={catalog} />
          </div>
        );
      })}
    </Container>
  );
}
