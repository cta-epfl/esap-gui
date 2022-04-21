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

   const onClickMonitorJob = e => {
     e.preventDefault();
     setShowSubmit(false);
     setShowMonitor(true);
   }

   const onClickSubmitJob = e => {
     e.preventDefault();
     setShowMonitor(false);
     setShowSubmit(true);
   }

   const onClickFindJob = e => {
     e.preventDefault();
     setShowMonitor(true)
     setShowSubmit(false);
     setShowJobStatus(true);
   }


   const handleJobIDChange = e => {
     e.preventDefault();
     setJobValues({"jobID" : e.target.value});
   }

   const [ jobValues, setJobValues] = useState({
     jobID: ""
   });
 

  return (


    <Container className="batch" fluid>

    <h1>Batch Analysis</h1>

    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
       <br/><br/>
       <br/><br/>
       <Button onClick={onClickMonitorJob} className="search-button">Monitor Batch Jobs</Button>
       <Button onClick={onClickSubmitJob} className="search-button">Submit Batch Jobs </Button>
       <br/><br/>
       <br/><br/>
       <br/><br/>
    </div>

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
