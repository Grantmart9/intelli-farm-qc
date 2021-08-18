/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 10/08/2021 - 15:19:43
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 10/08/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React, { useState } from "react";
import { AppName } from "./AppName";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const DashboardOverview = () => {
  const [username, setInput] = useState("");
  const [password, setInputPassword] = useState("");

  var userCreds = Array(username.concat("," + password));
  console.log(userCreds);

  axios
    .get(`https://b885888a-e8d2-451f-9204-244988a28d5c.mock.pstmn.io/get`)
    .then((res) => {
      const login = res.data;
      console.log(login[0]);
      if (JSON.stringify(userCreds) === JSON.stringify(login[0])) {
        console.log("success, logging in");
      }
    });

  return (
    <div style={{ display: "block", backgroundColor: "#cad3de" }}>
      <AppName />
      <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:mt-0 md:mt-16 xl:mt-16 2xl:mt-16 sm:p-1 md:p-1 p-1 justify-center flex">
        <div className="inline-flex mt-4">
          <div className="bg-gray-200 rounded shadow-md p-4 ">
            <div className="font-bold mb-2 flex justify-center">
              Credentials
            </div>
            <div className="mb-2 flex justify-center">
              <TextField
                value={username}
                onInput={(e) => setInput(e.target.value)}
                label="User Name"
                variant="outlined"
              />
            </div>
            <div className="mb-2 block">
              <TextField
                value={password}
                onInput={(d) => setInputPassword(d.target.value)}
                label="Password"
                variant="outlined"
              />
            </div>
            <div className="flex justify-center bg-blue-400 rounded">
              <Button>
                <div style={{ color: "white" }}>Login</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
