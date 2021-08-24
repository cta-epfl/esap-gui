import React, { useContext } from "react";
import { Table, Alert, Form } from "react-bootstrap";
import { QueryContext } from "../../../contexts/QueryContext";
import LoadingSpinner from "../../LoadingSpinner";
import Paginate from "../../Paginate";
import AddToBasket from "../../basket/AddToBasketCheckBox";

export default function ZenodoResults({ catalog }) {
  const context = useContext(QueryContext);
  const { queryMap, page, setPage } = context;

  if (!context.queryMap) return null;

  if (context.queryMap.get(catalog).status === "fetched") {
    if (context.queryMap.get(catalog).results.results.length === 0)
      return <Alert variant="warning">No matching results found!</Alert>;
    else if (catalog === "zenodo") {
      const zenodoResults = queryMap.get("zenodo").results.results[0]['hits']['hits'].map((hits, counter) => (
        <>
        <br/>
        <br/>
        <h4><a href={hits.links.latest_html} target="_blank"> {hits.metadata.title.replaceAll("<p>","").replaceAll("</p>","")} </a></h4>
        DOI: {hits.metadata.doi}
        <br/>
        {hits.metadata.description.replaceAll("<p>","").replaceAll("</p>","").substring(0,200)}...
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

