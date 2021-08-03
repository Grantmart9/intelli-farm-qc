import useAxios from 'axios-hooks';
import React, { useEffect } from 'react';
import Preloader from "./Preloader";

const RenderErrorLogger = ({error, refetch}) => {
  useEffect((error) => console.error(error), [error]);
  return <>{error}</>;
}

export const AxiosSpinner =
  ({
    renderData,
    callHook,
    renderError = RenderErrorLogger,
    renderLoader = Preloader,
  }) => {
    const [{ data, loading, error }, refetch] = callHook(useAxios);
    if (error) {
      return <renderError {...{ error, refetch }} />;
    }
    if (loading) {
      return <renderLoader/>;
    }
    return <renderData {...{ data, refetch }}/>;
  };