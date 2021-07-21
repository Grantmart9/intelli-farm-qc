import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import {withStyles} from "@material-ui/core/styles";
import './Dashboard.css';

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
    backgroundColor: "#05ab24",
  },
}))(LinearProgress);

const CycleProgress = () => {
  const title2 = {
    color: "black",
    fontFamily: "Times New Roman",
    fontWeight: 600,
    fontSize: "1.4rem",
  };
  const title = {
    color: "black",
    fontFamily: "Times New Roman",
    fontWeight: 400,
    fontSize: "1rem",
  };
  const title3 = {
    color: "black",
    fontFamily: "Times New Roman",
    fontWeight: 500,
    fontSize: "0.8rem",
  };

  return (
    <form>
      <div className="CycleCard">
        <div className="CycleProgress1">
          <div className="CycleProgress4">
            <h1 style={title}>Irrigation</h1>
            <h4 style={title2}>Cycle Progress</h4>
            <BorderLinearProgress variant="determinate" value={45} />
          </div>
        </div>
        <div className="CycleProgress2">
          <div className="CycleProgress3">
            <h1 style={title}>Irrigation Time Left</h1>
            <h2 style={title2}>00H45M left</h2>
          </div>
          <div className="CycleProgress3">
            <h1 style={title}>EC Average</h1>
            <h2 style={title2}>2.93 mS</h2>
            <h1 style={title3}>0.07 mS Below Target</h1>
          </div>
          <div className="CycleProgress3">
            <h1 style={title}>Water Pump</h1>
            <h2 style={title2}>ON</h2>
            <h1 style={title3}>15 m3/H</h1>
          </div>
        </div>
      </div>
    </form>
  );
};
export const Dashboard = ()=> {

  return (
    <div style={{marginLeft:'10rem',marginTop:'2rem'}}>
      <CycleProgress/>
    </div>
  );
};
