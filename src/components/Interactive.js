import React, { useContext } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { IDAContext } from "../contexts/IDAContext";

export default function Interactive() {
  const { jhubURL, setJhubURL } = useContext(IDAContext);

  let list_of_jhubs = [
    {"name" : "SKAO JupyterHub", "url" : "https://srcdev.skatelescope.org/escape"},
    {"name" : "ASTRON JupyterHub", "url" : "https://sdc.astron.nl/hub/"},
    {"name" : "IFAE-PIC JupyterHub", "url" : "https://jupyter.pic.es" },]

  
  return (
    <Container fluid>
    <Form className="mt-3">
      <Form.Group controlId="jhub" onChange={
        (event) => setJhubURL(list_of_jhubs.find((item) => item.name === event.target.value).url)
        }>
        <Form.Label>Select JupyterHub Services</Form.Label>
        <Form.Control className="mt-3" as="select">
          {list_of_jhubs.map((option) => <option>{option.name}</option>)}
        </Form.Control>
      </Form.Group>
      <Button href={jhubURL} target="_blank">Launch</Button>
    </Form>
  </Container>
  );
}
