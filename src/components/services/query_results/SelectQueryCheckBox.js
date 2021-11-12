import React, { useContext, useEffect } from "react";
import * as deepEqual from "deep-equal";
import { Form } from "react-bootstrap";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { MAQContext } from "../../../contexts/MAQContext";

//import { BasketContext } from "../../../contexts/BasketContext";

export default function SelectQueryCheckBox(props) {
  const maqContext = useContext(MAQContext);

  function isSelected(testItem) {
    const found = maqContext.selectedQueries.some(item => deepEqual(item, testItem));
    console.log('found = '+found+' testItem = '+testItem)
    return found;
  }

  function selectItem(item) {
    maqContext.selectQuery(item);
    console.log('selectItem: '+[item, maqContext]);
  }

  function unselectItem(item) {
    maqContext.unselectQuery(item);
    console.log('unselectItem: '+[item, maqContext]);
  }

  return (

    <Form.Check id={props.id} type="checkbox" label={props.label} onChange={(event) => {
      const action = event.target.checked ? selectItem : unselectItem;
      action(props.item);
    }} checked={isSelected(props.item) ? "checked" : ""} />
  );
}
