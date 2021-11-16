import React, { useContext, useEffect } from "react";
import * as deepEqual from "deep-equal";
import { Form } from "react-bootstrap";

import { MAQContext } from "../../../contexts/MAQContext";

export default function SelectDatasetCheckBox(props) {
  const maqContext = useContext(MAQContext);

  function isSelected(testItem) {
    const found = maqContext.selectedDatasets.some(item => deepEqual(item, testItem));
    console.log('found = '+found+' testItem = '+testItem)
    return found;
  }

  function selectItem(item) {
    maqContext.selectDataset(item);
    console.log('selectItem: '+[item, maqContext]);
  }

  function unselectItem(item) {
    maqContext.unselectDataset(item);
    console.log('unselectItem: '+[item, maqContext]);
  }

  return (

    <Form.Check id={props.id} type="checkbox" label={props.label} onChange={(event) => {
      const action = event.target.checked ? selectItem : unselectItem;
      action(props.item);
    }} checked={isSelected(props.item) ? "checked" : ""} />
  );
}
