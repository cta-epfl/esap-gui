import React from "react";
import { Pagination } from "react-bootstrap";

export default function Paginate(props) {
  const { currentPage, getNewPage, numAdjacent, numPages } = props;

  console.log(props);

  const numBelow = Math.min(numAdjacent, currentPage-1);
  const belowAdjacent = [...Array(numBelow).keys()].map((key) => {
    const itemKey = `page_below_${key}`;
    return (<Pagination.Item key={itemKey}>{currentPage - numBelow + key}</Pagination.Item>)
  });
  const prefix = belowAdjacent.length >= numAdjacent ? (<><Pagination.First /><Pagination.Ellipsis disabled/>{belowAdjacent}</>) : (<>{belowAdjacent}</>);

  const numAbove = Math.min(numAdjacent, numPages-currentPage);
  const aboveAdjacent = [...Array(numAbove).keys()].map((key) => {
    const itemKey = `page_above_${key}`;
    return (<Pagination.Item key={itemKey}>{currentPage + key + 1}</Pagination.Item>)
  });
  const suffix = aboveAdjacent.length >= numAdjacent ? (<>{aboveAdjacent}<Pagination.Ellipsis disabled/><Pagination.Last /></>) : (<>{aboveAdjacent}</>);

  return (
    <Pagination onClick={getNewPage} size="lg">
      {prefix}
      <Pagination.Item active >{currentPage}</Pagination.Item>
      {suffix}
    </Pagination>
  );
}
