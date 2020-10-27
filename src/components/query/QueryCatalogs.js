import React, { useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import Form from "react-jsonschema-form";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BasketContextProvider } from "../../contexts/BasketContext"
import { QueryContext } from "../../contexts/QueryContext";
import QueryResults from "./QueryResults";
import parseQueryForm from "../../utils/form/parseQueryForm";

export default function QueryCatalogs() {
  // queryMap is a map of dictionaries, where each dictionary consists of
  // {"catalog": "catalogname",
  //  "catalogquery": "querystring",
  //  "status": "fetching|fechted",
  //  "results": null}
  const { queryMap, formData, setFormData, page } = useContext(QueryContext);
  const { config, api_host, setConfigName, defaultConf } = useContext(
    GlobalContext
  );
  const { uri } = useParams();
  const history = useHistory();
  console.log("uri:", uri);
  console.log("default conf:", defaultConf);

  // set ConfigName for archive
  useEffect(() => {
    switch (uri) {
      case "adex":
        setConfigName("adex");
        break;
      case "apertif":
        setConfigName("apertif");
        break;
      case "zooniverse":
        setConfigName("zooniverse");
        break;
      case "astron_vo":
        setConfigName("astron_vo");
        break;
      case "lofar":
        setConfigName("lofar");
        break;
    }
    return () => {
      console.log("cleaned up");
      queryMap.clear();
      setFormData();
      setConfigName(defaultConf);
    };
  }, [uri]);

  useEffect(() => {
    console.log(config.query_schema);
    if (!formData) return;
    const gui = config.query_schema.name;
    const queries = parseQueryForm(gui, formData, page);

    // Ideally query for each catalog is sent to ESAP API Gateway, and query results is returned
    // This is under development in the backend at the moment
    queryMap.clear();
    queries.forEach((query) => {
      queryMap.set(query.catalog, {
        catalog: query.catalog,
        esapquery: query.esapquery,
        status: "fetching",
        results: null,
      });
      const url = api_host + "query/query/?" + query.esapquery;
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
  }, [formData, page]);

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

  const uiSchemaProp = config.ui_schema ? { uiSchema: config.ui_schema } : {};
  return (
    <Container fluid>
      <Form
        schema={config.query_schema}
        ObjectFieldTemplate={formTemplate}
        formData={formData}
        onSubmit={({ formData }) => setFormData(formData)}
        {...uiSchemaProp}
      ></Form>
      {Array.from(queryMap.keys()).map((catalog) => {
        console.log("catalog:", catalog);
        const details = queryMap.get(catalog);
        console.log("Details:", details);
        console.log("Results:", details.results);
        let catalogName =
          config.query_schema.properties.catalog.enumNames[
            config.query_schema.properties.catalog.enum.findIndex(
              (name) => name === catalog
            )
          ];
        return (
          <div key={catalog} className="mt-3">
            <h4>Query results for {catalogName}</h4>
            <BasketContextProvider>
              <QueryResults catalog={catalog} />
            </BasketContextProvider>
          </div>
        );
      })}
    </Container>
  );
}
