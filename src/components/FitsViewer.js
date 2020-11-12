import React, { useContext } from "react";
import { QueryContext } from "../contexts/QueryContext";

export default function FitsViewer() {
  const { fits } = useContext(QueryContext)
  const url = "https://js9.si.edu/js9/js9.html?url="+JSON.parse(JSON.stringify(fits))+"&colormap=viridis&scale=log"

  console.log(fits);
  console.log("fits url: ", url);

  return (
    <div className="embed-responsive embed-responsive-16by9">
      <iframe
        className="embed-responsive-item"
        src={url}
        allowFullScreen
      ></iframe>
    </div>
  );
}
