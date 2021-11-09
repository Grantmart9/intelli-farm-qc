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
import { useApi } from "api";
import { useRefetch } from "./Timer";

const RenderErrorLogger = ({ error, refetch }) => {
  useEffect((error) => console.error(error), [error]);
  return <>{error.toString()}</>;
};

export const AxiosSpinner = ({
  renderData: RenderData,
  callHook,
  refresh = true,
  renderError: RenderError = RenderErrorLogger,
}) => {
  const [{ data, loading, error }, refetch] = callHook(useApi);
  useRefetch(refetch, refresh);

  if (error) {
    return <RenderError {...{ error, refetch }} />;
  }
  if (!data && loading) {
    return <></>;
  }
  return <RenderData {...{ data, refetch }} />;
};
