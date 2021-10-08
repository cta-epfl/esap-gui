import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Button, Row, Col, Form as RBForm } from "react-bootstrap";
import Form from "react-jsonschema-form";
import { GlobalContext } from "../../contexts/GlobalContext";
import { QueryContext } from "../../contexts/QueryContext";
import QueryResults from "../services/query_results/QueryResults";
import parseQueryForm from "../../utils/form/parseQueryForm";
import { IVOAContext } from "../../contexts/IVOAContext";
import parseVOServiceForm from "../../utils/form/parseVOServiceForm";
import VOServiceResults from "../services/query_results/VOServiceResults";
import { getQueryIcon } from "../../utils/styling";

export default function QueryIVOARegistry() {
  // queryMap is a map of dictionaries, where each dictionary consists of
  // {"catalog": "catalogname",
  //  "catalogquery": "querystring",
  //  "status": "fetching|fechted",
  //  "results": null}
  const { config, setConfigName, defaultConf, queryMap, formData, setFormData, page, setPage } = useContext(QueryContext);
  const { api_host } = useContext(
    GlobalContext
  );
  const { selectedRegistry, setSelectedRegistry, queryStep, setQueryStep, regPage } = useContext(
    IVOAContext
  );
  const { uri } = useParams();
  console.log("uri:", uri);
  console.log("default conf: ", defaultConf);

  // set ConfigName for archive
  useEffect(() => {
      setConfigName("esap_ivoa");
    return () => {
      console.log("cleaned up");
      queryMap.clear();
      setFormData();
      setConfigName(defaultConf);
    };
  }, []);

  // load the GUI for this configuration
  useEffect(() => {
    console.log("query schema:", config.query_schema);
    if (!formData) return;
    console.log("formData:", formData);

    const gui = config.query_schema.name;
    let queries = [];

    if (queryStep === "run-query") {
      selectedRegistry.forEach((access_url) => {
        queries = [
          ...queries,
          ...parseVOServiceForm(formData, access_url, page),
        ];
      });
    } else {
      queries = parseQueryForm(gui, formData, regPage);
    }

    console.log("queries:", queries);

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
          if(queryStep === "run-query") {
          let tf_url = api_host + "query/get-tables-fields/?dataset_uri=vo_reg&access_url=" + query.catalog;
          console.log("table fields url: ", tf_url);

          axios
            .get(tf_url)
            .then((tfResponse) => {

              queryMap.set(query.catalog, {
                catalog: query.catalog,
                service_type: query.service_type,
                vo_table_schema: tfResponse.data.results.find((item) => item.table_name === "ivoa.obscore"),
                esapquery: query.esapquery,
                status: "fetched",
                results: queryResponse.data,
              });
            })
          }
          else {
            queryMap.set(query.catalog, {
              catalog: query.catalog,
              service_type: query.service_type,
              esapquery: query.esapquery,
              status: "fetched",
              results: queryResponse.data,
          })};                      
        })
        .catch(() => {
          queryMap.set(query.catalog, {
            catalog: query.catalog,
            service_type: query.service_type,
            vo_table_schema:"",
            esapquery: query.esapquery,
            status: "error",
            results: null,
          });
        });
    });
  }, [formData, page, regPage]);

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
    uiSchemaProp.uiSchema = {
      query: { "ui:widget": "textarea" },
      keyword: { "ui:widget": "hidden" },
      tap_schema: { "ui:widget": "hidden" },
      waveband: { "ui:widget": "hidden" },
    };
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
          return (
            <div className="mt-3">
              <VOServiceResults catalog={registry} />
            </div>
          );
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
            <Button type="submit">{getQueryIcon()} Query VO Registry</Button>
          </div>
        </Form>
        {Array.from(queryMap.keys()).map((catalog) => {
          console.log("catalog:", catalog);
          const details = queryMap.get(catalog);
          console.log("Details:", details);
          console.log("Results:", details.results);
          // let catalogName =
          //   config.query_schema.properties.catalog.enumNames[
          //     config.query_schema.properties.catalog.enum.findIndex(
          //       (name) => name === catalog
          //     )
          //   ];
          return (
            <div key={catalog} className="mt-3">
              <Row>
                <Col>
                  <h4>List of resources</h4>
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
                      Query selected resources
                    </Button>
                  )}
                </Col>
              </Row>
              <div className="mt-3">
                <QueryResults catalog={catalog} />
              </div>
            </div>
          );
        })}
      </Container>
    );
  }
}
