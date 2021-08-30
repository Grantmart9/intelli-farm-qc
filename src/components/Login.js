import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import useAxios from 'axios-hooks'
import { useParams, Redirect } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import { throwAxiosError } from "../api";

export const LoginContext = createContext();

export const useAxiosLoginToken = (onUnauthorized) => {
  const [ready, setReady] = useState(false);
  const respErrorHandler = useCallback(error => {
    if (error.response && [401, 403].includes(error.response.status)) {
      onUnauthorized();
    }
    return error;
  }, [onUnauthorized])
  const reqHandler = (request) => {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  };
  const respHandler = (response) => response
  useEffect(() => {
    if(!ready) {
      axios.interceptors.request.use(reqHandler);
      axios.interceptors.response.use(respHandler, respErrorHandler);
      setReady(true);
    }
  }, [ready, setReady, respErrorHandler]);
  return ready;
};

export const useLoginTest = (loginUrl) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginOpen,] = useContext(LoginContext);
  const [, getLogin] = useAxios(
    loginUrl,
    { manual: true }
  );

  useEffect(() => {
    if(!loggedIn && !loginOpen) {
      getLogin()
        .then(throwAxiosError)
        .then(() => setLoggedIn(true))
        .catch(() => {})
    }
  }, [getLogin, loggedIn, loginOpen])
  return loggedIn;
}


export const Login = ({loginUrl}) => {
  const [loginOpen, setLoginOpen] = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [, postLogin] = useAxios(
    {
      url: loginUrl,
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    },
    {
      manual: true,
    }
  );

  const onClose = () => setLoginOpen(false);
  const handleSubmit = e => {
    e.preventDefault();
    postLogin({ data: { username, password } })
      .then((result) => {
        const data = result.data || result.response.data;
        if(data.access_token) {
          localStorage.setItem('token', data.access_token);
          onClose();
        } else {
          setMessage(data.message);
        }
      });
  };

  return (
    <Dialog open={loginOpen} onClose={onClose}>
      <form className="flex flex-col space-y-4 p-4" onSubmit={handleSubmit}>
        <div className="font-bold align-self-center">
          Credentials
        </div>
        <div className="text-red-400">
          {message}
        </div>
        <TextField
          label="User Name"
          type="text"
          value={username}
          onInput={(e) => setUsername(e.target.value)}
          variant="outlined"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onInput={(d) => setPassword(d.target.value)}
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="secondary">
          <div style={{ color: "white" }}>Login</div>
        </Button>
      </form>
    </Dialog>
  );
}

export const Logout = ({logoutUrl, redirect}) => {
  const [state, setState] = useState({type: "message", message: ""});
  const [{loading}, postLogout] = useAxios(
    {
      url: logoutUrl,
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    },
    {
      manual: true
    }
  );

  useEffect(() => {
    postLogout()
      .then(throwAxiosError)
      .then(() => {
        localStorage.clear("token");
        setState({type: "redirect"});
      })
      .catch(() => setState({type: "message", message: "Something happened when logging out."}))
  });

  switch(state.type) {
    case "message":
      return <p>{state.message}</p>;
    case "redirect":
      window.location.hash=redirect;
      window.location.reload();
      return <></>;
    default:
      throw new Error("Impossible");
  }
}
