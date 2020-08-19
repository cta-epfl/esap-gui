import React from "react";
import { Alert } from "react-bootstrap";

export default function Rucio() {
  return (
    <Alert variant="warning">
      <p>You will leave ESAP GUI and be redirected to</p>
      <a target="_blank" href="https://escape-dios-dl.cern.ch/ui/">
        Rucio Web UI
      </a>
    </Alert>
  );
}
