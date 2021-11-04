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
        let archive_queries = []

        // create a list of queries based on the filled in form
        let queries = parseQueryForm(query_schema_name, formData);

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

                        // transfer some properties to the state for later use
                        dataset_query['archive'] = query.archive
                        dataset_query['esap_query'] = query.esap_query
                        archive_queries.push(dataset_query)

                    })

                    // update the object (and not just the contents) to trigger the rendering of all the results
                    const copy = archive_queries.slice(); // make a copy (new object)
                    setArchiveQueries(copy)

                    setStatus(FETCHED_CREATE_QUERY)

                })
                .catch((error) => {
                    alert(error)

                });
        });

    }

    // call to the ESAP API 'query' endpoint
    function fetchRunQueries() {
        let query_results = []
        // create a list of queries based on the filled in form
        //let queries = parseQueryForm(query_schema_name, formData);

        selectedQueries.forEach((query) => {

            let dataset_query = query.result.query

            // cut off the service_url and only leave the query part
            if (dataset_query.includes('&QUERY=')) {
                dataset_query = query.result.query.split('&QUERY=')[1]
            }

            // add archive and collection parameters
            let url = api_host + "query/query?" + "" +
                "&collection=" + query.result.collection +
                "&level=" + query.result.level +
                "&category=" + query.result.category

            // add the ESAP common parameters from the GUI
            url = url + '&' + query.result.esap_query
            setStatus(FETCHING_SELECTED_QUERIES)
            console.log('status = '+status)

            axios
                .get(url)
                .then((response) => {

                    let results = response.data.results

                    results.forEach((result) => {
                        query_results.push(result)
                    })

                    // update the object (and not just the contents) to trigger the rendering of all the results
                    const copy = query_results.slice(); // make a copy (new object)
                    setQueryResults(copy)
                    setStatus(FETCHED_SELECTED_QUERIES)

                })
                .catch((error) => {
                    alert(error)
                });
        })
    }

    // set ConfigName for multi_archive query, execute once
    useEffect(() => {
        setConfigName("multiple_archives");
      return () => {
        console.log("cleaned up");
        //queryMap.clear();
        setFormData();
        setConfigName(defaultConf);
      };
    }, []);


    // execute when the form parameters or the queryStep changes
    useEffect(() => {

        if (status === CREATE_QUERIES) {
            fetchCreateQueries()
        }

        if (status === RUN_SELECTED_QUERIES) {
            fetchRunQueries()
        }

    }, [queryStep, formData]);


    // executed when the 'Create Queries' button is clicked
    function handleCreateQueriesButton(formData) {
        setFormData(formData)
        setStatus(CREATE_QUERIES)
        setQueryStep('create-query')
    }

    // texecuted when the 'Run Queries' button is clicked
    function handleRunQueriesButton() {
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

    // RENDER
    if (!config) return <LoadingSpinner />

    // load the GUI for this configuration
    const uiSchemaProp = config.ui_schema ? { uiSchema: config.ui_schema } : {};

    // This is the 'conditional rendering' logic to construct the GUI based on the current status

    // always render the 'Create Queries' button
    let renderCreateQueryButton = <Button type="submit" >{getQueryIcon()} Create Queries</Button>

    // only render the 'Run Queries' button when one or more queries are selected
    let renderRunQueryButton
    if (status === QUERIES_SELECTED) {
        renderRunQueryButton= <Button type="submit" onClick={() => {handleRunQueriesButton();}}> Run Queries </Button>
    }

    // Render the selection of available queries when they are fetched, otherwise show a spinner
    let renderCreateQueryResults
    if (status === FETCHING_CREATE_QUERY) {
        renderCreateQueryResults = <LoadingSpinner />;
    }
    if (status === FETCHED_CREATE_QUERY || status === QUERIES_SELECTED) {
        renderCreateQueryResults = <CreateMultiQueryResults results={archiveQueries} />
    }

    // Render the query results when they are fetched, otherwise show a spinner
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
              onSubmit={({ formData }) => handleCreateQueriesButton(formData)}
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
