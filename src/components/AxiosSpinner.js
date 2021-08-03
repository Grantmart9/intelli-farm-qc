import useAxios from 'axios-hooks';
import React, { useEffect } from 'react';
import Preloader from "./Preloader";

const RenderErrorLogger = ({error, refetch}) => {
  useEffect((error) => console.error(error), [error]);
  return <>{error.toString()}</>;
}

export const AxiosSpinner =
  ({
    renderData: RenderData,
    callHook,
    renderError: RenderError = RenderErrorLogger,
    renderLoader: RenderLoader = Preloader,
  }) => {
    const [{ data, loading, error }, refetch] = callHook(useAxios);
    if (error) {
      return <RenderError {...{ error, refetch }} />;
    }
    if (loading) {
      return <RenderLoader/>;
    }
    return <RenderData {...{ data, refetch }}/>;
  };