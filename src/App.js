import axios from "axios";
import React from "react";
import "./App.css";
import Graph from "./Graph";
import { Client } from "@graphistry/client-api-react";

function App() {
  const textRef = React.useRef(null);
  const [data, setData] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [key, setKey] = React.useState(null);
  const executeQuery = (query) => {
    setStatus(false);
    console.log(query);
    fetch(`http://127.0.0.1/app2/runQuery?cypherQuery=${query}`, {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => resp.json())
      .then((result) => {
        setData(result[0]);
        setStatus(true);
      })
      .catch((err) => {
        setStatus(false);
      });
  };

  const getValidClient = async () => {
    setKey(null);
    const client = await new Client("ahmeddoha", "Graph_CU_55");
    const token = await client._getAuthTokenPromise;
    setKey(token);
    console.log(client);
    console.log(token);
  };
  const run = () => {
    executeQuery(textRef.current.value);
    getValidClient();
  };
  return (
    <div className="container">
      <div className="InputContainer">
        <textarea ref={textRef} />
        <button onClick={run}>Run</button>
      </div>
      {status  && <Graph token={key} set={data} />}
    </div>
  );
}

export default App;
// MATCH (c1)-[r]-(c2) RETURN c1,r,c2 LIMIT 10
