/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 15/09/2021 - 11:43:11
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 15/09/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import useAxios from "axios-hooks";
import { useApi, getApiUrl } from "api";

export const LoginContext = createContext();

export const Login = ({ loginUrl }) => {
  const [loginOpen, setLoginOpen] = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [, postLogin] = useAxios(
    {
      url: `${getApiUrl()}${loginUrl}`,
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

  function handleSubmit(e) {
    e.preventDefault();

    postLogin({ data: { username, password } })
      .then((result) => {
        const data = result.data || result.response.data;

        console.log(result.data.message);

        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
          onClose();
          setMessage(result.data.message);
        }
        if (data.status == 403) {
          setMessage(result.data.message);
        }
      })
      .catch((error) => {
        const data = error.data || error.response.data;
        setMessage(data.message);
      });
  }

  return (
    <Dialog open={loginOpen} onClose={onClose}>
      <form className="flex flex-col space-y-4 p-4" onSubmit={handleSubmit}>
        <div className="font-bold align-self-center">Credentials</div>
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
        <Button type="submit" variant="contained" color="primary">
          <div style={{ color: "white" }}>Login</div>
        </Button>
        <div className="text-gray-800 text-center">{message}</div>
      </form>
    </Dialog>
  );
};

export const Logout = ({ logoutUrl, redirect }) => {
  const [state, setState] = useState({ type: "message", message: "" });
  const [, postLogout] = useApi(
    {
      url: logoutUrl,
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    },
    {
      manual: true,
    }
  );

  useEffect(() => {
    postLogout()
      .then(() => {
        localStorage.clear("token");
        setState({ type: "redirect" });
      })
      .catch(() =>
        setState({
          type: "message",
          message: "Something happened when logging out.",
        })
      );
  }, [postLogout]);

  switch (state.type) {
    case "message":
      return <p>{state.message}</p>;
    case "redirect":
      window.location.hash = redirect;
      window.location.reload();
      return <></>;
    default:
      throw new Error("Impossible");
  }
};
