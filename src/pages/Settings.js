/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 18/08/2021 - 08:45:18
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 18/08/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 220,
  },
}));

const DateAndTimePicker = () => {
  const classes = useStyles();
  return (
    <div className="p-2 block md:flex md:align-center md:justify-center md:gap-2">
      <div className="bg-gray-400 rounded shadow-md p-2">
        <TextField
          id="datetime-local"
          label="Start date"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="bg-gray-400 rounded shadow-md p-2 mt-2">
        <TextField
          id="datetime-local"
          label="End date"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </div>
  );
};

const EmailInput = () => {
  return (
    <div className="flex align-center justify-center bg-gray-400 rounded shadow-md pd-2 mt-3">
      <TextField className="w-full" label="Email Address" variant="outlined" />
    </div>
  );
};

const SaveButton = () => {
  return (
    <div className="flex align-center justify-center mt-3">
      <button
        style={{
          backgroundColor: "steelblue",
          border: "1px 1px solid steelblue",
          borderRadius: "0.2cm",
          color: "white",
          width: "5rem",
          height: "2rem",
        }}
      >
        Save
      </button>
    </div>
  );
};

export const Settings = () => {
  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:p-1 md:p-1 p-4">
        <div className="block">
          <div className="bg-gray-400 shadow-md rounded p-2 block">
            <DateAndTimePicker />
            <EmailInput />
            <SaveButton />
          </div>
        </div>
      </div>
    </div>
  );
};
