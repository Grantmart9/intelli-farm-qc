import React from "react";
import Logo from './Logo.png';
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
    display:"inline-flex",
  },
}));

export const AppName = () => {
    return (
      <div>
        <AppBar className="classes.root" position="fixed">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              fontFamily: "'Noto Sans JP', sans-serif",
              fontSize: "3rem",
              backgroundColor: "#293354",
              color: "white",
              width: "100%",
              padding:"0.5rem",
            }}
          >
            <img width={300} src={Logo} alt={Logo}/>
          </div>
        </AppBar>
      </div>
    );
  };
