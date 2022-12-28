import React from "react";
import neo4j from "neo4j-driver";

const NeoFun = () => {
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

  const getData = async () => {
    try {
      const movieTitle = "Toy Story";
      await findPerson(driver, movieTitle);
      // await findPerson(driver, person2Name);
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
    } finally {
      // Don't forget to close the driver connection when you're finished with it.
      await driver.close();
    }
    async function findPerson(driver, ele) {
      const session = driver.session({ database: "neo4j" });

      try {
        const readQuery = `
        MATCH (n)-[r]-(n1) RETURN n,r,n1 LIMIT 5
          `;

        const readResult = await session.executeRead((tx) =>
          tx.run(readQuery, { ele })
        );

      } catch (error) {
        console.error(`Something went wrong: ${error}`);
      } finally {
        await session.close();
      }
    }
  };
  getData();
  return <div>hello</div>;
};

export default NeoFun;
