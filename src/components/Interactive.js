import React from "react";
import { Alert } from "react-bootstrap";

export default function Interactive() {
  return (
    // <div class="embed-responsive embed-responsive-16by9">
    //   <iframe
    //     class="embed-responsive-item"
    //     src="http://130.246.212.44/escape/"
    //     allowfullscreen
    //   ></iframe>
    // </div>
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
