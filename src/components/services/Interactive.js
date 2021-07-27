import React, { useContext } from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";
import { IDAContext } from "../../contexts/IDAContext";
import { GlobalContext } from "../../contexts/GlobalContext";


export default  function Interactive() {
  const { idaSystemURL, setIdaSystemURL, jnotebookURL, setJnotebookURL, batchsystemsURL, setBatchsystemsURL, list_of_jnotebooks, setList_of_jnotebooks, list_of_idaSystems, setList_of_idaSystems} = useContext(IDAContext);
  const { api_host } = useContext(GlobalContext);

  let list_of_batchsystems = [
    {"name" : "DIRAC EGI (LOFAR, KM3Net)", "url" : "https://dirac.egi.eu"},
    {"name" : "CTA DIRAC", "url" : "https://ccdcta-web.in2p3.fr/DIRAC/"},
  ]

  if ((!list_of_jnotebooks) || (!list_of_idaSystems) || (!list_of_batchsystems)) {
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
        (event) => setIdaSystemURL(list_of_idaSystems.find((item) => item.name === event.target.value).url)
        }>
        <Form.Label>
          <h3>Select ESCAPE Interactive Data Analysis Services</h3>
        </Form.Label>
        <Form.Control className="mt-1" as="select">
          {list_of_idaSystems.map((option) => <option>{option.name}</option>)}
        </Form.Control>
      </Form.Group>
    </Form>

    <Button href={api_host + "ida/deploy?facility=" + idaSystemURL + "&workflow=" + jnotebookURL} target="_blank">Deploy</Button>

  </Container>
  );
}
