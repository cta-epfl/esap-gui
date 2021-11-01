import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Button, Row, Col, Form as RBForm } from "react-bootstrap";
import Form from "react-jsonschema-form";
import { GlobalContext } from "../../contexts/GlobalContext";
import { QueryContext } from "../../contexts/QueryContext";
import parseQueryForm from "../../utils/form/parseQueryForm";
import { MAQContext,
    QUERY_FORM,
    CREATE_QUERIES,
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
import LoadingSpinner from "../LoadingSpinner";

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


    // call to the ESAP API 'create-query' endpoint to construct a query based on esap common parameters
    function fetchCreateQueries() {

        if (!formData) return;

        const query_schema_name = config.query_schema.name;

        let queries = [];
        let archive_queries = []

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
                    setStatus(FETCHING_CREATE_QUERY)
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
        // WARNING: this happens before the '.then' promise is solved.
        setArchiveQueries(archive_queries)
    }

    // call to the ESAP API 'query' endpoint
    function fetchRunQueries() {
        let query_results = []

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
        // WARNING: this happens before the '.then' promise is solved.
        setQueryResults(query_results)

        console.log('status = '+status)
    }

    // set ConfigName for multi_archive query

    useEffect(() => {
        setConfigName("multiple_archives");
      return () => {
        console.log("cleaned up");
        //queryMap.clear();
        setFormData();
        setConfigName(defaultConf);
      };
    }, []);


    // execute when the form
    useEffect(() => {

        if (status === CREATE_QUERIES) {
            fetchCreateQueries()
        }

        if (status === RUN_SELECTED_QUERIES) {
            fetchRunQueries()
        }

    }, [queryStep, formData]);


    // this function is executed when the 'Create Queries' button is clicked
    function handleCreateQueries() {
        setStatus(CREATE_QUERIES)
        console.log('handleCreateQueries: status = '+status)
        setQueryStep('create-query')
    }

    // this function is executed when the 'Run Queries' button is clicked
    function handleRunQueries() {
        setStatus(RUN_SELECTED_QUERIES)
        console.log('handleRunQueries: status = '+status)
        setQueryStep('run-query')
    }

    // submit the form, and create the queries based on the parameters
    function submitFormData(formData) {
        setFormData(formData)

        setStatus(CREATE_QUERIES)
        setQueryStep('create-query')
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

    // RENDER
    if (!config) return <LoadingSpinner />

    // load the GUI for this configuration
    const uiSchemaProp = config.ui_schema ? { uiSchema: config.ui_schema } : {};

    // the logic to construct the GUI
    let renderCreateQueryButton = <Button type="submit" onClick={() => {handleCreateQueries();}}>{getQueryIcon()} Create Queries</Button>

    let renderRunQueryButton
    if (status === QUERIES_SELECTED) {
        renderRunQueryButton= <Button type="submit" onClick={() => {handleRunQueries();}}> Run Queries </Button>
    }

    let renderCreateQueryResults
    if (status === FETCHING_CREATE_QUERY) {
        renderCreateQueryResults = <LoadingSpinner />;
    }
    if (status === FETCHED_CREATE_QUERY || status === QUERIES_SELECTED) {
        renderCreateQueryResults = <CreateMultiQueryResults results={archiveQueries} />
    }

    let renderQueryResults
    if (status === FETCHING_SELECTED_QUERIES) {
        renderQueryResults = <LoadingSpinner />;
    }
    if (status === FETCHED_SELECTED_QUERIES) {
        renderQueryResults = <RunMultiQueryResults results={queryResults} />
    }

    return (
      <Container fluid>

            <Form
              schema={config.query_schema}
              ObjectFieldTemplate={myObjectFieldTemplate}
              formData={formData}
              onSubmit={({ formData }) => submitFormData(formData)}
              {...uiSchemaProp}
            >

        </Form>
          {renderCreateQueryButton}&nbsp;
          {renderRunQueryButton}
          {renderCreateQueryResults}
          {renderQueryResults}
      </Container>
    );

}
