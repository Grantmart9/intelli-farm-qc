/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 07/10/2021 - 09:26:16
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 07/10/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@themesberg/react-bootstrap";

export const Control = () => (
  <div className="absolute inset-0 flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="bg-gray-400 rounded shadow-md p-2">
        <div className="grid grid-cols-3 gap-2 p-2">
          <div className="bg-gray-400 rounded shadow-md p-2">
            <div className="flex align-center justify-center text-xl font-bold mb-2">
              Controller Time
            </div>
            <div className=" bg-gray-500 rounded flex align-center justify-center text-md font-bold">
              12:12:00 07/11/21
            </div>
          </div>
          <div className="bg-gray-400 rounded shadow-md p-2">
            <div className="flex align-center justify-center text-xl font-bold mb-2">
              Control Mode
            </div>
            <div className=" bg-gray-500 rounded flex align-center justify-center text-md font-bold">
              AI
            </div>
          </div>
          <div className="bg-gray-400 rounded shadow-md p-2">
            <div className="flex align-center justify-center text-xl font-bold mb-2">
              State
            </div>
            <div className="bg-gray-500 rounded flex align-center justify-center text-md font-bold">
              Running
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2 mt-3 p-2">
          <button
            type="submit"
            style={{
              backgroundColor: "steelblue",
              border: "1px 1px solid steelblue",
              borderRadius: "0.2cm",
              color: "white",
              width: "5rem",
              height: "3rem"
            }}
          >
            AI
          </button>
          <button
            type="submit"
            style={{
              backgroundColor: "steelblue",
              border: "1px 1px solid steelblue",
              borderRadius: "0.2cm",
              color: "white",
              width: "5rem",
              height: "3rem"
            }}
          >
            Manual
          </button>
          <button
            type="submit"
            style={{
              backgroundColor: "steelblue",
              border: "1px 1px solid steelblue",
              borderRadius: "0.2cm",
              color: "white",
              width: "5rem",
              height: "3rem"
            }}
          >
            Hold
          </button>
          <button
            type="submit"
            style={{
              backgroundColor: "steelblue",
              border: "1px 1px solid steelblue",
              borderRadius: "0.2cm",
              color: "white",
              width: "5rem",
              height: "3rem"
            }}
          >
            Stop
          </button>
          <button
            type="submit"
            style={{
              backgroundColor: "steelblue",
              border: "1px 1px solid steelblue",
              borderRadius: "0.2cm",
              color: "white",
              width: "5rem",
              height: "3rem"
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  </div>
);
