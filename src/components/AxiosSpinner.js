import React, { useEffect } from 'react';
import { Preloader } from "./Preloader";

const renderErrorLogger = (error, refetch) => {
  useEffect((error) => console.error(error), [error]);
  return <>error</>;
}

const renderPreloader = () => <Preloader />;

export const AxiosSpinner =
  ({
    renderData,
    useHook,
    renderError = renderErrorLogger,
    renderLoader = renderPreloader,
  }) => {
    const [{ data, loading, error }, refetch] = useHook();
    if (error) {
      return renderError(error, refetch);
    }
    if (loading) {
      return renderLoader();
    }
    return renderData(data, refetch)
  }