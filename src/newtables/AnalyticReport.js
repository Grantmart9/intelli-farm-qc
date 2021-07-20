import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import "./AnalyticReport.css";

const AnalyticReport = () => {
  return (
    <form>
      <h1>Analytic Report</h1>
      <div class="AnalyticReportCard">
        <div class="Analyticblock1">
          <TextField
            id="standard-basic"
            label="Your Email Address"
            variant="outlined"
          ></TextField>
          <FormControlLabel
            control={<Switch color="primary" />}
            label="Automated Weekly Report"
            labelPlacement="start"
            style={{ color: "#37474f" }}
          />
          <FormControlLabel
            control={<Switch color="primary" />}
            label="Automated Monthly Report"
            labelPlacement="start"
            style={{ color: "#37474f" }}
          />
        </div>
        <span class="buttonposition">
          <Button variant="contained" color="primary">
            SEND
          </Button>
        </span>
      </div>
    </form>
  );
};
export default AnalyticReport;
