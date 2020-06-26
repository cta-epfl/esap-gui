import React, { useContext } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import ArchiveCard from "./ArchiveCard";
import { GlobalContext } from "../../contexts/GlobalContext";

export function Archives() {
  const { archives } = useContext(GlobalContext);
  if (!archives) return null;

  console.log("archives: ", { archives });
  return (
    <Card>
      <Card.Body>
        <Container fluid>
          <Row>
            {archives.map((archive) => {
              let key = "archive-" + archive.id;
              return (
                <Col key={key} sm={1} md={3} lg={6}>
                  <ArchiveCard archive={archive} />
                </Col>
              );
            })}
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
}
