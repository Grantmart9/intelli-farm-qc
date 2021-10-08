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
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

const ControlPanel = () => {
  return (
    <div className="grid grid-cols-3 gap-2 p-2">
      <div className="bg-gray-400 rounded shadow-md p-2">
        <div className="flex align-center justify-center text-xl font-bold mb-2">
          Controller Time
        </div>
        <div className=" bg-gray-500 rounded flex align-center justify-center text-sm font-bold">
          12:12:00 07/11/21
        </div>
      </div>
      <div className="bg-gray-400 rounded shadow-md p-2">
        <div className="flex align-center justify-center text-xl font-bold mb-2">
          Control Mode
        </div>
        <div className=" bg-gray-500 rounded flex align-center justify-center text-sm font-bold">
          AI
        </div>
      </div>
      <div className="bg-gray-400 rounded shadow-md p-2">
        <div className="flex align-center justify-center text-xl font-bold mb-2">
          State
        </div>
        <div className="bg-gray-500 rounded flex align-center justify-center text-sm font-bold">
          Running
        </div>
      </div>
    </div>
  );
};
const ControlButtons = () => {
  return (
    <div className="rounded shadow-md p-1">
      <div className="grid md:grid-cols-5 gap-2 mt-3 p-2 align-center justify-center">
        <button
          type="submit"
          style={{
            backgroundColor: "steelblue",
            border: "1px 1px solid steelblue",
            borderRadius: "0.2cm",
            color: "white",
            width: "7rem",
            height: "3rem",
            fontWeight: "bold"
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
            width: "7rem",
            height: "3rem",
            fontWeight: "bold"
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
            width: "7rem",
            height: "3rem",
            fontWeight: "bold"
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
            width: "7rem",
            height: "3rem",
            fontWeight: "bold"
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
            width: "7rem",
            height: "3rem",
            fontWeight: "bold"
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

const BlockName = () => {
  return (
    <div className="grid grid-cols-3 gap-2 p-2 ">
      <div className="bg-gray-500 rounded shadow-md text-center pt-3">
        Crimson
      </div>
      <div className="bg-gray-500 rounded shadow-md p-2 flex">
        <TextField
          id="datetime-local"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          InputLabelProps={{
            shrink: false
          }}
        />
      </div>
      <div className="bg-gray-500 rounded shadow-md pt-3">200min</div>
    </div>
  );
};
const TanksNames = () => {
  return (
    <div>
      <div className="">
        <div className="grid grid-rows-5 align-right">
          <div>Tank: A</div>
          <div>Tank: B</div>
          <div>Tank: C</div>
          <div>Tank: D</div>
          <div>Tank: E</div>
        </div>
      </div>
    </div>
  );
};
const TanksValues = () => {
  return (
    <div>
      <div className="">
        <div className="grid grid-rows-5">
          <div>122.3l</div>
          <div>211.1l</div>
          <div>333.3l</div>
          <div>333.3l</div>
          <div>333.3l</div>
        </div>
      </div>
    </div>
  );
};

const Tanks = () => {
  return (
    <div className="bg-gray-500 rounded">
      <div className="grid grid-cols-2 p-2">
        <TanksNames />
        <TanksValues />
      </div>
    </div>
  );
};

const ControlStartStop = () => {
  return (
    <div className="rounded shadow-lg p-3 mt-2">
      <div className="grid grid-cols-3 gap-2 p-2">
        <div>Name</div>
        <div>Start Time</div>
        <div>Run Time</div>
      </div>
      <div>
        <BlockName />
      </div>
      <div className="p-2">
        <Tanks />
      </div>
    </div>
  );
};

export const Control = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col align-items-center align-content-center justify-content-center p-1">
        <div className="bg-gray-400 shadow-md rounded text-2xl font-bold text-center mt-2 p-2">
          Control
          <ControlPanel />
          <ControlButtons />
        </div>
        <div className="bg-gray-400 shadow-md rounded text-2xl font-bold text-center mt-2 p-2">
          Manual Date&Time
          <ControlStartStop />
        </div>
      </div>
    </div>
  );
};
