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
import { useRefetch } from "components/Timer";
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
import { number } from "prop-types";

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
        <div className="text-2xl">Mode:</div>
        <div className="text-md"> Manual</div>
        <div className="text-2xl font-sans">{mode}</div>
        <div className="text-md font-sans"> {block_control}</div>
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
        <div className="grid grid-rows-3 gap-2">
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

const Tab = ({ data }) => {
  const { farmId } = useParams();
  const prefix = `${API_URL}/${farmId}`;
  const [, postMode] = useApi(...post(`${prefix}/manual_datetime_settings`));
  
  var names = data.name;
  const [start_time_01, SetStartTime01] = useState(data.start_time_01);
  const [start_time_02, SetStartTime02] = useState(data.start_time_02);
  const [start_time_03, SetStartTime03] = useState(data.start_time_03);
  const [start_time_04, SetStartTime04] = useState(data.start_time_04);

  const [runtime_01, SetRunTime01] = useState(data.runtime_01);
  const [runtime_02, SetRunTime02] = useState(data.runtime_02);
  const [runtime_03, SetRunTime03] = useState(data.runtime_03);
  const [runtime_04, SetRunTime04] = useState(data.runtime_04);

  const [ec_01, SetEc01] = useState(data.ec_01);
  const [ec_02, SetEc02] = useState(data.ec_02);
  const [ec_03, SetEc03] = useState(data.ec_03);
  const [ec_04, SetEc04] = useState(data.ec_04);
  

  var dict={
    name: names,
    start_time_01: data.start_time_01,
    runtime_01: data.runtime_01,
    tank_a_flow_01: data.tank_a_flow_01,
    tank_b_flow_01: data.tank_b_flow_01,
    tank_c_flow_01: data.tank_c_flow_01,
    tank_e_flow_01: data.tank_e_flow_01,
    ec_01: data.ec_01,
    start_time_02: data.start_time_02,
    runtime_02: data.runtime_02,
    tank_a_flow_02: data.tank_a_flow_02,
    tank_b_flow_02: data.tank_b_flow_02,
    tank_c_flow_02: data.tank_c_flow_02,
    tank_e_flow_02: data.tank_e_flow_02,
    start_time_03: data.start_time_03,
    runtime_03: data.runtime_03,
    start_time_04: data.start_time_04,
    runtime_04: data.runtime_04,
    ec_02 : data.ec_02,
    ec_03 : data.ec_03,
    ec_04 : data.ec_04,
    tank_a_flow_03: data.tank_a_flow_03,
    tank_a_flow_04: data.tank_a_flow_04,
    tank_b_flow_03: data.tank_b_flow_03,
    tank_b_flow_04: data.tank_b_flow_04,
    tank_c_flow_03: data.tank_c_flow_03,
    tank_c_flow_04: data.tank_c_flow_04,
    tank_e_flow_03: data.tank_e_flow_03,
    tank_e_flow_04: data.tank_e_flow_04
  };
  console.log(dict)

  const handleSave = () => postMode({key:"hello"},{data:dict});

  return (
    <div className="px-2 pb-2">
      <div className="flex align-center justify-center p-2 rounded mb-2">
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </div>
      <div className="bg-blue-200 flex align-center justify-center font-bold text-2xl p-2 rounded mb-2">
        {data.name}
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>
                Start Time:
                <input
                  type="text"
                  value={start_time_01}
                  onChange={(e) => SetStartTime01(e.target.value)}
                />
              </TableCell>
              <TableCell
                align="right"
                style={{ fontWeight: "bold" }}
                children="data.start_time_01"
              >
                Run Time:{" "}
                <input
                  type="text"
                  value={runtime_01}
                  onChange={(e) => SetRunTime01(e.target.value)}
                />
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                EC Setpoint:{" "}
                <input
                  type="text"
                  value={ec_01}
                  onChange={(e) => SetEc01(e.target.value)}
                />
              </TableCell>
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
                <TableCell>
                  Start Time:{" "}
                  <input
                    type="text"
                    value={start_time_02}
                    onChange={(e) => SetStartTime02(e.target.value)}
                  />
                </TableCell>
                <TableCell align="right">
                  Run Time:{" "}
                  <input
                    type="text"
                    value={runtime_02}
                    onChange={(e) => SetRunTime02(e.target.value)}
                  />
                </TableCell>
                <TableCell align="right">
                  EC Setpoint:{" "}
                  <input
                    type="text"
                    value={ec_02}
                    onChange={(e) => SetEc02(e.target.value)}
                  />
                </TableCell>
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
                <TableCell>
                  Start Time:{" "}
                  <input
                    type="text"
                    value={start_time_03}
                    onChange={(e) => SetStartTime03(e.target.value)}
                  />
                </TableCell>
                <TableCell align="right">
                  Run Time:{" "}
                  <input
                    type="text"
                    value={runtime_03}
                    onChange={(e) => SetRunTime03(e.target.value)}
                  />
                </TableCell>
                <TableCell align="right">
                  EC Setpoint:{" "}
                  <input
                    type="text"
                    value={ec_03}
                    onChange={(e) => SetEc03(e.target.value)}
                  />
                </TableCell>
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
                <TableCell>
                  Start Time:{" "}
                  <input
                    type="text"
                    value={start_time_04}
                    onChange={(e) => SetStartTime04(e.target.value)}
                  />
                </TableCell>
                <TableCell align="right">
                  Run Time:{" "}
                  <input
                    type="text"
                    value={runtime_04}
                    onChange={(e) => SetRunTime04(e.target.value)}
                  />
                </TableCell>
                <TableCell align="right">
                  EC Setpoint:{" "}
                  <input
                    type="text"
                    value={ec_04}
                    onChange={(e) => SetEc04(e.target.value)}
                  />
                </TableCell>
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
  useRefetch(refetch);
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
        <div className="p-2">
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
