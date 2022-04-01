import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Form, Container, Alert } from "react-bootstrap";
import { IDAContext } from "../../contexts/IDAContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import "../../assets/Interactive.css";
import LoadingSpinner from "../LoadingSpinner";

export default  function Interactive() {

  const {idaSystemURL, setIdaSystemURL, workflowURL, setWorkflowURL, batchsystemsURL, setBatchsystemsURL, list_of_workflows, setList_of_workflows, list_of_idaSystems, setList_of_idaSystems} = useContext(IDAContext);
  const {api_host } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchType, setSearchType] = React.useState("");
  const [searchTypeFilter, setSearchTypeFilter] = React.useState("");
  const [searchAuthor, setSearchAuthor] = React.useState("");
  const [searchAuthorFilter, setSearchAuthorFilter] = React.useState("");
  const [searchPlatform, setSearchPlatform] = React.useState("");
  const [searchPlatformFilter, setSearchPlatformFilter] = React.useState("");
  const [showFacilities, setShowFacilities] = React.useState(false);
  const [showNext, setShowNext] = React.useState(false);
  const [showSkip, setShowSkip] = React.useState(true);
  const [showBack, setShowBack] = React.useState(false);
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [advancedClicked, setAdvancedClicked] = React.useState(false);
  const [showMoreButton, setShowMoreButton] = React.useState(true);
  const [showDeploy, setShowDeploy] = React.useState(false);
  const [numberOfitemsShown, setNumberOfitemsShown] = React.useState(3)
  const [loading, setLoading] = React.useState(true);
  const [defaultWorkflow] = ["https://github.com/ESAP-WP5/binder-empty"];

    // Fetch Notebooks
    useEffect(() => {
      axios
      .get(api_host + "ida/workflows/search")
        .then((response) => {
          console.log(response);
          setList_of_workflows(response.data.results);
          setWorkflowURL(defaultWorkflow);
          setLoading(false);
        });
    }, [api_host]);


    // Fetch JHubs
    useEffect(() => {
      axios
      .get(api_host + "ida/facilities/search")
        .then((response) => {
          setList_of_idaSystems(response.data.results);
          setIdaSystemURL(response.data.results[0].url);
        });
    }, [api_host]);



  let list_of_batchsystems = [
    {"name" : "DIRAC EGI (LOFAR, KM3Net)", "url" : "https://dirac.egi.eu"},
    {"name" : "CTA DIRAC", "url" : "https://ccdcta-web.in2p3.fr/DIRAC/"},
  ]

  if (loading) {
    return (
      <Container className="ida" fluid>
         <h1>Interactive Analysis</h1>
    { !showFacilities ?

    <div class="workflow-div">
    <h2>Workflows</h2>
     </div>
    : null }
         <LoadingSpinner/>
      </Container>
    )

  }

  if ((!list_of_workflows) || (!list_of_idaSystems) || (!list_of_batchsystems)) {
    return null;
  }

  const handleChange = event => {
    setSearchTerm(event.target.value);
    if (event.target.value==""){
        setNumberOfitemsShown(3);
        setShowMoreButton(true);
    } else {
        setNumberOfitemsShown(list_of_workflows.length);
        setShowMoreButton(false);
    }

  };

  let workflow_results = !searchTerm
        ?
          !advancedClicked
            ? list_of_workflows
	            : list_of_workflows.filter(workflow =>
                          ((typeof workflow.keywords === 'string') && workflow.keywords.toLowerCase().includes(searchTypeFilter.toLocaleLowerCase())) &&
                          ((typeof workflow.runtimePlatform === 'string') && workflow.runtimePlatform.toLowerCase().includes(searchPlatformFilter.toLocaleLowerCase())) &&
                          ((typeof workflow.author === 'string') && workflow.author.toLowerCase().includes(searchAuthorFilter.toLocaleLowerCase())))
        : list_of_workflows.filter(workflow =>
            (typeof workflow.name === 'string') && workflow.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            (typeof workflow.keywords === 'string') && workflow.keywords.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            (typeof workflow.author === 'string') && workflow.author.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            (typeof workflow.runtimePlatform === 'string') && workflow.runtimePlatform.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            (typeof workflow.description === 'string') && workflow.description.toLowerCase().includes(searchTerm.toLocaleLowerCase())
         );


  const facility_results = !searchTerm
        ? list_of_idaSystems
        : list_of_idaSystems.filter(facility =>
            facility.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  const setWorkflow = event => {
    setWorkflowURL(event.target.value);
    setShowNext(true)
    setShowSkip(false)

  };

  const setFacility = event => {
    setIdaSystemURL(event.target.value);
    setShowDeploy(true);
  };

  const onClickNext = e => {
    e.preventDefault();
    setSearchTerm("");
    setShowFacilities(true);
    setShowBack(true);
    setAdvancedClicked(false);
    setSearchAuthor("");
    setSearchAuthorFilter("");
    setSearchPlatform("");
    setSearchPlatformFilter("");
    setSearchType("");
    setSearchTypeFilter("");
  };

  const onClickAdvanced = e => {
    e.preventDefault();
    if (showAdvanced) {
        setShowAdvanced(false);
    } else {
        setShowAdvanced(true);
    }
    setAdvancedClicked(false);
    setSearchAuthor("");
    setSearchAuthorFilter("");
    setSearchType("");
    setSearchTypeFilter("");
    setSearchPlatform("");
    setSearchPlatformFilter("");

  }

  const onClickAdvancedSearch = e => {
    e.preventDefault();
    if (searchType.toLowerCase()!="all") {
        setSearchTypeFilter(searchType.toLowerCase());
    }

    if (searchAuthor.toLowerCase()!="") {
        setSearchAuthorFilter(searchAuthor.toLowerCase());
    }

    if (searchAuthor.toLowerCase()!="all") {
        setSearchPlatformFilter(searchPlatform.toLowerCase());
    }

    setAdvancedClicked(true);
    setShowAdvanced(false);

  }

  const handleRecordTypeChange = e => {
    e.preventDefault();
    setSearchType(e.target.value);
  }

  const handleRecordAuthorChange = e => {
    e.preventDefault();
    setSearchAuthor(e.target.value);
  }

  const handlePlatformChange = e => {
    e.preventDefault();
    setSearchPlatform(e.target.value);
  }

  const onClickBack = e => {
    e.preventDefault();
    setSearchTerm("")
    setShowNext(false);
    setShowFacilities(false);
    setShowBack(true)
    setNumberOfitemsShown(3);
    setShowMoreButton(true);
    setShowSkip(true);
    setWorkflowURL(defaultWorkflow);
    setAdvancedClicked(false);
    setSearchAuthor("");
    setSearchAuthorFilter("");
    setSearchType("");
    setSearchTypeFilter("");
    setSearchPlatform("");
    setSearchPlatformFilter("");

  };

  const showMore = e => {
    e.preventDefault();
    if (numberOfitemsShown + 3 <= list_of_workflows.length) {
      setNumberOfitemsShown(numberOfitemsShown + 3);
    } else {
      setNumberOfitemsShown(list_of_workflows.length);
      setShowMoreButton(false);
    }
  }

  const workflow_results_sliced = workflow_results.slice(0, numberOfitemsShown)

  return (


    <Container className="ida" fluid>

    <h1>Interactive Analysis</h1>

    { !showFacilities ?

    <div class="workflow-div">
    <h2>Workflows</h2>

    <Form className="mt-5">

      <div class="search-buttons">

      <input
        className="workflow-search"
        type="text"
        placeholder="Search for Workflows"
        value={searchTerm}
        onChange={handleChange}
      />


      { showSkip ?
      <Button className="skip-button"  onClick={onClickNext}>Skip</Button>
         : null }

      { showNext ?
        <Button className="next-button"  onClick={onClickNext}>Next</Button>
         : null }
      <br/>
      <a href="" onClick={onClickAdvanced}>Advanced Search</a>
      <br/>

      { showAdvanced ?


      <div className="advanced-search">

      <Form className="advanced-form">

      <br/>

      <h3>Search By:</h3>
          <hr/>

          <ul className="advanced-form-ul">
              <li>
                  <div className="advanced-form-div"><label>User Interface type:</label>
                      <select class="form-select advanced-float-right" aria-label="record-type" id="record-type" name="record-type" onChange={handleRecordTypeChange}>
                          <option value="all">All</option>
                          <option value="desktop">Desktop Software</option>
                          <option value="cli">Command Line</option>
                          <option value="jupyter-notebook">Notebook</option>
                      </select>
                  </div>
              </li>
              <li>
                  <div className="advanced-form-div"><label>Author:</label>
                      <input
                        type="text"
                        className="advanced-float-right"
                        placeholder="Author name"
                        value={searchAuthor}
                        onChange={handleRecordAuthorChange}
                      />

                  </div>
              </li>
              <li>
                  <div className="advanced-form-div"><label>Runtime Platform:</label>
                      <select class="form-select advanced-float-right" aria-label="record-type" id="record-type" name="record-type" onChange={handlePlatformChange}>
                          <option value="all">All</option>
                          <option value="Python">Python</option>
                          <option value="R">R</option>
                          <option value="Java">Java</option>
                      </select>
                  </div>
              </li>

          </ul>

      <br/><br/>

      <Button onClick={onClickAdvancedSearch} className="search-button">Search</Button>
      <br/><br/>
      </Form>
      </div>

       : null }

      </div>



      <ul class="workflow-ul">
         {workflow_results_sliced.map(item => (
          <li class="workflow-li">
             <label class="container workflow-checkbox"><input type="radio" name="workflow" onChange={setWorkflow} value={item.url} />  <span class="checkmark"></span></label><h5>{item.name}</h5><br/>
             <span><b>Description: </b> <span dangerouslySetInnerHTML={{ __html: item.description }}></span></span><br/>
             <span><b>Link: </b> <a href="{item.url}">{item.url}</a></span><br/>
             <span><b>Author: </b>{item.author}</span><br/>
             <span><b>Runtime Platform: </b>{item.runtimePlatform}</span><br/>
             <span><b>Keywords: </b>{item.keywords}</span>

          </li>
        ))}
      </ul>


      { showMoreButton ?
         <Button className="more-button" onClick={showMore}>More</Button>
       : null }



    </Form>

    </div>

    : null }




    { showFacilities ?

    <div class="facility-div">
    <h2>Compute Facilities</h2>

    <Form className="mt-5">

    <div class="search-buttons">

     <input
        type="text"
        placeholder="Search for Facilities"
        value={searchTerm}
        onChange={handleChange}
      />

      <div class="deploy-buttons">

      { showBack ?
        <Button className="back-button"  onClick={onClickBack}>&#171;</Button>
         : null }


      { showDeploy ?
         <Button className="deploy-button" href={api_host + "ida/deploy?facility=" + idaSystemURL + "&workflow=" + workflowURL} target="_blank">Deploy</Button>
         : null }

      </div>

      </div>

      <ul class="facility-ul">
         {facility_results.map(item => (
          <li class="facility-li">
             <label class="container facility-checkbox"><input class="radio" onChange={setFacility} name="facility" type="radio" value={item.url} />  <span class="checkmark"></span></label><h5>{item.name}</h5><br/>
             <span><b>Description:</b><br/> {item.description}</span> <br/>
             <span><b>Link:</b> <a href="{item.url}">{item.url}</a></span>

          </li>
        ))}
      </ul>



    </Form>

    </div>

    : null }



  </Container>
  );
}
