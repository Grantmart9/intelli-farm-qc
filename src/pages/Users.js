/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 01/10/2021 - 13:11:37
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 01/10/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React, { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useApi, API_URL } from "api";
import PreloaderBar from "images/PreloaderBar.gif";

const convertMessage = (message) =>
  typeof message == "string" ? message : Object.values(message)[0];

const RegUser = () => {
  const { clientId } = useParams();

  const [{ loading }, postRegistration] = useApi(
    {
      url: `${API_URL}/${clientId}/app1/registration`,
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    },
    {
      manual: true
    }
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const valid = password == confirmPassword;
  const validConfirm = confirmPassword == "" || valid;
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (valid) {
        postRegistration({ data: { username, password } })
          .then((result) => {
            const message = result.data.message;
            setMessage(message);
          })
          .catch((error) => {
            const message = convertMessage(error.response.data.message);
            setMessage(message);
          });
      }
    },
    [username, password, confirmPassword, valid]
  );

  return (
    <form onSubmit={handleSubmit} className="bg-gray-200 shadow-md rounded p-2">
      <h1 className="text-center font-bold text-lg">Register New User</h1>
     
      <div className="grid grid-rows-3 p-2 gap-2">
        <div className="flex align-center justify-center items-center">
          <TextField
            onInput={(e) => setUsername(e.target.value)}
            type="username"
            value={username}
            label="User Name"
            variant="outlined"
          ></TextField>
        </div>
        <div className="flex align-center justify-center items-center">
          <TextField
            onInput={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            label="Password"
            variant="outlined"
          ></TextField>
        </div>
        <div className="flex align-center justify-center items-center">
          <TextField
            type="password"
            onInput={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            error={!validConfirm}
            label="Confirm Password"
            variant="outlined"
          ></TextField>
        </div>
        <div className="flex align-center justify-center items-center">
        <Button
          variant="primary"
          type="submit"
          disabled={!valid}
          className="border-1 border-white text-center "
          style={{
            display: "inline-block",
            alignContent: "center",
            justifyContent: "center",
            fontFamily: "Nunito Sans",
            backgroundColor:"steelblue",
            color: "white",
            fontSize: "1rem",
            width: "50%"
          }}
        >
          Save
        </Button>
        </div>
        <div className="text-gray-800 text-center">{message}</div>
        <div className="flex align-center justify-center items-center">
        <img
          style={{ visibility: loading ? "visible" : "hidden" }}
          width={50}
          height={50}
          src={PreloaderBar}
          alt={PreloaderBar}
        />
        </div>
      </div>
    </form>
  );
};

const ChangeUser = () => {
  const { clientId } = useParams();
  const [{ loading }, postPassword] = useApi(
    {
      url: `${API_URL}/${clientId}/app1/password`,
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    },
    {
      manual: true
    }
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const valid = password == confirmPassword;
  const validConfirm = confirmPassword == "" || valid;

  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (valid) {
        postPassword({ data: { password, username: "" } })
          .then((result) => {
            const message = result.data.message;
            setMessage(message);
          })
          .catch((error) => {
            const message = convertMessage(error.response.data.message);
            setMessage(message);
          });
      }
    },
    [password, confirmPassword]
  );

  return (
    <form onSubmit={handleSubmit} className="bg-gray-200 shadow-md rounded p-2">
      <h1 className="text-center font-bold text-lg">Change User Credentials</h1>
      <div className="grid grid-rows-3 p-2 gap-2">
        <div className="flex align-center justify-center items-center">
          <TextField
            onInput={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            label="Password"
            variant="outlined"
          ></TextField>
        </div>
        <div className="flex align-center justify-center items-center">
          <TextField
            onInput={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            error={!validConfirm}
            type="password"
            label="Confirm Password"
            variant="outlined"
          ></TextField>
        </div>
        <div className="flex align-center justify-center items-center">
        <Button
        
          disabled={!valid}
          type="submit"
          className="border-1 border-white text-center"
          style={{
            display: "inline-block",
            alignContent: "center",
            justifyContent: "center",
            fontFamily: "Nunito Sans",
            color: "white",
            backgroundColor:"steelblue",
            fontSize: "1rem",
            width: "50%"
          }}
        >
          Save
        </Button>
        </div>
        <div className="text-gray-800 text-center">{message}</div>
        <div className="flex align-center justify-center items-center">
        <img
          style={{ visibility: loading ? "visible" : "hidden" }}
          width={50}
          height={50}
          src={PreloaderBar}
          alt={PreloaderBar}
        />
        </div>
      </div>
    </form>
  );
};

export const Users = () => (
  <div className="p-4 flex items-center justify-center align-center">
    <div className="grid grid-rows-2 gap-2">
      <RegUser />
      <ChangeUser />
    </div>
  </div>
);
