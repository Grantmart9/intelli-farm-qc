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
import PreloaderBar from "images/PreloaderBar.gif";

export const Preloader = (props) => {
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
        <img src={PreloaderBar} alt={PreloaderBar} />
      </div>
    </div>
  );
};