/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 11/10/2021 - 09:50:03
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 11/10/2021
 * - Author          : Grant
 * - Modification    :
 **/
import useAxios from "axios-hooks";
import { useEffect, useContext, useState, useCallback } from "react";
import { LoginContext } from "components/Login";

const API_URLS = {
  "intelli-farm": "https://lodicon-api.herokuapp.com/api/v1",
  "intelli-farm-qc": "https://lodicon-api-qc.herokuapp.com/api/v1",
};

const getApiUrl = () => {
  const { hostname } = window.location;
  const [name] = hostname.split(".", 2);
  const url = API_URLS[name] || API_URLS["intelli-farm-qc"];
  return url;
};

export const useApi = (path, config) => {
  const apiUrl = getApiUrl();
  const url = `${apiUrl}${path}`;
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
  }, [error, setLoginOpen]);

  useEffect(
    () => {
      if (!loginOpen && retry) {
        setRetry(null);
        retry();
      }
    },
    // Here we explicitly don't want the effect to rerun when retry is changed
    // eslint-disable-next-line
    [loginOpen]
  );

  const decoratedFetch = useCallback(
    async (...args) => {
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
    },
    [fetch, setLoginOpen]
  );

  return [
    Object.assign({}, result, {
      loading: !authorized(error) || loading,
      error: authorized(error) ? error : null,
    }),
    decoratedFetch,
  ];
};

export const post = (url) => [
  {
    url,
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  },
  {
    manual: true,
  },
];
