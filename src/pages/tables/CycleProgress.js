import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "./CycleProgress.css";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

const CycleProgress = () => {
  return (
    <form>
      <h1>Cycle Progress</h1>
      <div class="CycleCard">
      <div class="CycleProgress1">
        <div class="CycleProgress3">
          <h5>Irrigation</h5>
          <h2>Cycle Progress</h2>
          <BorderLinearProgress variant="determinate"  value={45} />
        </div>
      </div>
      <div class="CycleProgress2">
        <div class="CycleProgress3">
          <h5>Irrigation Time</h5>
          <h2>01H30M</h2>
          <h5>00H45M left</h5>
        </div>
        <div class="CycleProgress3">
          <h5>EC Average</h5>
          <h2>2.93 mS</h2>
          <h5>0.07 mS Below Target</h5>
        </div>
        <div class="CycleProgress3">
          <h5>Water Pump</h5>
          <h2>ON</h2>
          <h5>15 m3/H</h5>
        </div>
      </div>
      </div>
    </form>
  );
};
export default CycleProgress;
