import React from "react";
import drop from "./drop.svg";
import "./AppName.css";

export const AppName = () => {
  return (
    <div>
      <div className="app">
        Intelli-Farm <img src={drop} width={"50rem"} alt={drop} />
      </div>
    </div>
  );
};
