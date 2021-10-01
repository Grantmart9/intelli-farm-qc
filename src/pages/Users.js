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
import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export const Users = () => (
  <div className="p-4 flex items-center justify-center align-center">
    <div className="grid grid-rows-2 gap-2">
      <div className="bg-gray-200 shadow-md rounded p-2">
        <h1 className="text-center font-bold text-lg">Register New User</h1>
        <div className="grid grid-rows-3 p-2 gap-2">
          <div>
            <TextField label="User Name" variant="outlined"></TextField>
          </div>
          <div>
            <TextField label="Password" variant="outlined"></TextField>
          </div>
          <div>
            <TextField label="Confirm Password" variant="outlined"></TextField>
          </div>
          <Button
            className="border-1 border-white text-center"
            style={{
              display: "inline-block",
              alignContent: "center",
              justifyContent: "center",
              backgroundColor: "#1e96ff",
              fontFamily: "Nunito Sans",
              color: "white",
              fontSize: "1rem",
              width: "100%"
            }}
          >
            Save
          </Button>
        </div>
      </div>
      <div className="bg-gray-200 shadow-md rounded p-2">
        <h1 className="text-center font-bold text-lg">
          Change User Credentials
        </h1>
        <div className="grid grid-rows-3 p-2 gap-2">
          <div>
            <TextField label="User Name" variant="outlined"></TextField>
          </div>
          <div>
            <TextField label="Password" variant="outlined"></TextField>
          </div>
          <div>
            <TextField label="Confirm Password" variant="outlined"></TextField>
          </div>
          <Button
            className="border-1 border-white text-center"
            style={{
              display: "inline-block",
              alignContent: "center",
              justifyContent: "center",
              backgroundColor: "#1e96ff",
              fontFamily: "Nunito Sans",
              color: "white",
              fontSize: "1rem",
              width: "100%"
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  </div>
);
