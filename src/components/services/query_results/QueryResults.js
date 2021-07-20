import React from "react";
import ApertifResults from "./ApertifResults";
import ASTRONVOResults from "./ASTRONVOResults";
import ZooniverseResults from "./ZooniverseResults";
import VORegListResults from "./VORegListResults";
import LOFARResults from "./LOFARResults";
import RucioResults from "./RucioResults";
import SampResults from "./SampResults";

export default function QueryResults({ catalog }) {
  switch (catalog) {
    case "apertif":
      return <ApertifResults catalog={catalog} />;
    case "astron_vo":
      return <ASTRONVOResults catalog={catalog} />;
    case "zooniverse_projects":
      return <ZooniverseResults catalog={catalog} />;
    case "zooniverse_workflows":
      return <ZooniverseResults catalog={catalog} />;
    case "vo_reg":
      return <VORegListResults catalog={catalog} />;
    case "lofar":
      return <LOFARResults catalog={catalog} />;
    case "rucio":
      return <RucioResults catalog={catalog} />;
    case "samp":
      return <SampResults catalog={catalog} />;
    default:
      return null;
  }
}