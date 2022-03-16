import React, { useContext } from "react";
import { Table, Alert, Form } from "react-bootstrap";
import { QueryContext } from "../../../contexts/QueryContext";
import LoadingSpinner from "../../LoadingSpinner";
import Paginate from "../../Paginate";
import AddToBasket from "../../basket/AddToBasketCheckBox";

export default function ZenodoResults({ catalog }) {
  const context = useContext(QueryContext);
  const { queryMap, page, setPage } = context;
  const regex = /(<([^>]+)>)/ig;

  if (!context.queryMap) return null;

  if (context.queryMap.get(catalog).status === "fetched") {
    if (context.queryMap.get(catalog).results.results.length === 0)
      return <Alert variant="warning">No matching results found!</Alert>;
    else if (catalog === "zenodo") {
      const zenodoResults = queryMap.get("zenodo").results.results.map((hits, counter) => (
        <>
        <br/>
        <br/>
        <h4><a href={hits.links.latest_html} target="_blank"> {hits.metadata.title.replaceAll(regex, '')} </a></h4>
        <a href={hits.links.doi} target="_blank"> <img src={hits.links.badge} alt="DOI"/> </a>
        <br/>
        {hits.metadata.description.replaceAll(regex, '').substring(0,200)}...
        </>
      ));

      return (

       <>
         {zenodoResults}
       </>

      ); 

    }
  }
  else {
    return <LoadingSpinner />;
  }
}

