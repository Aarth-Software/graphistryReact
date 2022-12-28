import React from "react";
import { Client } from "@graphistry/client-api-react";
export const useGetToken = (name, pass) => {
  const [data, setData] = React.useState(null);
  const [status, setStatus] = React.useState(false);

  const getValidClient = React.useCallback(async () => {
    try {
      setStatus(false);
      var result = await new Client(name, pass);
      setData(result);
      setStatus(true);
    } catch (err) {
      setStatus(false);
      throw new Error(err);
    }
  }, [name, pass]);

  React.useEffect(() => {
    getValidClient();
  }, [getValidClient]);

  return [status, data];
};
