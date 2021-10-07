import React, { useContext } from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";
import { IDAContext } from "../../contexts/IDAContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import "../../assets/Interactive.css";


export default  function Interactive() {
  const { idaSystemURL, setIdaSystemURL, workflowURL, setWorkflowURL, batchsystemsURL, setBatchsystemsURL, list_of_workflows, setList_of_workflows, list_of_idaSystems, setList_of_idaSystems} = useContext(IDAContext);
  const { api_host } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showFacilities, setShowFacilities] = React.useState(false);
  const [showNext, setShowNext] = React.useState(false);
  const [showDeploy, setShowDeploy] = React.useState(false);

  let list_of_batchsystems = [
    {"name" : "DIRAC EGI (LOFAR, KM3Net)", "url" : "https://dirac.egi.eu"},
    {"name" : "CTA DIRAC", "url" : "https://ccdcta-web.in2p3.fr/DIRAC/"},
  ]

  if ((!list_of_workflows) || (!list_of_idaSystems) || (!list_of_batchsystems)) {
    return null
  }

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const workflow_results = !searchTerm
        ? list_of_workflows
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
  };

  const setFacility = event => {
    setIdaSystemURL(event.target.value);
    setShowDeploy(true)
  };

  const onClickNext = e => {
    e.preventDefault();
    setSearchTerm("")
    setShowFacilities(true);
  };




  return (
    <Container fluid>

    <h1>Interactive Analysis</h1>

    { !showFacilities ?

    <div class="workflow-div">
    <h2>Workflows</h2>

    <Form className="mt-5">

      <input
        type="text"
        placeholder="Search for Workflows"
        value={searchTerm}
        onChange={handleChange}
      />


      { showNext ?
        <Button className="next-button"  onClick={onClickNext}>Next</Button>
         : null }

      <ul class="workflow-ul">
         {workflow_results.map(item => (
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


    </Form>

    </div>

    : null }




    { showFacilities ?

    <div class="facility-div">
    <h2>Compute Facilities</h2>

    <Form className="mt-5">

     <input
        type="text"
        placeholder="Search for Facilities"
        value={searchTerm}
        onChange={handleChange}
      />

      { showDeploy ?
         <Button className="next-button" href={api_host + "ida/deploy?facility=" + idaSystemURL + "&workflow=" + workflowURL} target="_blank">Deploy</Button>
         : null }


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
