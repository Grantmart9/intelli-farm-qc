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
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Chip, TextField } from "@material-ui/core";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useApi, API_URL, post } from "api";
import { Preloader } from "components/Preloader";
import { Button } from "@mui/material";

// const ControlPanel = () => {
//   return (
//     <div className="grid grid-cols-3 gap-2 p-2">
//       <div className="bg-gray-400 rounded shadow-md p-2">
//         <div className="flex align-center justify-center text-xl font-bold mb-2">
//           Control Mode
//         </div>
//         <div className=" bg-gray-500 rounded flex align-center justify-center text-sm font-bold">
//           AI
//         </div>
//       </div>
//       <div className="bg-gray-400 rounded shadow-md p-2">
//         <div className="flex align-center justify-center text-xl font-bold mb-2">
//           State
//         </div>
//         <div className="bg-gray-500 rounded flex align-center justify-center text-sm font-bold">
//           Running
//         </div>
//       </div>
//     </div>
//   );
// };

const ControlPanel = ({
  value,
  onMode,
  onBlockControl,
  onProcessHold,
  onAlarmReset,
  onStop,
}) => {
  const { timestamp, mode, block_control, state, alarms } = value;
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="grid grid-cols-2 gap-2 text-left m-4">
        <div className="text-sm ">Controller Time</div>
        <Chip label={timestamp} />
        <div className="text-sm">Alarms</div>
        <Chip label={alarms} />
        <div className="text-sm">State</div>
        <Chip label={state} />
      </div>
      <ToggleButtonGroup name="mode" value={mode} onChange={onMode} exclusive>
        <ToggleButton value={"Automatic"}>Automatic</ToggleButton>
        <ToggleButton value={"Manual"}>Manual</ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        name="block_control"
        value={block_control}
        onChange={onBlockControl}
        exclusive
      >
        <ToggleButton value={"AI Control"}>AI Control</ToggleButton>
        <ToggleButton value={"Manual Date Time"}>Manual Date Time</ToggleButton>
      </ToggleButtonGroup>
      <Button variant="outlined" onClick={onProcessHold}>
        Process Hold
      </Button>
      <Button variant="outlined" onClick={onAlarmReset}>
        Alarm Reset
      </Button>
      <Button variant="outlined" onClick={onStop}>
        Stop
      </Button>
    </div>
  );
};

const BlockName = () => {
  return (
    <div className="grid grid-cols-3 gap-2 p-2 ">
      <div className="bg-gray-500 rounded shadow-md text-center pt-2">
        Crimson
      </div>
      <div className="bg-gray-500 rounded shadow-md p-2 flex">
        <TextField
          id="datetime-local"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          InputLabelProps={{
            shrink: false,
          }}
        />
      </div>
      <div className="bg-gray-500 rounded shadow-md pt-2">200min</div>
    </div>
  );
};
const TanksNames = () => {
  return (
    <div className="grid grid-rows-6 align-right">
      <div className="text-2xl font-bold mb-1">Name</div>
      <div className="text-lg font-bold">Tank: A</div>
      <div className="text-lg font-bold">Tank: B</div>
      <div className="text-lg font-bold">Tank: C</div>
      <div className="text-lg font-bold">Tank: D</div>
      <div className="text-lg font-bold">Tank: E</div>
    </div>
  );
};
const TanksValues = () => {
  return (
    <div className="grid grid-rows-6">
      <div className="text-2xl font-bold mb-1">Flow rate ℓ/mᶟ</div>
      <div className="text-lg font-bold">122.3</div>
      <div className="text-lg font-bold">211.1</div>
      <div className="text-lg font-bold">333.3</div>
      <div className="text-lg font-bold">333.3</div>
      <div className="text-lg font-bold">333.3</div>
    </div>
  );
};
const TanksEC = () => {
  return (
    <div className="grid grid-rows-6">
      <div className="text-2xl font-bold mb-1">EC Setpoint µS</div>
      <div className="text-lg font-bold">274</div>
      <div className="text-lg font-bold">166</div>
      <div className="text-lg font-bold">165</div>
      <div className="text-lg font-bold">66</div>
      <div className="text-lg font-bold">47</div>
    </div>
  );
};

const Tanks = () => {
  return (
    <div className="bg-gray-500 rounded">
      <div className="grid grid-cols-3 p-2">
        <TanksNames />
        <TanksEC />
        <TanksValues />
      </div>
    </div>
  );
};

const ControlStartStop = () => {
  return (
    <div className="rounded shadow-lg p-3 mt-2">
      <div className="grid grid-cols-3">
        <div>Name</div>
        <div>Start Time</div>
        <div>Run Time</div>
      </div>
      <div>
        <BlockName />
      </div>
      <div className="">
        <Tanks />
      </div>
    </div>
  );
};

const MODE = {
  Automatic: 1,
  Manual: 2,
};
const BLOCK_CONTROL = {
  AI: 1,
  "Manual Date Time": 2,
};

const usePost = (handle, refetch, set) =>
  useMemo(
    () =>
      (...args) => {
        set((p) => p + 1);
        return handle(...args)
          .then(() => refetch())
          .finally(() => set((p) => p - 1));
      },
    [handle, refetch, set]
  );

export const Control = () => {
  const { farmId } = useParams();
  const prefix = `${API_URL}/-${farmId}`;

  const [{ data, loading: loadingData, error }, refetch] = useApi(
    `${prefix}/controller_state`
  );

  const [, postMode] = useApi(...post(`${prefix}/mode`));
  const [, postBlockControl] = useApi(...post(`${prefix}/block_control`));
  const [, postProcessHold] = useApi(...post(`${prefix}/process_hold`));
  const [, postAlarmReset] = useApi(...post(`${prefix}/alarm_reset`));
  const [, postStop] = useApi(...post(`${prefix}/stop`));

  const [posting, setPosting] = useState(0);

  const loading = loadingData || posting > 0;

  const d = (key, value) => ({ data: { [key]: value } });

  const handleMode = usePost(
    (e, mode) => postMode(d("mode", MODE[mode])),
    refetch,
    setPosting
  );

  const handleBlockControl = usePost(
    (e, blockControl) =>
      postBlockControl(d("block_control", BLOCK_CONTROL[blockControl])),
    refetch,
    setPosting
  );

  const handleProcessHold = usePost(
    () => postProcessHold(d("process_hold", 1)),
    refetch,
    setPosting
  );

  const handleAlarmReset = usePost(
    () => postAlarmReset(d("alarm_reset", 1)),
    refetch,
    setPosting
  );

  const handleStop = usePost(() => postStop(d("stop", 1)), refetch, setPosting);

  if (!data || loading) return <Preloader />;

  return (
    <div className="p-4">
      <div className="flex flex-col align-items-center align-content-center justify-content-center p-1">
        <div className="bg-gray-400 shadow-md rounded text-2xl font-bold text-center mt-2 p-2">
          Control
          <ControlPanel
            value={data}
            onMode={handleMode}
            onBlockControl={handleBlockControl}
            onProcessHold={handleProcessHold}
            onAlarmReset={handleAlarmReset}
            onStop={handleStop}
          />
        </div>
        <div className="bg-gray-400 shadow-md rounded text-2xl font-bold text-center mt-2 p-2">
          Manual Date&Time
          <ControlStartStop />
        </div>
      </div>
    </div>
  );
};
