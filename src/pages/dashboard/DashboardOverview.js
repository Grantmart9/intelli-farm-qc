import React from "react";
import { AppName } from "./AppName";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const DashboardOverview = () => {
  return (
    <div style={{ display: "block", backgroundColor: "#cad3de" }}>
      <AppName />
      <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:mt-0 md:mt-16 xl:mt-16 2xl:mt-16 sm:p-1 md:p-1 p-1 justify-center flex">
        <div className="inline-flex mt-3">
          <div className="bg-gray-200 rounded shadow-md p-2 ">
            <div className="font-bold mb-2 flex justify-center">
              Credentials
            </div>
            <div className="mb-2 flex justify-center">
              <TextField label="User Name" variant="outlined" />
            </div>
            <div className="mb-2 block">
              <TextField label="Password" variant="outlined" />
            </div>
            <div className="flex justify-center bg-blue-400 rounded">
              <Button>Login</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
