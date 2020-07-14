import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  ListGroup,
  Card,
  Button,
  Row,
  Col,
  ListGroupItem,
} from "react-bootstrap";
import { GlobalContext } from "../../contexts/GlobalContext";
import axios from "axios";

export default function DataProductCategories({ archive }) {
  const { api_host } = useContext(GlobalContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(api_host + "query/datasets-uri")
      .then((response) => setCategories(response.data["results"]));
  }, [api_host]);
  if (!categories) return null;

  return (
    <Card>
      <Card.Body>
        <Card.Title>Data Product Categories in {archive.name}</Card.Title>

        <ListGroup variant="flush">
          <ListGroupItem>
            <Row className="p-2">
              <Col>Data Product Category</Col>
              <Col>Catalog name</Col>
              <Col>Categories access</Col>
            </Row>
          </ListGroupItem>
          {categories
            .filter((category) => archive.datasets.includes(category.uri))
            .map((category) => {
              console.log(category);
              let button;
              let extra_info;
              let documentation;
              if (category.service_connector) {
                button = (
                  <Button as={NavLink} variant="outline-info" to="/query">
                    Browse Catalog & Run Queries
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
                    <Col>{archive.name}</Col>
                    <Col>{button}</Col>
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
