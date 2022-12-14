import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ListGroup, Card, Button, Row, Col } from "react-bootstrap";
import { GlobalContext } from "../../contexts/GlobalContext";
import { QueryContext } from "../../contexts/QueryContext";
import axios from "axios";
import { getQueryIcon } from "../../utils/styling";

export default function DataProductCategories({ archive }) {
  const { api_host } = useContext(GlobalContext);
  const { setDPLevel, setCollection } = useContext(QueryContext);
  const [categories, setCategories] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(api_host + "query/datasets-uri")
      .then((response) => setCategories(response.data["results"]));
  }, [api_host]);
  if (!categories) return null;

  return (
    <Card>
      <Card.Body>
        <Card.Title>Data in {archive.name}</Card.Title>

        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row className="p-2">
              <Col className="text-left"><b>Dataset or Category</b></Col>
              <Col className="text-center"><b>Catalog</b></Col>
              <Col className="text-center"><b>Query Access</b></Col>
            </Row>
          </ListGroup.Item>
          {categories
            .filter((category) => archive.datasets.includes(category.uri))
            .map((category) => {
              console.log("category:", category);
              let button;
              let extra_info;
              let documentation;
              if (category.service_connector) {
                let query_url = `${category.archive_uri_derived}/query`;
                console.log("query_url:", query_url);
                button = (
                  // need to add level (e.g raw) and category (e.g imaging) infomation to send to the form
                  // probably need to define onSubmit instead of point to query_url
                  <Button  
                    onClick={() => {
                      console.log('onClick', category)
                      setDPLevel(category.level);
                      setCollection(category.collection);
                      history.push(query_url);}}
                  >
                      {getQueryIcon()} Query this Dataset
                  </Button>

                );
              } else if (category.catalog_user_url_derived) {
                button = (
                  <Button
                    variant="outline-info"
                    href={category.catalog_user_url_derived}
                    target="_blank"
                  >
                    Visit Catalog
                  </Button>
                );
              }
              if (category.retrieval_description) {
                extra_info = (
                  <Card className="card-description">
                    <Card.Body>
                      <Card.Text>{category.retrieval_description}</Card.Text>
                    </Card.Body>
                  </Card>
                );
              }
              if (category.documentation_url) {
                documentation = (
                  <Button
                    className="mt-3"
                    variant="outline-info"
                    href={category.documentation_url}
                    target="_blank"
                  >
                    Documentation
                  </Button>
                );
              }
              return (
                <ListGroup.Item key={category.uri}>
                  <Row className="p-2 bg-light">
                    <Col>{category.name}</Col>
                    <Col className="text-center">{archive.name}</Col>
                    <Col className="text-center">{button}</Col>
                  </Row>
                  <Row className="p-2 bg-light">
                    <Col>
                      <Card className="card-description">
                        <Card.Body>
                          <Card.Title>{category.name}</Card.Title>
                          <Card.Text>{category.long_description}</Card.Text>
                        </Card.Body>
                      </Card>
                      {extra_info}
                      {documentation}
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
