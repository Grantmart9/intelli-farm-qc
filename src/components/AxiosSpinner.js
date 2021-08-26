import useAxios from "axios-hooks";
import React, { useEffect } from "react";
import Preloader from "./Preloader";

const RenderErrorLogger = ({ error, refetch }) => {
  useEffect((error) => console.error(error), [error]);
  return <>{error.toString()}</>;
};

export const AxiosSpinner = ({
  renderData: RenderData,
  callHook,
  renderError: RenderError = RenderErrorLogger,
  renderLoader: RenderLoader = Preloader,
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
    return <RenderLoader />;
  }
  return <RenderData {...{ data, refetch }} />;
};
