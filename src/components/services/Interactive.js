import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Form, Container } from "react-bootstrap";
import { IDAContext } from "../../contexts/IDAContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import "../../assets/Interactive.css";
import LoadingSpinner from "../LoadingSpinner";

export default  function Interactive() {

  const {idaSystemURL, setIdaSystemURL, workflowURL, setWorkflowURL, list_of_workflows, setList_of_workflows, list_of_idaSystems, setList_of_idaSystems} = useContext(IDAContext);
  const {api_host } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFacilities, setShowFacilities] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showSkip, setShowSkip] = useState(true);
  const [showBack, setShowBack] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const [showDeploy, setShowDeploy] = useState(false);
  const [numberOfitemsShown, setNumberOfitemsShown] = useState(3)
  const [loading, setLoading] = useState(true);
  const [defaultWorkflow] = "https://github.com/ESAP-WP5/binder-empty";

  const [advSearchFilters, setAdvSearchFilters] = useState({
    searchAuthorFilter: "",
    searchRuntimePlatformFilter: "",
    searchTypeFilter: ""
  });

  const [advSearchValues, setAdvSearchValues] = useState({
    searchAuthor: "",
    searchRuntimePlatform: "",
    searchType: ""
  });


  // Fetch Notebooks
  useEffect(() => {
      axios
      .get(api_host + "ida/workflows/search")
        .then((response) => {
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

  if (loading) {
    return (
      <Container className="ida" fluid>
         <h1>Interactive Analysis</h1>
    { !showFacilities ?

    <div className="workflow-div">
    <h2>Workflows</h2>
     </div>
    : null }
         <LoadingSpinner/>
      </Container>
    )

  }

  if ((!list_of_workflows) || (!list_of_idaSystems)) {
    return null;
  }

  const handleChange = event => {
    setSearchTerm(event.target.value);
    if (event.target.value===""){
        setNumberOfitemsShown(3);
        setShowMoreButton(true);
    } else {
        setNumberOfitemsShown(list_of_workflows.length);
        setShowMoreButton(false);
    }

  };

  let workflow_results = !searchTerm
        ?
          !showAdvanced
            ? list_of_workflows
	            : list_of_workflows.filter(workflow =>
                          ((typeof workflow.keywords === 'string') && workflow.keywords.toLowerCase().includes(advSearchFilters.searchTypeFilter.toLowerCase())) &&
                          ((typeof workflow.runtimePlatform === 'string') && workflow.runtimePlatform.toLowerCase().includes(advSearchFilters.searchRuntimePlatformFilter.toLowerCase())) &&
                          ((typeof workflow.author === 'string') && workflow.author.toLowerCase().includes(advSearchFilters.searchAuthorFilter.toLowerCase())))
        : list_of_workflows.filter(workflow =>
            ((typeof workflow.name === 'string') && workflow.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) ||
            ((typeof workflow.keywords === 'string') && workflow.keywords.toLowerCase().includes(searchTerm.toLocaleLowerCase())) ||
            ((typeof workflow.author === 'string') && workflow.author.toLowerCase().includes(searchTerm.toLocaleLowerCase())) ||
            ((typeof workflow.runtimePlatform === 'string') && workflow.runtimePlatform.toLowerCase().includes(searchTerm.toLocaleLowerCase())) ||
            ((typeof workflow.description === 'string') && workflow.description.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
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
    setAdvSearchValues({"searchType": "", "searchAuthor" : "", "searchRuntimePlatform" : ""});
    setAdvSearchFilters({"searchTypeFilter": "", "searchAuthorFilter" : "", "searchRuntimePlatformFilter" : ""});

  };

  const onClickAdvanced = e => {
    e.preventDefault();
    if (showAdvanced) {
        setShowAdvanced(false);
    } else {
        setShowAdvanced(true);
    }
  }

  const onClickAdvancedSearch = e => {
    e.preventDefault();
    setAdvSearchFilters({"searchTypeFilter": advSearchValues.searchType, "searchAuthorFilter" : advSearchValues.searchAuthor, "searchRuntimePlatformFilter" : advSearchValues.searchRuntimePlatform});
    setShowAdvanced(true);
  }

  const handleRecordTypeChange = e => {
    e.preventDefault();
    setAdvSearchValues({"searchType": e.target.value, "searchAuthor" :  advSearchValues.searchAuthor, "searchRuntimePlatform" : advSearchValues.searchRuntimePlatform});
  }

  const handleRecordAuthorChange = e => {
    e.preventDefault();
    setAdvSearchValues({"searchType": advSearchValues.searchType, "searchAuthor" : e.target.value, "searchRuntimePlatform" : advSearchValues.searchRuntimePlatform});
  }

  const handleRuntimePlatformChange = e => {
    e.preventDefault();
    setAdvSearchValues({"searchType": advSearchValues.searchType, "searchAuthor" : advSearchValues.searchAuthor, "searchRuntimePlatform" : e.target.value});
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
    setAdvSearchValues({"searchType": "", "searchAuthor" : "", "searchRuntimePlatform" : ""});
    setAdvSearchFilters({"searchTypeFilter": "", "searchAuthorFilter" : "", "searchRuntimePlatformFilter" : ""});

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

    <div className="workflow-div">
    <h2>Workflows</h2>

    <Form className="mt-5">

      <div className="search-buttons">

      <input
        className="search-large"
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
      <a href="#" onClick={onClickAdvanced}>Advanced Search</a>
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
                      <select className="form-select advanced-float-right" aria-label="record-type" id="record-type" name="record-type" onChange={handleRecordTypeChange}>
                          <option value="">All</option>
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
                        onChange={handleRecordAuthorChange}
                      />

                  </div>
              </li>
              <li>
                  <div className="advanced-form-div"><label>Runtime Platform:</label>
                      <select className="form-select advanced-float-right" aria-label="record-type" id="record-type" name="record-type" onChange={handleRuntimePlatformChange}>
                          <option value="">All</option>
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



      <ul className="workflow-ul">
         {workflow_results_sliced.map(item => (
          <li className="workflow-li">
             <label className="container workflow-checkbox"><input type="radio" name="workflow" onChange={setWorkflow} value={item.url} />  <span className="checkmark"></span></label><h5>{item.name}</h5><br/>
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

    <div className="facility-div">
    <h2>Compute Facilities</h2>

    <Form className="mt-5">

    <div className="search-buttons">

     <input
        className="search-large"
        type="text"
        placeholder="Search for Facilities"
        value={searchTerm}
        onChange={handleChange}
      />

      <div className="deploy-buttons">

      { showBack ?
        <Button className="back-button"  onClick={onClickBack}>&#171;</Button>
         : null }


      { showDeploy ?
         <Button className="deploy-button" href={api_host + "ida/deploy?facility=" + idaSystemURL + "&workflow=" + workflowURL} target="_blank">Deploy</Button>
         : null }

      </div>

      </div>

      <ul className="facility-ul">
         {facility_results.map(item => (
          <li className="facility-li">
             <label className="container facility-checkbox"><input className="radio" onChange={setFacility} name="facility" type="radio" value={item.url} />  <span className="checkmark"></span></label><h5>{item.name}</h5><br/>
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
