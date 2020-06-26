import React from "react";
import { Card, Container, Row, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

// display a single archive on a card
export default function ArchiveCard({ archive }) {
  return (
    <Card className="card-description">
      <Card.Body>
        <h2>{archive.name}</h2>
        <Container fluid>
          <Row>
            <Card className="card-description">
              <Card.Body>
                <img
                  src={archive.thumbnail}
                  alt=""
                  height={200}
                  width={300}
                  className="img-fluid float-left float-sm-right float-md-left float-lg- 
                  right float-xl-left pr-4"
                />
                <h4>{archive.short_description}</h4>
                <p>{archive.long_description}</p>
              </Card.Body>
            </Card>
          </Row>
          <Row className="p-2">
            <Button
              as={NavLink}
              variant="outline-info"
              to={`/archives/${archive.uri}`}
            >
              Visit {archive.name} Archives
            </Button>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
}
