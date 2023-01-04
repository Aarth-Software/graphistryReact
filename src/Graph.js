import React from "react";
import "@graphistry/client-api-react/assets/index.less";
const Graph = ({ set }) => {
  return (
    <div className="graphistryContainer">
      <iframe
        className="iframe-container"
        src={`https://hub.graphistry.com/graph/graph.html?dataset=${set}`}
        title="GraphistryIframe"
      />
    </div>
  );
};

export default Graph;
