import React, { useContext } from "react";
import { CardColumns } from "react-bootstrap";
import ArchiveCard from "./ArchiveCard";
import { GlobalContext } from "../../contexts/GlobalContext";

export function Archives() {
  const { archives } = useContext(GlobalContext);
  if (!archives) return null;

  console.log("archives: ", { archives });
  return (
    <CardColumns className="row-2">
      {archives.map((archive) => {
        let key = "archive-" + archive.id;
        return <ArchiveCard key={key} archive={archive} />;
      })}
    </CardColumns>
  );
}
