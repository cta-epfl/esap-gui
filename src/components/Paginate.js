import React from "react";
import { Pagination } from "react-bootstrap";

export default function Paginate() {
  return (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item active>{1}</Pagination.Item>
      <Pagination.Ellipsis />
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
}
