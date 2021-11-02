import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import Form from "react-jsonschema-form";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BasketContextProvider } from "../../contexts/BasketContext"
import { QueryContext } from "../../contexts/QueryContext";
import QueryResults from "../services/query_results/QueryResults";
import parseQueryForm from "../../utils/form/parseQueryForm";

export default function QueryCatalogs() {
  // queryMap is a map of dictionaries, where each dictionary consists of
  // {"catalog": "catalogname",
  //  "catalogquery": "querystring",
  //  "status": "fetching|fechted",
  //  "results": null}
  const { config, setConfigName, defaultConf, queryMap, formData, setFormData } = useContext(QueryContext);
  const { api_host } = useContext(GlobalContext);
  const { uri } = useParams();
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
      case "esap_rucio":
        setConfigName("esap_rucio");
        break;
      case "esap_zenodo":
        setConfigName("esap_zenodo");
        break;
      case "astron_vo":
        setConfigName("astron_vo");
        break;
      case "lofar":
        setConfigName("lofar");
        break;
      case "ivoa":
        setConfigName("esap_ivoa");
        break;

      default:
        break;
    }

    return () => {
      console.log("cleaned up");
      queryMap.clear();
      setFormData();
      setConfigName(defaultConf);
    };
  }, [uri]);

  // load the GUI for this configuration
  useEffect(() => {
    console.log(config.query_schema);
    if (!formData) {
      return;
    }

    queryMap.clear();
    const gui = config.query_schema.name;

    const queries = parseQueryForm(gui, formData);
    queries.forEach((query) => {
      queryMap.set(query.catalog, {
        catalog: query.catalog,
        page: 1,
        esapquery: query.esapquery,
      });
    });

    queryMap.forEach((query) => {
      queryMap.set(query.catalog, {
        catalog: query.catalog,
        esapquery: query.esapquery,
        page: query.page,
        status: "fetching",
        results: null,
      });


     const url = renderQueryURL(uri, query)


      axios
        .get(url, {withCredentials: true})
        //.get(url)
        .then((queryResponse) => {
          queryMap.set(query.catalog, {
            catalog: query.catalog,
            esapquery: query.esapquery,
            page: query.page,
            status: "fetched",
            results: queryResponse.data,
          });
        })
        .catch(() => {
          queryMap.set(query.catalog, {
            catalog: query.catalog,
            esapquery: query.esapquery,
            page: query.page,
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

  function renderUIschema(config) {
    switch(config.query_schema.name) {
      case 'apertif':
        return config.ui_schema ? { uiSchema: config.ui_schema } : {} ;
        // renderApertifUIschema(config.ui_schema);
      default:
        return config.ui_schema ? { uiSchema: config.ui_schema } : {}
    }
  }

 function renderQueryURL(uri, query) {
    switch(uri) {
      case 'ivoa':
        return api_host + "query/" + query.esapquery
      default:
        return api_host + "query/query/?" + query.esapquery
    }
  }

  const uiSchemaProp = renderUIschema(config);
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
            <QueryResults catalog={catalog} />
          </div>
        );
      })}
    </Container>
  );
}
