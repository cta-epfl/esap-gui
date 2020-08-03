import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Container, Row, Col, Card, Table, Alert, Image } from "react-bootstrap";
import DataProductCategories from "./DataProductCategories";

export default function ArchiveDetails(props) {
  const { uri } = useParams();
  console.log(uri);
  const { archives, defaultConfigName, setConfigName } = useContext(GlobalContext);
  if (!archives) return null;

  /* This is a nasty hack. There must be a better way! */
  if (uri.search("zooniverse") >= 0){
    setConfigName("zooniverse");
  }
  else{
    setConfigName(defaultConfigName);
  }

  const archive = archives.find((archive) => archive.uri === uri);
  if (!archive) return <Alert variant="danger">No Archive found!</Alert>;
  console.log(archive);

  return (
    <>
      <Container fluid>
        <Row>
          <h2 className="ml-3">Archive - {archive.name}</h2>
        </Row>

        <Row>
          <Col sm={4} md={4} lg={4}>
            <Card className="card-description">
              <Card.Body>
                <Table bordered hover fluid size="sm">
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
                <Card>
                <Image
                  className="mx-auto d-block"
                  src={archive.thumbnail}
                  alt=""
                  rounded
                  fluid
                />
                <Card.Title className="text-center h4 pt-3">{archive.short_description}</Card.Title>
                <Card.Text className="text-justify m-3">{archive.long_description}</Card.Text>
                </Card>
              </Card.Body>
            </Card>
          </Col>
          <Col fluid>
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
            <Row className="pt-3">
              <Col>
                <DataProductCategories archive={archive} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
