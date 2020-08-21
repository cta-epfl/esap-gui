import React from "react";
import { Pagination } from "react-bootstrap";

export default function Paginate(props) {
  return (
    <Pagination onClick={props.newPageCallback}>
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item active>{props.currentPage}</Pagination.Item>
      <Pagination.Ellipsis />
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
}
