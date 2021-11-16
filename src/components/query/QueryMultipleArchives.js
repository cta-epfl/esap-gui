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
    PREPARE_QUERIES,
    PREPARED_QUERIES,
    RUN_SELECTED_QUERIES,
    FETCHING_SELECTED_QUERIES,
    FETCHED_SELECTED_QUERIES,
    ERROR_FETCHING_QUERY } from "../../contexts/MAQContext";

import AvailableDatasets from "../services/query_results/AvailableDatasets";
import RunMultiQueryResults from "../services/query_results/RunMultiQueryResults";
import { getQueryIcon } from "../../utils/styling";
import LoadingSpinner from "../LoadingSpinner";

export default function QueryMultipleArchives() {

    const { api_host, datasets, getDataset } = useContext(GlobalContext);
    const { config, setConfigName, defaultConf, formData, setFormData } = useContext(QueryContext);
    const {
        queryStep, setQueryStep,
        selectedDatasets, setSelectedDatasets,
        availableDatasets, setAvailableDatasets,
        selectedQueries, setSelectedQueries,
        queryResults, setQueryResults,
        status, setStatus } = useContext(MAQContext);

    const maqContext = useContext(MAQContext);


    // read from the config object which datasets should be queried
    function prepareQueries(config) {
        //alert('prepareQueries')
        if (!config) return null

        // list of dataset uri's from the backend
        if (config.datasets_enabled) {

            // convert the list of uri's to a list of available datasets which have all their properties
            // nv: 16nov2021, although this works and shows pretty names, it is noticably slow
            //     when users click checkboxes.
            //available_datasets.forEach((available_dataset) => {
            //    let dataset = getDataset(available_dataset)[0]
            //    available.push(dataset)
            //})

            // setSelectedDatasets(available)
            // setAvailableDatasets(available)

            // faster option
            setSelectedDatasets(config.datasets_enabled)
            setAvailableDatasets(config.datasets_enabled)

            setStatus(PREPARED_QUERIES)
        }
    }

    // call to the ESAP API 'query' endpoint
    function fetchRunQueries() {

        let query_results = []

        const query_schema_name = config.query_schema.name;
        let base_query = parseQueryForm(query_schema_name, formData);

        // create a list of queries based on the filled in form
        selectedDatasets.forEach((dataset) => {
            // add archive and collection parameters
            //let url = api_host + "query/query?" + "" +
            //"&collection=" + query.result.collection +
            //    "&level=" + query.result.level +
            //    "&category=" + query.result.category

            // construct the url
            let url = api_host + "query/query?dataset_uri=" + dataset.dataset + '&' + base_query

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

        if (status === PREPARE_QUERIES) {
            prepareQueries(config)
        }

        if (status === RUN_SELECTED_QUERIES) {
            fetchRunQueries()
        }

    }, [queryStep, formData]);

    // executed when the 'Run Queries' button is clicked
    function handleRunQueriesButton(formData) {
        setFormData(formData)
        setStatus(RUN_SELECTED_QUERIES)
        console.log('handleRunQueries: status = '+status)
        setQueryStep('run-query')
    }

    // texecuted when the 'Run Queries' button is clicked
    function handleResolveNameButton() {
        alert(formData.target)
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

    if (status === PREPARE_QUERIES) {
        prepareQueries(config)
    }


    // load the GUI for this configuration
    const uiSchemaProp = config.ui_schema ? { uiSchema: config.ui_schema } : {};

    // This is the 'conditional rendering' logic to construct the GUI based on the current status

    let renderResolveNameButton
    if (formData) {
        renderResolveNameButton = <Button onClick={() => {
            handleResolveNameButton()
        }}>{getQueryIcon()} Resolve Target</Button>
    }

    // only render the 'Run Queries' button when one or more queries are selected
    let renderRunQueryButton= <Button type="submit" >{getQueryIcon()} Run Queries</Button>

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

            <AvailableDatasets results={availableDatasets}/>
            <Form
              schema={config.query_schema}
              ObjectFieldTemplate={myObjectFieldTemplate}
              formData={formData}
              onSubmit={({ formData }) => handleRunQueriesButton(formData)}
              {...uiSchemaProp}

            >
                {renderRunQueryButton}
            </Form>

            {renderQueryResults}

        </Container>
    );

}
