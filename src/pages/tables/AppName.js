import React from "react";
import drop from "./drop.svg";

export const AppName = () => {
    return (
      <div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: "3rem",
            backgroundColor: "#293354",
            color: "white",
            width:"90%",
            border: "1px 1px solid #184ea3",
            position:"fixed",
          }}
        >
          Intelli-Farm <img src={drop} width={"50rem"} alt={drop} />
        </div>
      </div>
    );
  };
