import React, { useContext } from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";
import { IDAContext } from "../../contexts/IDAContext";
import { GlobalContext } from "../../contexts/GlobalContext";


export default  function Interactive() {
  const { jhubURL, setJhubURL, jnotebookURL, setJnotebookURL, batchsystemsURL, setBatchsystemsURL, list_of_jnotebooks, setList_of_jnotebooks, list_of_jhubs, setList_of_jhubs} = useContext(IDAContext);
  const { api_host } = useContext(GlobalContext);

  let list_of_batchsystems = [
    {"name" : "DIRAC EGI (LOFAR, KM3Net)", "url" : "https://dirac.egi.eu"},
    {"name" : "CTA DIRAC", "url" : "https://ccdcta-web.in2p3.fr/DIRAC/"},
  ]

  if ((!list_of_jnotebooks) || (!list_of_jhubs) || (!list_of_batchsystems)) {
    return null
  }

  return (
    <Container fluid>
    <Form className="mt-5">
      <Form.Group controlId="jnotebook" onChange={
        (event) => setJnotebookURL(list_of_jnotebooks.find((item) => item.name === event.target.value).url)
        }>
        <Form.Label>
            <h3>Select ESCAPE ESFRI Jupyter Workflows (Notebooks)</h3>
        </Form.Label>
        <Form.Control className="mt-1" as="select">
          {list_of_jnotebooks.map((option) => <option>{option.name}</option>)}
        </Form.Control>
      </Form.Group>
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
    </Form>
    
    <Button href={api_host + "ida/deploy?facility=" + jhubURL + "&workflow=" + jnotebookURL} target="_blank">Deploy</Button>

  </Container>
  );
}
