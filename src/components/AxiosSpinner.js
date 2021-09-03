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
import React, { useEffect } from "react";
import { useApi } from "../api";

const RenderErrorLogger = ({ error, refetch }) => {
  useEffect((error) => console.error(error), [error]);
  return <>{error.toString()}</>;
};

export const AxiosSpinner = ({
  renderData: RenderData,
  callHook,
  renderError: RenderError = RenderErrorLogger,
}) => {
  const [{ data, loading, error }, refetch] = callHook(useApi);
  useEffect(() => {
    const interval = setInterval(() => {
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
