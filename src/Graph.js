import React from "react";
import { Graphistry } from "@graphistry/client-api-react";
import "@graphistry/client-api-react/assets/index.css";
const Graph = ({ token, set }) => {
  return (
    <div className="graphistryContainer">
      <Graphistry
        apiKey={token}
        dataset={set}
        graphistryHost="hub.graphistry.com"
      />
    </div>
  );
};

export default Graph;
