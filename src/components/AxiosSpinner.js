/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 26/08/2021 - 10:28:09
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 26/08/2021
 * - Author          : Grant
 * - Modification    :
 **/
import useAxios from "axios-hooks";
import React, { useEffect } from "react";

const RenderErrorLogger = ({ error, refetch }) => {
  useEffect((error) => console.error(error), [error]);
  return <>{error.toString()}</>;
};

export const AxiosSpinner = ({
  renderData: RenderData,
  callHook,
  renderError: RenderError = RenderErrorLogger,
}) => {
  const [{ data, loading, error }, refetch] = callHook(useAxios);
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Fetching data");
      refetch();
    }, 10000);
    return () => clearInterval(interval);
  }, [refetch]);

  if (error) {
    return <RenderError {...{ error, refetch }} />;
  }
  if (!data && loading) {
    return <></>;
  }
  return <RenderData {...{ data, refetch }} />;
};
