import React, { useContext } from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";
import { IDAContext } from "../contexts/IDAContext";

export default function Interactive() {
  const { jhubURL, setJhubURL, jnotebookURL, setJnotebookURL, batchsystemsURL, setBatchsystemsURL } = useContext(IDAContext);

  let list_of_jnotebooks = [
    {"name" : "CSIC-IAA HCG-16 workflow", "url" : "https://mybinder.org/v2/gh/AMIGA-IAA/hcg-16/master"},
    {"name" : "CDS MOCPy", "url" : "https://mybinder.org/v2/gh/cds-astro/mocpy/master"},
    {"name" : "JIVE Jupyter CASA", "url": "https://mybinder.org/v2/gh/aardk/jupyter-casa/master"},
    {"name" : "ASTRON VO Apertif", "url" : "https://mybinder.org/v2/gh/zhengmeyer/first-binder.git/master"},]

  let list_of_jhubs = [
    {"name" : "SKAO JupyterHub", "url" : "https://srcdev.skatelescope.org/escape"},
    {"name" : "ASTRON JupyterHub", "url" : "https://sdc.astron.nl/hub/"},
    {"name" : "IFAE-PIC JupyterHub", "url" : "https://jupyter.pic.es" },
    {"name" : "CERN SWAN Service", "url" : "https://swan.cern.ch/"}]

  let list_of_batchsystems = [
    {"name" : "DIRAC EGI (LOFAR, KM3Net)", "url" : "https://dirac.egi.eu"},
    {"name" : "CTA DIRAC", "url" : "https://ccdcta-web.in2p3.fr/DIRAC/"},
  ]
  
  return (
    <Container fluid>
    <Form className="mt-5">
      <Form.Group controlId="jnotebook" onChange={
        (event) => setJnotebookURL(list_of_jnotebooks.find((item) => item.name === event.target.value).url)
        }>
        <Form.Label>
            <h3>Run ESCAPE ESFRI Jupyter Notebooks</h3>
        </Form.Label>
        <Form.Control className="mt-1" as="select">
          {list_of_jnotebooks.map((option) => <option>{option.name}</option>)}
        </Form.Control>
      </Form.Group>
      <Button href={jnotebookURL} target="_blank">Run selected notebook</Button>
    </Form>
    <Form className="mt-5">
      <Form.Group controlId="jhub" onChange={
        (event) => setJhubURL(list_of_jhubs.find((item) => item.name === event.target.value).url)
        }>
        <Form.Label>
          <h3>Select ESCAPE JupyterHub Services</h3>
        </Form.Label>
        <Form.Control className="mt-1" as="select">
          {list_of_jhubs.map((option) => <option>{option.name}</option>)}
        </Form.Control>
      </Form.Group>
      <Button href={jhubURL} target="_blank">Launch JupyterHub</Button>
    </Form>
    <Form className="mt-5">
      <Form.Group controlId="batchsystems" onChange={
        (event) => setBatchsystemsURL(list_of_batchsystems.find((item) => item.name === event.target.value).url)
        }>
        <Form.Label>
          <h3>Select HPC/HTC Services</h3>
        </Form.Label>
        <Form.Control className="mt-1" as="select">
          {list_of_batchsystems.map((option) => <option>{option.name}</option>)}
        </Form.Control>
      </Form.Group>
      <Button href={batchsystemsURL} target="_blank">Start HPC/HTC service</Button>
    </Form>
  </Container>
  );
}
