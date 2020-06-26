import React from "react";
import ApertifResults from "./ApertifResults";
import ASTRONVOResults from "./ASTRONVOResults";

export default function QueryResults({ catalog }) {
  switch (catalog) {
    case "apertif":
      return <ApertifResults catalog={catalog} />;
    case "astron_vo":
      return <ASTRONVOResults catalog={catalog} />;
    default:
      return null;
  }
}
