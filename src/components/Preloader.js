/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 27/08/2021 - 11:36:57
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 27/08/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Ripple } from "react-preloaders";

const Preloader = (props) => {
  return (
    <div
      style={{
        display: "flex",
        marginTop: "100px",
        minHeight: "600px",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <CircularProgress
          color={"primary"}
          size={200}
          style={{ color: "gray" }}
        />
      </div>
    </div>
  );
};

export default Preloader;
