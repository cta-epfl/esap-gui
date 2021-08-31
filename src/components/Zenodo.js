import React from "react";

export default function Zenodo() {
  return (
    <div className="embed-responsive embed-responsive-16by9">
      <iframe
        title="zenodo"
        className="embed-responsive-item"
        src="https://zenodo.org/api/"
        allowFullScreen
      ></iframe>
    </div>
  );
}
