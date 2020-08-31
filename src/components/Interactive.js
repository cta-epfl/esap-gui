import React from "react";
import { Alert } from "react-bootstrap";

export default function Interactive() {
  return (
    <Alert variant="warning">
      <p>You will leave ESAP GUI and be redirected to</p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://130.246.212.44/escape/"
      >
        Interactive analysis platform hosted by SKAO
      </a>
    </Alert>
  );
}
