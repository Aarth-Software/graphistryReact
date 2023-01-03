import React from "react";
import "./App.css";
import Graph from "./Graph";

function App() {
  const textRef = React.useRef(null);
  const [data, setData] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const executeQuery = (query) => {
    setStatus(false);
    console.log(query);
    fetch(`http://localhost:3000/runQuery?cypherQuery=${query}`, {
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
  const run = () => {
    executeQuery(textRef.current.value);
  };
  return (
    <div className="container">
      <div className="InputContainer">
        <textarea ref={textRef} />
        <button onClick={run}>Run</button>
      </div>
      {status && <Graph set={data} />}
    </div>
  );
}

export default App;
// MATCH (c1)-[r]-(c2) RETURN c1,r,c2 LIMIT 10
