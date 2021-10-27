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
import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useApi, API_URL, post } from "api";
import { Preloader } from "components/Preloader";
import { Button } from "@mui/material";
import FarmTable from "./ControlGrid";

const ControlPanel = ({
  value,
  onMode,
  onMode1,
  onBlockControl,
  onBlockControl1,
  onProcessHold,
  onAlarmReset,
  onStop
}) => {
  const { timestamp, mode, block_control, state, alarms } = value;
  return (
    <div className="block items-center p-1">
      <div className="grid grid-cols-2 gap-2 text-left p-2 bg-gray-400 rounded shadow-md mb-2">
        <div className="text-2xl ">Controller Time</div>
        <div className="text-md">{timestamp}</div>
        <div className="text-2xl">Alarms</div>
        <div className="text-md">{alarms}</div>
        <div className="text-2xl">State</div>
        <div className="text-md">{state}</div>
      </div>
      <div className="bg-gray-400 rounded shadow-md p-2">
        <div className="block align-center">
          <div className="ml-2">
            <Button
              onClick={onMode}
              value={mode}
              variant="contained"
              color="primary"
            >
              Manual
            </Button>
          </div>
          <div className="ml-2">
            <Button
              onClick={onMode1}
              value={mode}
              variant="contained"
              color="success"
            >
              Automatic
            </Button>
          </div>
          <div className="mt-2 ml-2">
            <Button
              onClick={onBlockControl1}
              value={block_control}
              variant="contained"
              color="primary"
            >
              Manual Date & Time
            </Button>
          </div>
          <div className="ml-2">
            <Button
              onClick={onBlockControl}
              value={block_control}
              variant="contained"
              color="success"
            >
              AI Control
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 p-2">
          <Button color="info" variant="contained" onClick={onProcessHold}>
            Process Hold
          </Button>
          <Button color="warning" variant="contained" onClick={onAlarmReset}>
            Alarm Reset
          </Button>
          <Button color="error" variant="contained" onClick={onStop}>
            Stop
          </Button>
        </div>
      </div>
    </div>
  );
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

  const [{ data, loading: loadingData }, refetch] = useApi(
    `${prefix}/controller_state`
  );
  const [, postMode1] = useApi(...post(`${prefix}/mode`));
  const [, postMode] = useApi(...post(`${prefix}/mode`));
  const [, postBlockControl1] = useApi(...post(`${prefix}/block_control`));
  const [, postBlockControl] = useApi(...post(`${prefix}/block_control`));
  const [, postProcessHold] = useApi(...post(`${prefix}/process_hold`));
  const [, postAlarmReset] = useApi(...post(`${prefix}/alarm_reset`));
  const [, postStop] = useApi(...post(`${prefix}/stop`));

  const [posting, setPosting] = useState(0);

  const loading = loadingData || posting > 0;

  const d = (key, value) => ({ data: { [key]: value } });

  const handleMode = usePost(() => postMode(d("mode", 2)), refetch, setPosting);
  ///
  const handleMode1 = usePost(
    () => postMode1(d("mode", 1)),
    refetch,
    setPosting
  );
  ///
  const handleBlockControl = usePost(
    () => postBlockControl(d("block_control", 1)),
    refetch,
    setPosting
  );
  ///
  const handleBlockControl1 = usePost(
    () => postBlockControl1(d("block_control", 2)),
    refetch,
    setPosting
  );
  ///

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
    <div className="flex flex-col p-4">
      <div className="align-items-center align-content-center justify-content-center p-1">
        <div className="bg-gray-400 shadow-md rounded text-2xl font-bold text-center mt-2 p-2">
          <ControlPanel
            value={data}
            onMode={handleMode}
            onMode1={handleMode1}
            onBlockControl={handleBlockControl}
            onBlockControl1={handleBlockControl1}
            onProcessHold={handleProcessHold}
            onAlarmReset={handleAlarmReset}
            onStop={handleStop}
          />
        </div>
        <div className="p-2">
          <div className="bg-gray-400 rounded shadow-md p-2">
            <FarmTable />
          </div>
        </div>
      </div>
    </div>
  );
};
