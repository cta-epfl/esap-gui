import React from "react";

export default function Dataset({ info, index, remove }) {
  return (
    <div className="Item">
      {index + 1} {info}
      <span onClick={() => remove(index)}>Remove</span>
    </div>
  );
}
