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
  var [usernamestate, usernamehandle] = useState(false);
  var [passwordstate, passwordhandle] = useState(false);

  var apiusername = username;
  var apipassword = password;

  console.log("UsernameState:" + usernamestate);
  console.log("PasswordState:" + passwordstate);
  console.log("Entered Username:" + apiusername);
  console.log("Entered Password:" + apipassword);

  axios
    .get(`https://522435bb-be54-485a-a53b-5e2e83d24e81.mock.pstmn.io/get`)
    .then((res) => {
      const login = res.data;
      const user = login.map((username) => username);
      const password = user.map(({ password }) => password);
      const userss = user.map(({ username }) => username);

      if (userss.includes(apiusername)) {
        console.log("Username Success Logging in...");
        usernamehandle((usernamestate = true));
      } else {
        console.log("Username Failed");
        usernamehandle((usernamestate = false));
      }
      if (password.includes(apipassword)) {
        console.log("Password Success Logging in...");
        passwordhandle((passwordstate = true));
      } else {
        console.log("Username Failed");
        passwordhandle((passwordstate = false));
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
