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
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useRefetch } from "components/Timer";
import { useParams } from "react-router-dom";
import { useApi, API_URL, post } from "api";
import { Button } from "@mui/material";
import { Preloader } from "components/Preloader";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ControlPanel = ({}) => {
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

  const onMode = usePost(() => postMode(d("mode", 2)), refetch, setPosting);
  ///
  const onMode1 = usePost(() => postMode1(d("mode", 1)), refetch, setPosting);
  ///
  const onBlockControl = usePost(
    () => postBlockControl(d("block_control", 1)),
    refetch,
    setPosting
  );
  ///
  const onBlockControl1 = usePost(
    () => postBlockControl1(d("block_control", 2)),
    refetch,
    setPosting
  );
  ///

  const onProcessHold = usePost(
    () => postProcessHold(d("process_hold", 1)),
    refetch,
    setPosting
  );

  const onAlarmReset = usePost(
    () => postAlarmReset(d("alarm_reset", 1)),
    refetch,
    setPosting
  );

  const onStop = usePost(() => postStop(d("stop", 1)), refetch, setPosting);

  if (!data || loading) return <Preloader />;

  const { timestamp, mode, block_control, state, alarms } = data;

  return (
    <div className="block items-center p-1">
    <div className="mb-2 ">
      <TableContainer component={Paper} sx={{backgroundColor:"#eaedf2"}}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell  align="center">Controller Time</TableCell>
            <TableCell   align="center">Alarms</TableCell>
            <TableCell   align="center">State</TableCell>
            <TableCell    align="center">Mode</TableCell>
            <TableCell   align="center">Control</TableCell>
          </TableRow>
        </TableHead>
          <TableCell align="center">
            {timestamp}
          </TableCell>
          <TableCell align="center">
          {alarms}
          </TableCell>
          <TableCell align="center">
           {state}
          </TableCell>
          <TableCell align="center">
            {mode}
          </TableCell>
          <TableCell align="center">
            {block_control}
          </TableCell>
        </Table>
      </TableContainer>
      </div>
      <div className="grid grid-cols-3 gap-2 bg-gray-400 rounded shadow-md p-2">
        <div className="grid grid-rows-2 gap-2">
          <Button
            onClick={onMode}
            value={mode}
            variant="contained"
            color="primary"
          >
            <div className="text-xs">Manual</div>
          </Button>
          <Button
            onClick={onMode1}
            value={mode}
            variant="contained"
            color="success"
          >
            <div className="text-xs">Automatic</div>
          </Button>
        </div>
        <div className="grid grid-rows-2 gap-2">
          <Button
            onClick={onBlockControl1}
            value={block_control}
            variant="contained"
            color="primary"
          >
            <div className="text-xs">Manual Date & Time</div>
          </Button>

          <Button
            onClick={onBlockControl}
            value={block_control}
            variant="contained"
            color="success"
          >
            <div className="text-xs">AI Control</div>
          </Button>
        </div>
        <div className="grid grid-rows-3 gap-2">
          <Button color="info" variant="contained" onClick={onProcessHold}>
            <div className="text-xs">Process Hold</div>
          </Button>
          <Button color="warning" variant="contained" onClick={onAlarmReset}>
            <div className="text-xs">Alarm Reset</div>
          </Button>
          <Button color="error" variant="contained" onClick={onStop}>
            <div className="text-xs">Stop</div>
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

const zeroPad = (number, zeros) => number.toString().padStart(zeros, "0");

const ControlGroup = ({ index, value, onChange }) => {

  
  return (
    <div className="mt-2">
      <TimeControl index={index} value={value} onChange={onChange} />
      <Tank index={index} value={value} onChange={onChange} />
    </div>
  );
};

const TimeControl = ({ index, value, onChange }) => {
  const [start_time, runtime, ec] = ["start_time", "runtime", "ec"].map(
    (k) => `${k}_${zeroPad(index, 2)}`
  );

  const handleStartTime = (d) => {
    onChange({ ...value, [start_time]: d });
  };
  const handleRunTime = (d) => {
    onChange({ ...value, [runtime]: d });
  };
  const handleEC = (d) => {
    onChange({ ...value, [ec]: d });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell  variant="head" align="center"><ArrowDownwardIcon fontSize="small" /> EC Setpoint   |</TableCell>
            <TableCell  variant="head"  align="center"><ArrowDownwardIcon fontSize="small" /> Run Time   |</TableCell>
            <TableCell   variant="head"  align="center"><ArrowDownwardIcon fontSize="small" /> Start Time   |</TableCell>
          </TableRow>
        </TableHead>
          <TableCell>
            <div className="text-sm flex align-center justify-center">
              <input
                variant="standard"
                type="text"
                value={value[ec]}
                onChange={(e) => handleEC(e.target.value)}
              />
            </div>
          </TableCell>
          <TableCell>
            <div className="text-sm flex align-center justify-center">
              <input
                variant="standard"
                type="number"
                value={value[runtime]}
                onChange={(e) => handleRunTime(e.target.value)}
              />
            </div>
          </TableCell>
          <TableCell align="center">
            <div className="text-sm flex align-center justify-center">
              <input
                variant="standard"
                type="datetime-local"
                value={value[start_time]}
                onChange={(e) => handleStartTime(e.target.value)}
                sx={{ minWidth: 21 }}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
          </TableCell>
        </Table>
      </TableContainer>
    </>
  );
};
const Tank = ({ index, value, onChange }) => {
  const tanks = ["a", "b", "c", "d", "e"].map((letter) => ({
    name: `Tank ${letter.toUpperCase()}`,
    field: `tank_${letter}_flow_${zeroPad(index, 2)}`
  }));

  const handleFlowRate = (field, d) => {
    onChange({ ...value, [field]: d });
  };

  return (
    <div>
      <div className="bg-blue-200 align-center text-xl justify-center flex font-bold p-1">
        Fertilizer
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Flow ℓ/m³</TableCell>
            </TableRow>
            {tanks.map((tank, i) => (
              <TableRow key={i}>
                <TableCell>{tank.name}</TableCell>
                <TableCell align="right">
                  <input
                    type="text"
                    className="text-right"
                    value={value[tank.field]}
                    onChange={(e) => handleFlowRate(tank.field, e.target.value)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
};

const Tab = ({ value, onChange, onSave }) => {


   
  const CONTROL_GROUPS = [1, 2, 3, 4];

  return (
    <div className="px-2 pb-2">
      <div className="flex align-center justify-center p-2 rounded mb-2">
        <Button onClick={() => onSave()} color="primary" variant="contained">
          Save
        </Button>
      </div>
      <div className="bg-blue-200 flex align-center justify-center font-bold text-2xl p-1 rounded">
        {value.name}
      </div>
      {CONTROL_GROUPS.map((i) => (
        <ControlGroup
          key={i}
          index={i}
          value={value}
          onChange={(d) => onChange(d)}
        />
      ))}
    </div>
  );
};

const setAt = (arr, idx, val) =>
  [arr.slice(0, idx), [val], arr.slice(idx + 1, arr.length)].flat();

const Tables = () => {
  const { farmId } = useParams();
  const prefix = `${API_URL}/${farmId}`;

  const [{ data, loading }, refetch] = useApi(
    `${API_URL}/${farmId}/manual_datetime_settings`
  );
  const [, postMode] = useApi(...post(`${prefix}/manual_datetime_settings`));

  const [value, setValue] = useState(null);
  useEffect(() => {
    if (data) {
      setValue(data);
    }
  }, [data]);

  const handleSave = useCallback(() => {
    postMode({ data: value }).then(() => refetch());
  }, [value]);

  const handleChange = useCallback(
    (datum) => {
      const { index } = datum;
      setValue(setAt(value, index, datum));
    },
    [value]
  );

  if (!value || loading) return <Preloader />;

  return value.map((datum, i) => (
    <div key={i} className="block ">
     
      <Tab
        value={{ ...datum, index: i }}
        onChange={handleChange}
        onSave={handleSave}
      />
    </div>
  ));
};

export const Control = () => {
  return (
    <div className="flex flex-col p-3">
      <div className="align-items-center align-content-center justify-content-center p-1">
        <div className="p-2">
          <div className="bg-gray-400 shadow-md rounded text-2xl font-bold text-center p-2">
            <ControlPanel />
          </div>
        </div>
        <div className="p-2">
          <div className="bg-gray-400 rounded shadow-md p-2">
            <div>
              <Tables />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
