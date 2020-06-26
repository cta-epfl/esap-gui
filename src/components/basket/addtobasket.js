import React, { useState } from "react";

export default function Addtobasket({ add }) {
  const [info, setInfo] = useState("");

  return (
    // input field is only here for testing
    // this will be replaced by real dataset later.
    <div className="Item">
      <input
        type="text"
        placeholder="New dataset info"
        value={info}
        onChange={(e) => setInfo(e.target.value)}
      ></input>
      <button onClick={() => add(info)}>Add to basket</button>
    </div>
  );
}
