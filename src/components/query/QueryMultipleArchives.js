import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Button, Row, Col, Form as RBForm } from "react-bootstrap";
import Form from "react-jsonschema-form";
import { GlobalContext } from "../../contexts/GlobalContext";
import { QueryContext } from "../../contexts/QueryContext";
import parseQueryForm from "../../utils/form/parseQueryForm";
import { MAQContext,
    CREATE_QUERY_PARAMS,
    QUERIES_SELECTED,
    FETCHING_CREATE_QUERY,
    FETCHED_CREATE_QUERY,
    RUN_SELECTED_QUERIES,
    FETCHING_SELECTED_QUERIES,
    FETCHED_SELECTED_QUERIES,
    ERROR_FETCHING_QUERY } from "../../contexts/MAQContext";

import CreateMultiQueryResults from "../services/query_results/CreateMultiQueryResults";
import RunMultiQueryResults from "../services/query_results/RunMultiQueryResults";
import { getQueryIcon } from "../../utils/styling";


export default function QueryMultipleArchives() {

    const { api_host } = useContext(GlobalContext);
    const { config, setConfigName, defaultConf, formData, setFormData } = useContext(QueryContext);
    const {
        selectedArchives, setSelectedArchives,
        queryStep, setQueryStep,
        archiveQueries, setArchiveQueries,
        selectedQueries,
        queryResults, setQueryResults,
        status, setStatus } = useContext(MAQContext);
    const maqContext = useContext(MAQContext);

    // set ConfigName for archive
    useEffect(() => {
        setConfigName("multiple_archives");
      return () => {
        console.log("cleaned up");
        //queryMap.clear();
        setFormData();
        setConfigName(defaultConf);
      };
    }, []);

    // load the GUI for this configuration
    // should useEffect be used at all? Shouldn't this code just be in the body of the function?

    useEffect(() => {
        console.log("query schema:", config.query_schema);
        if (!formData) return;
        console.log("formData:", formData);

        const query_schema_name = config.query_schema.name;
        let queries = [];
        let archive_queries = []

        if (status === CREATE_QUERY_PARAMS) {

            // create a list of queries based on the filled in form
            queries = parseQueryForm(query_schema_name, formData);

            console.log("queries:", queries);

            // iterate through the query per archive
            queries.forEach((query) => {

                let url = api_host + "query/create-query?" + query.esap_query;

                setStatus(FETCHING_CREATE_QUERY)
                console.log('status = '+status)

                axios
                    .get(url)
                    .then((response) => {
                        // the 'create-query' call will return an archive specific query for each of the
                        // defined 'esap datasets' within that 'esap archive'

                        let dataset_queries = response.data.query_input
                        dataset_queries.forEach((dataset_query) => {

                            dataset_query['archive'] = query.archive
                            archive_queries.push(dataset_query)

                        })

                        setStatus(FETCHED_CREATE_QUERY)
                        // WARNING: status does not get updated here, why?
                        //alert('fetched query: status = '+status)

                        // q: how do I trigger a render after this

                    })
                    .catch((error) => {
                        alert(error)

                    });
            });

            // push all the gathered archive_queries to the central store
            alert('fetched all create-queries: status = '+status)
            // WARNING: this happens before the '.then' promise is solved.
            setArchiveQueries(archive_queries)
        }

        let query_results = []
        if (status === RUN_SELECTED_QUERIES) {

            selectedQueries.forEach((query) => {

                let dataset_query = query.result.query

                // cut off the service_url and only leave the query part
                if (dataset_query.includes('&QUERY=')) {
                    dataset_query = query.result.query.split('&QUERY=')[1]
                }

                let url = api_host + "query/query?archive_uri=" + query.result.archive + "&collection=" + query.result.collection

                setStatus(FETCHING_SELECTED_QUERIES)
                console.log('status = '+status)

                axios
                    .get(url)
                    .then((response) => {

                        let results = response.data.results

                        results.forEach((result) => {
                            query_results.push(result)

                        })

                        setStatus(FETCHED_SELECTED_QUERIES)
                        // WARNING: status does not get updated here, why?
                        //alert('fetched selected query: status = '+status)

                        // q: how do I trigger a render after this

                    })
                    .catch((error) => {
                        alert(error)

                    });
            })

            // push all the gathered archive_queries to the central store
            alert('ran and fetched all queries: status = '+status)
            // WARNING: this happens before the '.then' promise is solved.
            setQueryResults(query_results)

            console.log('status = '+status)
        }

        //alert('archiveQueries: ',archiveQueries)
    }, [queryStep, formData]);

    // this function is executed when the 'Create Queries' button is clicked
    function handleCreateQueries() {
        setStatus(CREATE_QUERY_PARAMS)
        console.log('handleCreateQueries: status = '+status)
        setQueryStep('create-query')
    }

    // this function is executed when the 'Run Queries' button is clicked
    function handleRunQueries() {
        setStatus(RUN_SELECTED_QUERIES)
        console.log('handleRunQueries: status = '+status)
        setQueryStep('run-query')
    }

    // https://react-jsonschema-form.readthedocs.io/en/latest/advanced-customization/custom-templates/#objectfieldtemplate
    function myObjectFieldTemplate({ TitleField, properties, title, description }) {
    return (
      <div>
        <TitleField title={title} />
        <div className="row">
          {properties.map((prop) => (
            <div className="col-lg-2 col-md-4 col-sm-6 col-xs-12" key={prop.content.key}>
              {prop.content}
            </div>
          ))}
        </div>
        {description}
      </div>
    )}

    const uiSchemaProp = config.ui_schema ? { uiSchema: config.ui_schema } : {};
    console.log("Form Data:", formData);

    // the logic to construct the GUI
    let renderCreateQueryButton
    //if (status === CREATE_QUERY_PARAMS) {
        renderCreateQueryButton = <Button type="submit" onClick={() => {handleCreateQueries();}}>{getQueryIcon()} Create Queries</Button>
    //}

    let renderRunQueryButton
    if (status === QUERIES_SELECTED) {
        renderRunQueryButton= <Button type="submit" onClick={() => {handleRunQueries();}}> Run Queries </Button>
    }

    let renderCreateQueryResults
    if (status === FETCHED_CREATE_QUERY || status === QUERIES_SELECTED) {
        renderCreateQueryResults = <CreateMultiQueryResults results={archiveQueries} />
    }

    let renderQueryResults
    if (status === FETCHED_SELECTED_QUERIES) {
        renderQueryResults = <RunMultiQueryResults results={queryResults} />
    }

    return (
      <Container fluid>
          <h2>Status - {status}</h2>
            <Form
              schema={config.query_schema}
              ObjectFieldTemplate={myObjectFieldTemplate}
              formData={formData}
              onSubmit={({ formData }) => setFormData(formData)}
              {...uiSchemaProp}
            >
            {renderCreateQueryButton}&nbsp;
            {renderRunQueryButton}
        </Form>
          {renderCreateQueryResults}
          {renderQueryResults}
      </Container>
    );

}
