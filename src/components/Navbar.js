import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Logo from "images/Logo.png";

export const Navbar = () => (
  <AppBar position="static">
    <div
      className="flex align-items-center align-content-center justify-content-center w-full"
      style={{
        fontFamily: "'Noto Sans JP', sans-serif",
        fontSize: "3rem",
        backgroundColor: "#1e96ff",
        color: "white",
        padding: "0.5rem",
      }}
    >
      <img width={250} src={Logo} alt={Logo} />
    </div>
  </AppBar>
);
