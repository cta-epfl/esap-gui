import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Container, Row, Col, Card, Table, Alert } from "react-bootstrap";
import DataProductCategories from "./DataProductCategories";

export default function ArchiveDetails(props) {
  const { uri } = useParams();
  console.log(uri);
  const { archives } = useContext(GlobalContext);
  if (!archives) return null;

  const archive = archives.find((archive) => archive.uri === uri);
  if (!archive) return <Alert variant="danger">No Archive found!</Alert>;
  console.log(archive);

  return (
    <div>
      <Container fluid>
        <Row>
          <h2 className="ml-3">Archive - {archive.name}</h2>
        </Row>

        <Row>
          <Col sm={3} md={3} lg={3}>
            <Card className="card-description">
              <Card.Body>
                <Table striped bordered hover size="sm">
                  <tbody>
                    <tr>
                      <td className="key">Instrument</td>
                      <td className="value">{archive.instrument}</td>
                    </tr>
                    <tr>
                      <td className="key">Description</td>
                      <td className="value">{archive.short_description}</td>
                    </tr>
                  </tbody>
                </Table>
                <img
                  className="mb-3"
                  alt=""
                  src={archive.thumbnail}
                  height={200}
                  width={300}
                />
                <h4>{archive.short_description}</h4>
                <p>{archive.long_description}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={9} md={9} lg={9}>
            <Row>
              <Col>
                <Card className="card-description">
                  <Card.Body>
                    <Card.Title>Data Retrieval</Card.Title>
                    <Card.Text>{archive.retrieval_description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <DataProductCategories archive={archive} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
