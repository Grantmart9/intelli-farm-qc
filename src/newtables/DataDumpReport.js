import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./DataDump.css";

const DataDumpReport = () => {
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

  const classes = useStyles();

  return (
    <form>
      <h1>Data Dump Report</h1>
      <div class="DataDumpCard">
        <div class="DataDumpText">
          <TextField
            id="datetime-local"
            label="Start Date"
            type="datetime-local"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div class="DataDumpText2">
            <TextField
              id="standard-basic"
              label="Your Email Address"
              variant="outlined"
            ></TextField>
          </div>
        </div>
        <div class="DataDumpText">
          <TextField
            id="datetime-local"
            label="End Date"
            type="datetime-local"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div class="DataDumpText2">
            <Button variant="contained" color="primary">
              SEND
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default DataDumpReport;
