import useAxios from "axios-hooks";
import { useEffect, useContext, useState, useMemo } from "react";
import { LoginContext } from "components/Login";

export const API_URL = "https://lodicon-api.herokuapp.com/api/v1";

export const useApi = (url, config) => {
  const normalizedUrl = typeof url == "string" ? { url } : url;
  const [loginOpen, setLoginOpen] = useContext(LoginContext);
  const token = localStorage.getItem("token");
  const decoratedUrl = Object.assign({}, normalizedUrl, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const [result, fetch] = useAxios(decoratedUrl, config);
  const [retry, setRetry] = useState(null);
  const { error, loading } = result;
  const authorized = (e) =>
    !(e && e.response && [401, 403].includes(e.response.status));

  useEffect(() => {
    if (!authorized(error)) {
      setLoginOpen(true);
    }
  }, [error]);

  useEffect(() => {
    if (!loginOpen && retry) {
      setRetry(null);
      retry();
    }
  }, [loginOpen]);

  const decoratedFetch = async (...args) => {
    const data = await fetch(...args);
    if (data && data.isAxiosError) {
      const error = data;
      if (authorized(error)) {
        throw error;
      } else {
        return new Promise((resolve, reject) => {
          setRetry((retry) => () => {
            retry && retry();
            decoratedFetch(...args)
              .then(resolve)
              .catch(reject);
          });
          setLoginOpen(true);
        });
      }
    }
    return data;
  };

  return [
    Object.assign({}, result, {
      loading: !authorized(error) || loading,
      error: authorized(error) ? error : null,
    }),
    decoratedFetch,
  ];
};
