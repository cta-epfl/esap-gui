import React, { useContext } from "react";
import { Table, Alert, Form } from "react-bootstrap";
import { QueryContext } from "../../../contexts/QueryContext";
import LoadingSpinner from "../../LoadingSpinner";
import Paginate from "../../Paginate";
import AddToBasket from "../../basket/AddToBasketCheckBox";

export default function DIRACResults({ catalog }) {
  const context = useContext(QueryContext);
  const { queryMap, page, setPage } = context;
  const regex = /(<([^>]+)>)/ig;

  if (!context.queryMap) return null;

  if (context.queryMap.get(catalog).status === "fetched") {
    if (context.queryMap.get(catalog).length === 0)
      return <Alert variant="warning">No matching results found!</Alert>;
    else if (catalog === "concordia") {
      const concordiaResults = queryMap.get("concordia").results.results.map((hits, counter) => (

           <>
           Job submitted:
           <br/>
           JobID: {hits.JobID}
           <br/>
           Status: {hits.Status}
           <br/>
           Minor Status: {hits.MinorStatus}
           <br/>
           Site: {hits.Site}
           </>


      ));

      return (

       <>
         {concordiaResults}
       </>

      ); 

    }
  }
  else {
    return <LoadingSpinner />;
  }
}

