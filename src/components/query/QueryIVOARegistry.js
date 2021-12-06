import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Button, Row, Col, Form as RBForm } from "react-bootstrap";
import Form from "react-jsonschema-form";
import { GlobalContext } from "../../contexts/GlobalContext";
import { QueryContext } from "../../contexts/QueryContext";
import QueryResults from "../services/query_results/QueryResults";
import parseQueryForm from "../../utils/form/parseQueryForm";
import { IVOAContext } from "../../contexts/IVOAContext";
import parseVOServiceForm from "../../utils/form/parseVOServiceForm";
import VOServiceResults from "../services/query_results/IVOAResults";
import { getQueryIcon } from "../../utils/styling";
import "../../assets/IVOA.css";
import LoadingSpinner from "../LoadingSpinner";
import JSONTree from 'react-json-tree'
import { Map } from 'immutable'



export default function QueryIVOARegistry() {
  // queryMap is a map of dictionaries, where each dictionary consists of
  // {"catalog": "catalogname",
  //  "catalogquery": "querystring",
  //  "status": "fetching|fechted",
  //  "results": null}
  const {setConfigName, defaultConf, queryMap, formData, setFormData, page, setPage, setDPLevel, setCollection} = useContext(QueryContext);
  const { api_host } = useContext(
    GlobalContext
  );
  const { selectedServices, setSelectedServices, queryStep, setQueryStep, regPage } = useContext(
    IVOAContext
  );
  const [config, setConfig] = useState();
  const [url, setURL] = useState("");
  const [dplevel] = useState();
  const [collection] = useState();
  const [configName] = useState(defaultConf);
  const [preview, setPreview] = useState(false);
  const [ds9, setDS9] = useState(false);
  const {loginAgain } = useContext(GlobalContext);
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  const [metadata, setMetadata] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const { uri } = useParams();

  if (config==null){
    fetchConfiguration(defaultConf);
  }

  function fetchConfiguration(configName) {

        let configNameString = configName;
        if (configName) {
            configNameString = `?name=${configName}`;
        }

       axios
            .get(api_host + "query/configuration" + configNameString)
            .then((response) => {
                let props = response.data["configuration"].query_schema.properties;

                Object.keys(props).map((key) => {
                    if (key === "collection" && collection) {
                        props[key]["default"] = collection;
                    }
                    if (key === "level" && dplevel) {
                        props[key]["default"] = dplevel;
                    }
                    return null;
                });
               setConfig(response.data["configuration"]);
            }).catch((error) => {
                 let description = ". Configuration not loaded. Is ESAP-API online? " + api_host
                  console.log(error.toString() + description)
                 //                alert(description)
                //const loginUrl = api_host + "oidc/authenticate"
                // window.location = loginUrl
                //   loginAgain()
            });
  }

  // set ConfigName for archive
  useEffect(() => {
      setConfigName("esap_ivoa");
    return () => {
      queryMap.clear();
      setFormData();
      setConfigName(defaultConf);
    };
  }, []);

  // load the GUI for this configuration
  useEffect(() => {

    if (!formData) return;

    const gui = config.query_schema.name;
    let queries = [];

    if (queryStep === "run-query") {
      selectedServices.forEach((access_url) => {
        queries = [
          ...queries,
          ...parseVOServiceForm(formData, access_url, page),
        ];
      });
    } else {
      queries = parseQueryForm(gui, formData, regPage);
    }


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
              queryMap.set(query.catalog, {
                  catalog: query.catalog,
                  service_type: query.service_type,
                  vo_table_schema: queryResponse.data.results[0],
                  esapquery: query.esapquery,
                  status: "fetched",
                  results: queryResponse.data,
              });

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


  const theme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633',
  };


  function formTemplate({ TitleField, properties, title, description }) {
    return (
      <div>
        <TitleField title={title} />
        <div className="row">
          {properties.filter(property => property.content.props.uiSchema["ui:widget"]!="hidden").map((prop) => (
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


  let uiSchemaProp = {}
  if (config){
    uiSchemaProp = config.ui_schema ? { uiSchema: config.ui_schema } : {};
  } else {
    uiSchemaProp = {};
  }

  if (queryStep === "run-query") {

    if (config){
      uiSchemaProp.uiSchema = {
         adql_query: { "ui:widget": "textarea" },
         keyword: { "ui:widget": "hidden" },
         service_type: { "ui:widget": "hidden" },
         catalog: { "ui:widget": "hidden" },
         tap_schema: { "ui:widget": "hidden" },
         waveband: { "ui:widget": "hidden" },
       };

    if (selectedServices && loading){
      let catalogues = {};
      let counter = 1;
      let selectedServicesLength = selectedServices.length;
      selectedServices.forEach((access_url) => {

        let selectedService = access_url;
        let catalogueTitle = access_url;
        let tf_url = api_host + "query/get-tables-fields/?dataset_uri=vo_reg&access_url=" +  selectedService;
        axios
           .get(tf_url)
           .then((tfResponse) => {
               let jsond = tfResponse.data.results;
               let schemas = {};
               Object.keys(jsond).forEach(function(key) {
                   let table = {};
                   let fields_updated = {};
                   let metadata_couple = jsond[key].table_name.split(/[.]+/);
                   let schemaname = metadata_couple[0];
                   let tablename =  metadata_couple[1];
                   table["fields"] = {};
                   table["type"] = "table";
                   table["full_name"] = jsond[key]["table_name"];
                   let fields = jsond[key].fields;
                   Object.keys(fields).forEach(function(fieldkey) {
                       let fieldname = fields[fieldkey].name;
                       table["fields"][fieldname] = fields[fieldkey];
                   });

                   if (!(schemaname in schemas)) {
                       schemas[schemaname] = {};
                   }
                   schemas[schemaname][tablename] = table;
               });

               catalogues[catalogueTitle] = schemas;
               let metanew = metadata;
               metanew[catalogueTitle] = schemas;
               setMetadata(metanew);
                   if (counter >= selectedServicesLength){
                       setLoading(false);
                   }
               counter += 1;

          }).catch(error => {
              console.log(error);
          });

       });

    }
    return (
      <Container fluid>
        <Form
          schema={config.query_schema}
          ObjectFieldTemplate={formTemplate}
          formData={formData}
          onSubmit={({ formData }) => setFormData(formData)}
          {...uiSchemaProp}
        >
          <label className="control-label">Selected Services</label>
          <RBForm.Control as="select" className="selectedServices" multiple>
              {selectedServices.map((service) => {
                return <option key="{service}">{service}</option>;
              })}
          </RBForm.Control>


          <div className="metadata-tree">
            <label className="control-label">Service Metadata</label>

           { !loading ?
               <JSONTree data={metadata} theme={theme} invertTheme={true} hideRoot={true} />
            : <LoadingSpinner/> }

          </div>

          <div>
              <Button className="mt-3" type="submit">
                Query VO Resource
              </Button>
          </div>
        </Form>
        {selectedServices.map((service) => {
          const details = queryMap.get(service);
          return (
            <div key="{service}" className="mt-3">
              <VOServiceResults key="{service}" catalog={service} />
            </div>
          );
          })}
        </Container>
      );
    }
  } else {
    if (config){
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
            const details = queryMap.get(catalog);
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
                    <h4>List of VO Resources</h4>
                  </Col>
                  <Col>
                    {selectedServices.length === 0 ? (
                      <></>
                    ) : (
                      <Button
                        type="submit"
                        onClick={() => {
                          setQueryStep("run-query");
                        }}
                      >
                        Query selected VO Resources
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
     } else {
        return (<LoadingSpinner />);
    }
  }
}
