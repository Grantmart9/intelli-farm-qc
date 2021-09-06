/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 17/08/2021 - 14:05:27
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 17/08/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React from "react";
import Logo from "../../images/Logo.png";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
    display: "inline-flex",
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
            backgroundColor: "#1e96ff",
            color: "white",
            width: "100%",
            padding: "0.5rem",
          }}
        >
          <img width={250} src={Logo} alt={Logo} />
        </div>
      </AppBar>
    </div>
  );
};
