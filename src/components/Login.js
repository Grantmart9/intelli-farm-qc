import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import useAxios from 'axios-hooks'
import { useParams } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';

import { API_URL } from '../api';

export const ModalContext = createContext();


export const useAxiosLoginToken = (onUnauthorized) => {
  const respErrorHandler = useCallback(error => {
    if (error.response && [401, 403].includes(error.response.status)) {
      onUnauthorized();
    }
    return error;
  }, [onUnauthorized])
  const reqHandler = (request) => {
    const token = localStorage.getItem('token');
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  }
  const respHandler = (response) => response
  axios.interceptors.request.eject(reqHandler);
  axios.interceptors.request.use(reqHandler);
  axios.interceptors.request.eject(respHandler);
  axios.interceptors.response.use(respHandler, respErrorHandler);
};

export const Login = ({loginUrl}) => {
  const [loginOpen, setLoginOpen] = useContext(ModalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [, postLogin] = useAxios(
    {
      url: loginUrl,
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    },
    {
      manual: true
    }
  );

  const onClose = () => setLoginOpen(false);
  const onSubmit = () => {
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
      <div className="flex flex-col p-4 space-y-4">
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
          onInput={e => setUsername(e.target.value)}
          variant="outlined"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onInput={d => setPassword(d.target.value)}
          variant="outlined"
        />
        <Button onClick={onSubmit} variant="contained" color="secondary">
          <div style={{ color: "white" }}>Login</div>
        </Button>
      </div>
    </Dialog>
  );
}