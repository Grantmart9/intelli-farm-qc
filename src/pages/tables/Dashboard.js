import React from "react";
import useAxios from "axios-hooks";
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
export const IrrigationCycle = () =>{
  return (
    <div className="CycleProgress4">
      <h1 style={title}>Irrigation</h1>
      <h4 style={title2}>Cycle Progress</h4>
      <BorderLinearProgress variant="determinate" value={45} />
    </div>
  );
};
export const IrrigationTimeLeft = () => {
  return (
    <div className="CycleProgress3">
      <h1 style={title}>Irrigation Time Left</h1>
      <h2 style={title2}>00H45M left</h2>
    </div>
  );
};
export const ECAverage = () => {
  return (
    <div className="CycleProgress3">
      <h1 style={title}>EC Average</h1>
      <h2 style={title2}>2.93 mS</h2>
      <h1 style={title3}>0.07 mS Below Target</h1>
    </div>
  );
};
export const WaterPump = () => {
  return (
    <div className="CycleProgress3">
      <h1 style={title}>Water Pump</h1>
      <h2 style={title2}>ON</h2>
      <h1 style={title3}>15 m3/H</h1>
    </div>
  );
};
export const CycleProgresss = () => {
  return (
    <>
      <div className="CycleCard">
        <div className="CycleProgress1">
          <IrrigationCycle/>
        </div>
        <div className="CycleProgress2">
          <IrrigationTimeLeft/>
          <ECAverage/>
          <WaterPump/>
        </div>
      </div>
    </>
  );
};

export const Dashboard = ()=> {
  const [{ data, loading, error }] = useAxios(
    `https://lodicon-test-api.herokuapp.com/api/v1/2147483551/dashboard`
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const IrrigationData = data.irrigation_data;
  const CycleProgress = IrrigationData.cycle_progress;
  const ECData = IrrigationData.ec_data;
  const ECAverage = ECData.average;
  const ECSetpoint = ECData.setpoint;
  const ECValue = ECData.value;
  
  return (
    <div style={{ marginLeft: "10rem", marginTop: "2rem" }}>
      <CycleProgresss />
      <div style={{background:"white",border:'2px solid grey',borderRadius:'0.2cm'}}>
        <h4>Cycle Progress: {CycleProgress}</h4>
        <h4>EC Average: {ECAverage}</h4>
        <h4>EC Setpoint: {ECSetpoint}</h4>
        <h4>EC Value: {ECValue}</h4>
      </div>
    </div>
  );
};
