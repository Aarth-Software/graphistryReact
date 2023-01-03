import React from "react";
import { Graphistry } from "@graphistry/client-api-react";
import "@graphistry/client-api-react/assets/index.css";
const Graph = ({ set }) => {
  return (
    <div className="graphistryContainer">
      <Graphistry dataset={set} graphistryHost="https://hub.graphistry.com" />
    </div>
  );
};

export default Graph;
