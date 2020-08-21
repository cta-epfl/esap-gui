import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Button, Row, Col, Form as RBForm } from "react-bootstrap";
import Form from "react-jsonschema-form";
import { GlobalContext } from "../../contexts/GlobalContext";
import { QueryContext } from "../../contexts/QueryContext";
import QueryResults from "./QueryResults";
import parseQueryForm from "../../utils/form/parseQueryForm";
import { IVOAContext } from "../../contexts/IVOAContext";
import parseVOServiceForm from "../../utils/form/parseVOServiceForm";
import VOServiceResults from "./VOServiceResults";

export default function QueryIVOARegistry() {
  // queryMap is a map of dictionaries, where each dictionary consists of
  // {"catalog": "catalogname",
  //  "catalogquery": "querystring",
  //  "status": "fetching|fechted",
  //  "results": null}
  const { queryMap, formData, setFormData } = useContext(QueryContext);
  const { config, api_host, setConfigName } = useContext(GlobalContext);
  const { selectedRegistry, queryStep, setQueryStep } = useContext(IVOAContext);
  const { uri } = useParams();
  console.log("uri:", uri);

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
      default:
        setConfigName("esap_ivoa");
    }
    return () => {
      console.log("Set configuration back to default!");
      setConfigName("esap_ivoa");
    };
  }, [uri]);

  useEffect(() => {
    console.log("query schema:", config.query_schema);
    if (!formData) return;
    console.log("formData:", formData);
    const gui = config.query_schema.name;
    let queries = [];

    if (queryStep === "run-query") {
      selectedRegistry.forEach((access_url) => {
        queries = [...queries, ...parseVOServiceForm(formData, access_url)];
      });
    } else {
      queries = parseQueryForm(gui, formData);
    }

    console.log("queries:", queries);

    // Ideally query for each catalog is sent to ESAP API Gateway, and query results is returned
    // This is under development in the backend at the moment
    queryMap.clear();
    queries.forEach((query) => {
      queryMap.set(query.catalog, {
        catalog: query.catalog,
        service_type: query.service_type,
        esapquery: query.esapquery,
        status: "fetching",
        results: null,
      });
      let url = api_host + "query/" + query.esapquery;
      axios
        .get(url)
        .then((queryResponse) => {
          queryMap.set(query.catalog, {
            catalog: query.catalog,
            service_type: query.service_type,
            esapquery: query.esapquery,
            status: "fetched",
            results: queryResponse.data,
          });
        })
        .catch(() => {
          queryMap.set(query.catalog, {
            catalog: query.catalog,
            service_type: query.service_type,
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

  console.log("queryMap:", Array.from(queryMap.values()));

  const uiSchemaProp = config.ui_schema ? { uiSchema: config.ui_schema } : {};
  console.log("UI Schema props:", uiSchemaProp);
  console.log("Form Data:", formData);

  if (queryStep === "run-query") {
    uiSchemaProp.uiSchema = { query: { "ui:widget": "textarea" } };
    console.log("new ui schema:", uiSchemaProp);
    return (
      <Container fluid>
        <Form
          schema={config.query_schema}
          ObjectFieldTemplate={formTemplate}
          formData={formData}
          onSubmit={({ formData }) => setFormData(formData)}
          {...uiSchemaProp}
        >
          <RBForm.Control as="select" multiple>
            {selectedRegistry.map((registry) => {
              return <option>{registry}</option>;
            })}
          </RBForm.Control>
          <div>
            <Button className="mt-3" type="submit">
              Query Registry
            </Button>
          </div>
        </Form>
        {selectedRegistry.map((registry) => {
          const details = queryMap.get(registry);
          console.log("Details:", details);
          return <VOServiceResults catalog={registry} />;
        })}
      </Container>
    );
  } else {
    return (
      <Container fluid>
        <Form
          schema={config.query_schema}
          ObjectFieldTemplate={formTemplate}
          formData={formData}
          onSubmit={({ formData }) => setFormData(formData)}
          {...uiSchemaProp}
        >
          <div>
            <Button type="submit">Get Registry Services</Button>
          </div>
        </Form>
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
              <Row>
                <Col>
                  <h4>List of registries</h4>
                </Col>
                <Col>
                  {selectedRegistry.length === 0 ? (
                    <></>
                  ) : (
                    <Button
                      type="submit"
                      onClick={() => {
                        setQueryStep("run-query");
                      }}
                    >
                      Query selected registry
                    </Button>
                  )}
                </Col>
              </Row>
              <QueryResults catalog={catalog} />
            </div>
          );
        })}
      </Container>
    );
  }
}
