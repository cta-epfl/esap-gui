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

   const onClickMonitorJob = e => {
     e.preventDefault();
     setShowMonitor(false);
     setShowSubmit(true);
   }

   const onClickSubmitJob = e => {
     e.preventDefault();
     setShowSubmit(false);
     setShowMonitor(true);
   }



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
Monitor
      </Form>
      </div>

     : null }

    { showSubmit ?

      <div className="advanced-search">
      <Form className="advanced-form">
Submit
      </Form>
      </div>

     : null }

  </Container>
  );
}
