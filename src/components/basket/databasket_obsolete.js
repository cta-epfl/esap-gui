import React from "react";
import Dataset from "./dataset";

export default function Databasket({ datasets = [], remove }) {
  return datasets.map((dataset, i) => (
    <Dataset info={dataset} index={i} key={i} remove={remove} />
  ));
}
