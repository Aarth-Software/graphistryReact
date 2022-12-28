import axios from "axios";
import React from "react";
import "./App.css";
import Graph from "./Graph";
import NeoFun from "./NeoFun";
import { useGetToken } from "./Utils/useGetToken";
function App() {
  const [status, setStatus] = React.useState("idle");
  const [data, setData] = React.useState(null);
  const textAreaRef = React.useRef(null);
  // const [status, data] = useGetToken("srinivas", "jackrider@066");
  // console.log(status, data);
  const fun = async (query) => {
    try {
      setStatus("loading");
      let link = query;
      const don = await axios.get(
        `http://localhost:5000/getData/${link}`,
        link
      );
      console.log(don.data.hello._datasetID);
      setData(don.data.hello._datasetID);
      setStatus("success");
    } catch (err) {
      console.log(err);
      setStatus("error");
    }
  };
  const getInitial = () => {
    fun(textAreaRef.current.value);
  };
  return (
    <div className="container">
      <div className="InputContainer">
        <textarea ref={textAreaRef} />
        <button onClick={getInitial}>RUN</button>
      </div>
      {status === "idle" && (
        <div className="IdleContainer">
          <div>Query has't been insearted</div>
        </div>
      )}
      {status === "loading" && (
        <div className="IdleContainer">
          <div>Loading...</div>
        </div>
      )}
      {status === "error" && (
        <div className="IdleContainer">
          <div>Connetion Error</div>
        </div>
      )}
      {status === "success" && <Graph tok={data} />}
    </div>
  );
}

export default App;
// MATCH (c1)<-[r]->(c2) RETURN c1,r,c2 LIMIT 170
