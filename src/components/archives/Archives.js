import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ArchiveCard from "./ArchiveCard";
import { GlobalContext } from "../../contexts/GlobalContext";

export function Archives() {
  const { archives } = useContext(GlobalContext);
  if (!archives) return null;

  console.log("archives: ", { archives });
  return (
    <Container fluid>
      <Row>
      {archives.map((archive) => {
        let key = "archive-" + archive.id;
        return <Col><ArchiveCard key={key} archive={archive} /></Col>;
      })}
      </Row>
    </Container>
  );
}
