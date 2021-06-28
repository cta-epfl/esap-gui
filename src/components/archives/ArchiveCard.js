import React from "react";
import { Card, Button, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";

// display a single archive on a card
export default function ArchiveCard({ archive }) {
  return (
    <Card>

      <Card.Body>
        <Card.Title className="h2">{archive.name}</Card.Title>
          <Card className="card-description">
              <Card.Body>
                <Image
                  className="mx-auto d-block"
                  src={archive.thumbnail}
                  rounded
                  fluid
                />
                <Card.Title className="h3 pt-3">{archive.short_description}</Card.Title>
                <Card.Text className="text-justify">{archive.long_description}</Card.Text>
              </Card.Body>
          </Card>
        {/* <Container fluid>
          <Row>
            
            </Card>
          </Row>
          <Row className="p-2">
            
          </Row>
        </Container> */}
          <Button
              className="mt-3"
              as={NavLink}
              variant="outline-primary"
              to={`/archives/${archive.uri}`}
          >
              Visit {archive.name} Archives
          </Button>
      </Card.Body>
    </Card>
  );
}
