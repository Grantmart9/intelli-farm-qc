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
import { Button } from "@mui/material";
import { AxiosSpinner } from "components/AxiosSpinner";
import { Preloader } from "components/Preloader";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
        <div className="text-2xl ">Controller Time:</div>
        <div className="text-md"> {timestamp}</div>
        <div className="text-2xl">Alarms:</div>
        <div className="text-md"> {alarms}</div>
        <div className="text-2xl">State:</div>
        <div className="text-md"> {state}</div>
      </div>
      <div className="grid grid-cols-3 gap-2 bg-gray-400 rounded shadow-md p-2">
        <div className="grid grid-rows-2 gap-2">
          <Button
            onClick={onMode}
            value={mode}
            variant="contained"
            color="primary"
          >
            Manual
          </Button>
          <Button
            onClick={onMode1}
            value={mode}
            variant="contained"
            color="success"
          >
            Automatic
          </Button>
        </div>
        <div className="grid grid-rows-2 gap-2">
          <Button
            onClick={onBlockControl1}
            value={block_control}
            variant="contained"
            color="primary"
          >
            Manual Date & Time
          </Button>

          <Button
            onClick={onBlockControl}
            value={block_control}
            variant="contained"
            color="success"
          >
            AI Control
          </Button>
        </div>
        <div className="grid grid-rows-3 gap-1 p-2">
          <Button color="info" variant="contained" onClick={onProcessHold}>
            Process Hold
          </Button>
          <Button color="info" variant="contained" onClick={onAlarmReset}>
            Alarm Reset
          </Button>
          <Button color="info" variant="contained" onClick={onStop}>
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

const Tab = ({ data }) => {
  return (
    <div className="px-2 pb-2">
      <div className="bg-white flex align-center justify-center font-bold text-2xl p-2 rounded mb-2">
        {data.name}
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Start Time: {data.start_time_01}</TableCell>
              <TableCell align="right">Run Time: {data.runtime_01}</TableCell>
              <TableCell align="right">EC Setpoint: {data.ec_01}</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Flow m³/h</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tank A</TableCell>
                <TableCell align="right">{data.tank_a_flow_01}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tank B</TableCell>
                <TableCell align="right">{data.tank_b_flow_01}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tank C</TableCell>
                <TableCell align="right">{data.tank_c_flow_01}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tank D</TableCell>
                <TableCell align="right">{data.tank_d_flow_01}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tank E</TableCell>
                <TableCell align="right">{data.tank_e_flow_01}</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
      <div className="mt-2">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Start Time: {data.start_time_02}</TableCell>
                <TableCell align="right">Run Time: {data.runtime_02}</TableCell>
                <TableCell align="right">EC Setpoint: {data.ec_02}</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Flow m³/h</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tank A</TableCell>
                <TableCell align="right">{data.tank_a_flow_02}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tank B</TableCell>
                <TableCell align="right">{data.tank_b_flow_02}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tank C</TableCell>
                <TableCell align="right">{data.tank_c_flow_02}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tank D</TableCell>
                <TableCell align="right">{data.tank_d_flow_02}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tank E</TableCell>
                <TableCell align="right">{data.tank_e_flow_02}</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
      <div className="mt-2">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Start Time: {data.start_time_03}</TableCell>
                <TableCell align="right">Run Time: {data.runtime_03}</TableCell>
                <TableCell align="right">EC Setpoint: {data.ec_03}</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Flow m³/h</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tank A</TableCell>
                <TableCell align="right">{data.tank_a_flow_03}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tank B</TableCell>
                <TableCell align="right">{data.tank_b_flow_03}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tank C</TableCell>
                <TableCell align="right">{data.tank_c_flow_03}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tank D</TableCell>
                <TableCell align="right">{data.tank_d_flow_03}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tank E</TableCell>
                <TableCell align="right">{data.tank_e_flow_03}</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
      <div className="mt-2">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Start Time: {data.start_time_04}</TableCell>
                <TableCell align="right">Run Time: {data.runtime_04}</TableCell>
                <TableCell align="right">EC Setpoint: {data.ec_04}</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Flow m³/h</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tank A</TableCell>
                <TableCell align="right">{data.tank_a_flow_04}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tank B</TableCell>
                <TableCell align="right">{data.tank_b_flow_04}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tank C</TableCell>
                <TableCell align="right">{data.tank_c_flow_04}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tank D</TableCell>
                <TableCell align="right">{data.tank_d_flow_04}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tank E</TableCell>
                <TableCell align="right">{data.tank_e_flow_04}</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

const Tables = ({ data }) =>
  data.map((name, i) => (
    <div key={i} className="block mt-2">
      <Tab data={name} />
    </div>
  ));

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
            <div>
              <AxiosSpinner
                callHook={(use) =>
                  use(`${API_URL}/${farmId}/manual_datetime_settings`)
                }
                renderData={Tables}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
