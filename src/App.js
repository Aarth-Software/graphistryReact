import React from "react";
import { Graphistry, Client } from "@graphistry/client-api-react";
import "@graphistry/client-api-react/assets/index.css";
import "./App.css";
import NeoFun from "./NeoFun";
import neo4j from "neo4j-driver";
function App() {
  const [data, setData] = React.useState([]);
  const [status, setStatus] = React.useState(false);
  const [key, setKey] = React.useState([]);
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
      setStatus(true);
      setData(result);
    } catch (error) {
      console.log(`unable to execute query. ${error}`);
      setStatus(false);
    }
  };

  const getValidClient = async () => {
    const client = await new Client("srinivas", "jackrider@066");
    setKey(client);
    console.log(client);
  };

  React.useEffect(() => {
    getData();
    getValidClient();
  }, []);

  return (
    <div className="container">
      <div className="InputContainer">
        <textarea />
      </div>
      <div className="graphistryContainer">
        <Graphistry
          apiKey={key._token}
          bindings={{ destinationField: "d", idField: "n", sourceField: "s" }}
          edges={[
            { d: "b", s: "a", v1: 2 },
            { d: "c", s: "b", v1: 3 },
          ]}
          nodes={[
            { n: "a", v2: 2 },
            { n: "b", v2: 4 },
          ]}
          onClientAPIConnected={function noRefCheck() {}}
          play={1}
          showSplashScreen
        />
      </div>
    </div>
  );
}

export default App;
