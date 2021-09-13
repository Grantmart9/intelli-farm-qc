import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Logo from "images/Logo.png";
import { Navbar as Nav, Button } from "@themesberg/react-bootstrap";
import { SidebarContext } from "components/Sidebar";

export const Navbar = () => {
  const [, setShow] = useContext(SidebarContext);
  const toggleShow = () => {
    setShow((show) => !show);
  };

  return (
    <AppBar position="static">
      <div
        className="flex align-items-center w-full"
        style={{
          fontFamily: "'Noto Sans JP', sans-serif",
          fontSize: "3rem",
          backgroundColor: "#1e96ff",
          color: "white",
          padding: "0.5rem",
        }}
      >
        <button className="btn" onClick={toggleShow}>
          <span className="navbar-toggler-icon" />
        </button>
        <div className="flex-grow-1 flex justify-content-center">
          <img width={250} src={Logo} alt={Logo} />
        </div>
      </div>
    </AppBar>
  );
};
