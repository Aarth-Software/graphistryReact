import React from "react";
import { Graphistry } from "@graphistry/client-api-react";
import "@graphistry/client-api-react/assets/index.css";
import "./App.css";
import NeoFun from "./NeoFun";
import neo4j from "neo4j-driver";
function App() {
  const [data, setData] = React.useState([]);
  const [status, setStatus] = React.useState(false);
  const getData = async () => {
    setStatus(false);
    const readQuery = `MATCH (n:Movie) RETURN n LIMIT 25`;
    const config = {
      neo4j: {
        url: "neo4j+s://7a396979.databases.neo4j.io",
        authUser: "neo4j",
        authKey: "MyHTf2fSrN-KgLEPwJmuCw6Z1dcqGOITyyd5wCHpGZ0",
      },
    };
    const driver = neo4j.driver(
      config.neo4j.url,
      neo4j.auth.basic(config.neo4j.authUser, config.neo4j.authKey)
    );
    const session = driver.session({ database: "neo4j" });
    var result = null;
    try {
      result = await session.run(readQuery);
      console.log(result);
      setStatus(true);
    } catch (error) {
      console.log(`unable to execute query. ${error}`);
      setStatus(false);
    } finally {
      console.log("connected");
      await session.close();
    }
    setData(result.records);
  };
  React.useEffect(() => {
    getData();
    console.log(data);
  }, []);
  return (
    <div className="container">
      <div className="InputContainer">
        <textarea />
      </div>
      <div className="graphistryContainer">
        <Graphistry
          dataset="Miserables"
          graphistryHost="https://hub.graphistry.com"
        />
      </div>
    </div>
  );
}

export default App;
