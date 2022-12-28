import React from "react";
import { Graphistry } from "@graphistry/client-api-react";
import "@graphistry/client-api-react/assets/index.css";
const Graph = ({ tok }) => {
  return (
    <div className="graphistryContainer">
      <Graphistry dataset={tok} />
    </div>
  );
};

export default Graph;
