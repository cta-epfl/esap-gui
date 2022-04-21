import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Form, Container } from "react-bootstrap";
import { BATCHContext } from "../../contexts/BATCHContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import "../../assets/Interactive.css";
import LoadingSpinner from "../LoadingSpinner";

export default  function Batch() {


   const [ showMonitor, setShowMonitor ] = useState(false);
   const [ showSubmit, setShowSubmit ] = useState(false);
   const [ showJobStatus, setShowJobStatus ] = useState(false);

   {/* Main Monitor Job Button */}
   const onClickMonitorJob = e => {
     e.preventDefault();
     setShowSubmit(false);
     setShowMonitor(true);
   }

   {/* Main Submit Job Button */}
   const onClickSubmitJob = e => {
     e.preventDefault();
     setShowMonitor(false);
     setShowSubmit(true);
   }

   {/* Find Job from Monitor page Button */}
   {/* TODO This will have to go off to the Async and create a ESAP worker job?? */}
   const onClickFindJob = e => {
     e.preventDefault();
     setShowMonitor(true)
     setShowSubmit(false);
     setShowJobStatus(true);
   }

   {/* Change handler for Monitor search */}
   const handleJobIDChange = e => {
     e.preventDefault();
     setJobValues({"jobID" : e.target.value});
   }

   {/* Values for Job Search */}
   const [ jobValues, setJobValues] = useState({
     jobID: ""
   });
 

  return (


    <Container className="batch" fluid>

    <h1>Batch Analysis</h1>

    {/* Buttons for Monitoring and Submission */}
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
       <br/><br/>
       <br/><br/>
       <Button onClick={onClickMonitorJob} className="search-button">Monitor Batch Jobs</Button>
       <Button onClick={onClickSubmitJob} className="search-button">Submit Batch Jobs </Button>
       <br/><br/>
       <br/><br/>
       <br/><br/>
    </div>

    {/* If Monitor button is pressed then show this part: */}
    { showMonitor ?

      <div className="advanced-search">
      <Form className="advanced-form">
         Input Job ID to find information on batch jobs:

       <br/><br/>

        <input
             type="text"
             className="advanced-float-left"
             placeholder="Job ID Number"
             onChange={handleJobIDChange}
         />

       <br/><br/>
         <Button onClick={onClickFindJob} className="search-button">Find Batch Jobs </Button>
       <br/><br/>

         {/* If find batch jobs button pressed do/show this:  */}
         {/* TODO This will be where the magic happens and information from Async is returned */}
         { showJobStatus ?
            <div className="advanced-search">
               Job ID: {jobValues.jobID}
               <br/>
               Job Status: Complete
            </div>
          : null }

       <br/><br/>
       <br/><br/>
       <br/><br/>
      </Form>
      </div>

     : null }

    {/* If Submit button is pressed then show this part: */}
    { showSubmit ?

      <div className="advanced-search">
      <Form className="advanced-form">
       <br/><br/>
         Batch Workflow Search will go here.
       <br/><br/>
       <br/><br/>
       <br/><br/>
      </Form>
      </div>

     : null }

  </Container>
  );
}
