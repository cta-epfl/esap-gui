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

import CreateQueryResults from "../services/query_results/CreateQueryResults";
import { getQueryIcon } from "../../utils/styling";


export default function QueryMultipleArchives() {

    const { api_host } = useContext(GlobalContext);
    const { config, setConfigName, defaultConf, formData, setFormData } = useContext(QueryContext);
    const {
        selectedArchives, setSelectedArchives,
        queryStep, setQueryStep,
        archiveQueries, setArchiveQueries,
        selectedQueries,
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
                        alert('status = '+status)
                    })
                    .catch((error) => {
                        alert(error)

                    });
            });

            // push all the gathered archive_queries to the central store
            setArchiveQueries(archive_queries)

        }

        if (status === RUN_SELECTED_QUERIES) {
            alert('run queries')

            selectedQueries.forEach((query) => {
                alert(query.result.query)
            })

            setStatus(FETCHED_CREATE_QUERY)
            console.log('status = '+status)
        }

        //alert('archiveQueries: ',archiveQueries)
    }, [queryStep, formData]);

    // this function is executed when the 'Create Queries' button is clicked
    function handleCreateQueries() {
        setStatus(CREATE_QUERY_PARAMS)
        console.log('status = '+status)
        setQueryStep('create-query')
    }

    // this function is executed when the 'Run Queries' button is clicked
    function handleRunQueries() {
        setStatus(RUN_SELECTED_QUERIES)
        console.log('status = '+status)
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
        renderCreateQueryResults = <CreateQueryResults results={archiveQueries} />
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

      </Container>
    );

}
