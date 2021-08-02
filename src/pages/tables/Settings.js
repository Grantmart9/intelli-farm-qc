import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/TextField";
import { AppName } from "./Dashboard";

const Form = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <div
        style={{
          display: "block",
          width: "20%",
          background: "white",
          padding: "1rem",
          border: "solid white",
          borderRadius: "0.2cm"
        }}
      >
        <h3
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          Sensor name
        </h3>
        <TextField id="outlined-basic" variant="outlined" />
        <h3
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          Sensor enabled
        </h3>
        <input type="checkbox"></input>
        <h3
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          Unit
        </h3>
        <TextField id="outlined-basic" variant="outlined" />
        <h3
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          Pulse Weight
        </h3>
        <TextField id="outlined-basic" variant="outlined" />
        <h3
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          High Alarm
        </h3>
        <input type="checkbox"></input>
        <h3
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          High Alarm Setting
        </h3>
        <TextField id="outlined-basic" variant="outlined" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          <button style={{background:"steelblue",padding:"0.2rem"}}>Save</button>
        </div>
      </div>
    </div>
  );
};

export const Settings = () => {
  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <AppName />
      <Form />
    </div>
  );
};
