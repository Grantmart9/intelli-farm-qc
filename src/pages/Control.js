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
import { useApi, post } from "api";
import { Button } from "@mui/material";
import { Preloader } from "components/Preloader";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Switch from "@mui/material/Switch";

const ControlPanel = ({}) => {
  const { farmId } = useParams();
  const prefix = `/-${farmId}`;
  const [{ data, loading: loadingData }, refetch] = useApi(
    `${prefix}/controller_state`
  );
  useRefetch(refetch, true, 10000);

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

  const defaultData = {
    timestamp: "2021-11-10-14:28:11",
    mode: "Manual",
    block_control: "Manual Date Time",
    state: "unknown",
    alarms: "Inactive",
  };

  const { timestamp, mode, block_control, state, alarms } = data || defaultData;

  return (
    <div className="block items-center p-1">
      <div className="mb-2 ">
        <TableContainer component={Paper} sx={{ backgroundColor: "#eaedf2" }}>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      display: "inline-flex",
                      fontFamily: "Nunito Sans",
                    }}
                  >
                    Controller Time
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      display: "inline-flex",
                      fontFamily: "Nunito Sans",
                    }}
                  >
                    Alarms
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      display: "inline-flex",
                      fontFamily: "Nunito Sans",
                    }}
                  >
                    State
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      display: "inline-flex",
                      fontFamily: "Nunito Sans",
                    }}
                  >
                    Mode
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      display: "inline-flex",
                      fontFamily: "Nunito Sans",
                    }}
                  >
                    Control
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableCell align="center">{timestamp}</TableCell>
            <TableCell align="center">{alarms}</TableCell>
            <TableCell align="center">{state}</TableCell>
            <TableCell align="center">{mode}</TableCell>
            <TableCell align="center">{block_control}</TableCell>
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

const MixManager2 = () => {
  const { farmId } = useParams();

  const prefix = `/-${farmId}`;

  const [{ data, loading }, refetch] = useApi(`${prefix}/fertilizer_manager`);

  const [, postMode] = useApi(...post(`${prefix}/fertilizer_manager`));

  const [New, setNew] = useState(data);

  console.log(New);

  const handleSave = useCallback(() => {
    postMode({ data: New }).then(() => refetch());
  }, [New]);

  useEffect(() => {
    if (data) {
      setNew(data);
    }
  }, [data]);

  if (!New || loading) return <Preloader />;

  return (
    <div className="block md:grid grid-cols-2 gap-2">
      {New.map((value, index) => (
        <div key={index} className="bg-gray-200 rounded shadow-md mt-2 p-2">
          <div className="bg-blue-300 rounded shadow-md p-1 flex align-center justify-center mt-2 ">
            <input
              className="text-gray-800 font-bold flex text-center text-justify bg-blue-300"
              type="text"
              defaultValue={value.fertilizer_mix_name}
              onChange={(e) => {
                // 1. Make a shallow copy of the array
                let temp_state = [...New];
                // 2. Make a shallow copy of the element you want to mutate
                let temp_element = { ...temp_state[index] };
                // 3. Update the property you're interested in
                temp_element.fertilizer_mix_name = e.target.value;
                // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                temp_state[index] = temp_element;
                // 5. Set the state to our new copy
                setNew(temp_state);
                console.log(temp_state);
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 p-2">
            <div className="bg-gray-300 rounded shadow-md grid grid-rows-2 gap-2 p-2">
              <div className="block my-auto">
                <div className="block md:grid grid-cols-3 gap-1">
                  <div className="text-gray-700 font-bold text-md my-auto">
                    <div className="bg-gray-500 rounded shadow-md p-2 flex align-center justify-center text-gray-700 font-bold mb-2 md:mb-0">
                      EC
                    </div>
                  </div>
                  <div className="flex align-center justify-center my-auto">
                    <TextField
                      size="small"
                      type="number"
                      defaultValue={value.ec_target}
                      onChange={(e) => {
                        // 1. Make a shallow copy of the array
                        let temp_state = [...New];
                        // 2. Make a shallow copy of the element you want to mutate
                        let temp_element = { ...temp_state[index] };
                        // 3. Update the property you're interested in
                        temp_element.ec_target = e.target.value;
                        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                        temp_state[index] = temp_element;
                        // 5. Set the state to our new copy
                        setNew(temp_state);
                        console.log(temp_state);
                      }}
                    />
                  </div>
                  <div className="flex align-center justify-center">
                    <Switch
                      inputProps={{ "aria-label": "controlled" }}
                      defaultChecked={value.ec_enable}
                      onClick={() => {
                        // 1. Make a shallow copy of the array
                        let temp_state = [...New];
                        // 2. Make a shallow copy of the element you want to mutate
                        let temp_element = { ...temp_state[index] };
                        // 3. Update the property you're interested in
                        temp_element.ec_enable = !temp_element.ec_enable;
                        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                        temp_state[index] = temp_element;
                        // 5. Set the state to our new copy
                        setNew(temp_state);
                        console.log(temp_state);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="block my-auto mt-1">
                <div className="block md:grid grid-cols-3 gap-1">
                  <div className="bg-gray-500 rounded shadow-md p-2 flex align-center justify-center text-gray-700 font-bold mb-2 md:mb-0">
                    pH
                  </div>
                  <div className="flex align-center justify-center my-auto">
                    <TextField
                      size="small"
                      type="number"
                      defaultValue={value.ph_target}
                      onChange={(e) => {
                        // 1. Make a shallow copy of the array
                        let temp_state = [...New];
                        // 2. Make a shallow copy of the element you want to mutate
                        let temp_element = { ...temp_state[index] };
                        // 3. Update the property you're interested in
                        temp_element.ph_target = e.target.value;
                        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                        temp_state[index] = temp_element;
                        // 5. Set the state to our new copy
                        setNew(temp_state);
                        console.log(temp_state);
                      }}
                    />
                  </div>
                  <div className="flex align-center justify-center">
                    <Switch
                      inputProps={{ "aria-label": "controlled" }}
                      defaultChecked={value.ph_enable}
                      onClick={() => {
                        // 1. Make a shallow copy of the array
                        let temp_state = [...New];
                        // 2. Make a shallow copy of the element you want to mutate
                        let temp_element = { ...temp_state[index] };
                        // 3. Update the property you're interested in
                        temp_element.ph_enable = !temp_element.ph_enable;
                        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                        temp_state[index] = temp_element;
                        // 5. Set the state to our new copy
                        setNew(temp_state);
                        console.log(temp_state);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-300 rounded shadow-md block">
              <div className="flex align-center justify-center p-2">
                <div className="bg-gray-500 rounded shadow-md p-2 flex align-center justify-center text-gray-700 font-bold">
                  Flow Rate (ℓ/m³)
                </div>
              </div>
              {value.fertilizer_flow_rates.map((i, index2) => (
                <div
                  key={index2}
                  className="flex align-center justify-center p-1 pb-2"
                >
                  <TextField
                    type="number"
                    size="small"
                    defaultValue={i}
                    onChange={(e) => {
                      // 1. Make a shallow copy of the array
                      let temp_state = [...New];
                      // 2. Make a shallow copy of the element you want to mutate
                      let temp_element = { ...temp_state[index] };

                      // 3. Update the property you're interested in
                      temp_element.fertilizer_flow_rates[index2] =
                        e.target.value;
                      // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                      temp_state[index] = temp_element;
                      // 5. Set the state to our new copy
                      setNew(temp_state);
                      console.log(temp_state);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex align-center justify-center mb-3 mt-3">
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{ color: "white" }}
            >
              Save
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

const MixManager1 = () => {
  const { farmId } = useParams();

  const prefix = `/-${farmId}`;

  const [{ data, loading }, refetch] = useApi(
    `${prefix}/irrigation_schedule_manual`
  );

  const [, postMode] = useApi(...post(`${prefix}/irrigation_schedule_manual`));

  const [New, setNew] = useState(data);

  const handleSave = useCallback(() => {
    postMode({ data: New }).then(() => refetch());
  }, [New]);

  useEffect(() => {
    if (data) {
      setNew(data);
    }
  }, [data]);

  if (!New || loading) return <Preloader />;

  const buttonActiveColor = "#2a58bd";

  return (
    <div className="block md:grid grid-cols-2 gap-2">
      {New.map((value, index) => (
        <div
          key={index}
          className="bg-gray-200 rounded shadow-md mb-2 p-1 mt-2"
        >
          <div className="bg-blue-300 rounded shadow-md p-1 flex align-center justify-center mt-2 mb-2">
            <div className="text-gray-800 font-bold">{value.block_name}</div>
          </div>
          <div className="bg-gray-500 rounded shadow-md p-2 flex align-center justify-center text-gray-700 font-bold mb-2">
            {value.fertilizer_mix}
          </div>
          <div className="block md:flex align-center justify-center m-auto mt-2">
            <div className="block mt-2 p-1">
              <div className="bg-gray-300 rounded shadow-md p-2">
                <div className="block">
                  <div className="bg-gray-500 rounded shadow-md p-2 flex align-center justify-center text-gray-700 font-bold">
                    Mode
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex">
                      <Button
                        sx={{
                          backgroundColor:
                            New[index].mode == "Time"
                              ? buttonActiveColor
                              : "gray",
                        }}
                        fullWidth="true"
                        variant="contained"
                        onClick={() => {
                          // 1. Make a shallow copy of the array
                          let temp_state = [...New];
                          // 2. Make a shallow copy of the element you want to mutate
                          let temp_element = { ...temp_state[index] };
                          // 3. Update the property you're interested in
                          temp_element.mode = "Time";
                          // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                          temp_state[index] = temp_element;
                          // 5. Set the state to our new copy
                          setNew(temp_state);
                          console.log(temp_state);
                        }}
                      >
                        Time
                      </Button>
                    </div>
                    <div className="flex">
                      <Button
                        sx={{
                          backgroundColor:
                            New[index].mode == "Volume"
                              ? buttonActiveColor
                              : "gray",
                        }}
                        fullWidth="true"
                        variant="contained"
                        onClick={() => {
                          // 1. Make a shallow copy of the array
                          let temp_state = [...New];
                          // 2. Make a shallow copy of the element you want to mutate
                          let temp_element = { ...temp_state[index] };
                          // 3. Update the property you're interested in
                          temp_element.mode = "Volume";
                          // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                          temp_state[index] = temp_element;
                          // 5. Set the state to our new copy
                          setNew(temp_state);
                          console.log(temp_state);
                        }}
                      >
                        Volume
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-300 rounded shadow-md p-2 mt-2">
                <Accordion sx={{ background: "#f7f5f5" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      <div className="text-gray-700 font-bold">Mixes</div>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <div key={index} className="grid grid-rows mb-1">
                        <Button
                          sx={{
                            backgroundColor:
                              New[index].fertilizer_mix ==
                              New[index].fertilizer_mix_names[0]
                                ? buttonActiveColor
                                : "gray",
                          }}
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            // 1. Make a shallow copy of the array
                            let temp_state = [...New];
                            // 2. Make a shallow copy of the element you want to mutate
                            let temp_element = {
                              ...temp_state[index],
                            };
                            // 3. Update the property you're interested in
                            temp_element.fertilizer_mix =
                              value.fertilizer_mix_names[0];
                            // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                            temp_state[index] = temp_element;
                            // 5. Set the state to our new copy
                            setNew(temp_state);
                            console.log(temp_state);
                          }}
                        >
                          {value.fertilizer_mix_names[0]}
                        </Button>
                        <Button
                          sx={{
                            marginTop: "0.2rem",
                            backgroundColor:
                              New[index].fertilizer_mix ==
                              New[index].fertilizer_mix_names[1]
                                ? buttonActiveColor
                                : "gray",
                          }}
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            // 1. Make a shallow copy of the array
                            let temp_state = [...New];
                            // 2. Make a shallow copy of the element you want to mutate
                            let temp_element = {
                              ...temp_state[index],
                            };
                            // 3. Update the property you're interested in
                            temp_element.fertilizer_mix =
                              value.fertilizer_mix_names[1];
                            // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                            temp_state[index] = temp_element;
                            // 5. Set the state to our new copy
                            setNew(temp_state);
                            console.log(temp_state);
                          }}
                        >
                          {value.fertilizer_mix_names[1]}
                        </Button>
                        <Button
                          sx={{
                            marginTop: "0.2rem",
                            backgroundColor:
                              New[index].fertilizer_mix ==
                              New[index].fertilizer_mix_names[2]
                                ? buttonActiveColor
                                : "gray",
                          }}
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            // 1. Make a shallow copy of the array
                            let temp_state = [...New];
                            // 2. Make a shallow copy of the element you want to mutate
                            let temp_element = {
                              ...temp_state[index],
                            };
                            // 3. Update the property you're interested in
                            temp_element.fertilizer_mix =
                              value.fertilizer_mix_names[2];
                            // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                            temp_state[index] = temp_element;
                            // 5. Set the state to our new copy
                            setNew(temp_state);
                            console.log(temp_state);
                          }}
                        >
                          {value.fertilizer_mix_names[2]}
                        </Button>
                        <Button
                          sx={{
                            marginTop: "0.2rem",
                            backgroundColor:
                              New[index].fertilizer_mix ==
                              New[index].fertilizer_mix_names[3]
                                ? buttonActiveColor
                                : "gray",
                          }}
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            // 1. Make a shallow copy of the array
                            let temp_state = [...New];
                            // 2. Make a shallow copy of the element you want to mutate
                            let temp_element = {
                              ...temp_state[index],
                            };
                            // 3. Update the property you're interested in
                            temp_element.fertilizer_mix =
                              value.fertilizer_mix_names[3];
                            // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                            temp_state[index] = temp_element;
                            // 5. Set the state to our new copy
                            setNew(temp_state);
                            console.log(temp_state);
                          }}
                        >
                          {value.fertilizer_mix_names[3]}
                        </Button>
                        <Button
                          sx={{
                            marginTop: "0.2rem",
                            backgroundColor:
                              New[index].fertilizer_mix ==
                              New[index].fertilizer_mix_names[4]
                                ? buttonActiveColor
                                : "gray",
                          }}
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            // 1. Make a shallow copy of the array
                            let temp_state = [...New];
                            // 2. Make a shallow copy of the element you want to mutate
                            let temp_element = {
                              ...temp_state[index],
                            };
                            // 3. Update the property you're interested in
                            temp_element.fertilizer_mix =
                              value.fertilizer_mix_names[4];
                            // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                            temp_state[index] = temp_element;
                            // 5. Set the state to our new copy
                            setNew(temp_state);
                            console.log(temp_state);
                          }}
                        >
                          {value.fertilizer_mix_names[4]}
                        </Button>
                      </div>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
            <div className="block sm:grid grid-cols-2 gap-2 p-1">
              <div className="block mt-2">
                <div className="bg-gray-300 rounded shadow-md p-2">
                  <div className="bg-gray-500 rounded shadow-md p-2 flex align-center justify-center text-gray-700 font-bold">
                    Start Times
                  </div>
                  <div className="grid rows-1 gap-1 mt-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        sx={{
                          backgroundColor: New[index].start_days_array[0]
                            ? "gray"
                            : buttonActiveColor,
                        }}
                        variant="contained"
                        onClick={() => {
                          // 1. Make a shallow copy of the array
                          let temp_state = [...New];
                          // 2. Make a shallow copy of the element you want to mutate
                          let temp_element = { ...temp_state[index] };
                          // 3. Update the property you're interested in
                          temp_element.start_days_array[0] =
                            !temp_element.start_days_array[0];
                          // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                          temp_state[index] = temp_element;
                          // 5. Set the state to our new copy
                          setNew(temp_state);
                          console.log(temp_state);
                        }}
                        defaultValue={value.start_days_array[0]}
                      >
                        Mon
                      </Button>
                      <TextField
                        type="time"
                        size="small"
                        defaultValue={value.start_times_array[0]}
                        onChange={(e) => {
                          // 1. Make a shallow copy of the array
                          let temp_state = [...New];
                          // 2. Make a shallow copy of the element you want to mutate
                          let temp_element = { ...temp_state[index] };
                          // 3. Update the property you're interested in
                          temp_element.start_times_array[0] = e.target.value;
                          // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                          temp_state[index] = temp_element;
                          // 5. Set the state to our new copy
                          setNew(temp_state);
                          console.log(temp_state);
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        sx={{
                          backgroundColor: New[index].start_days_array[1]
                            ? "gray"
                            : buttonActiveColor,
                        }}
                        variant="contained"
                        onClick={() => {
                          // 1. Make a shallow copy of the array
                          let temp_state = [...New];
                          // 2. Make a shallow copy of the element you want to mutate
                          let temp_element = { ...temp_state[index] };
                          // 3. Update the property you're interested in
                          temp_element.start_days_array[1] =
                            !temp_element.start_days_array[1];
                          // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                          temp_state[index] = temp_element;
                          // 5. Set the state to our new copy
                          setNew(temp_state);
                          console.log(temp_state);
                        }}
                      >
                        Tue
                      </Button>
                      <TextField
                        type="time"
                        size="small"
                        defaultValue={value.start_times_array[1]}
                        onChange={(e) => {
                          // 1. Make a shallow copy of the array
                          let temp_state = [...New];
                          // 2. Make a shallow copy of the element you want to mutate
                          let temp_element = { ...temp_state[index] };
                          // 3. Update the property you're interested in
                          temp_element.start_times_array[1] = e.target.value;
                          // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                          temp_state[index] = temp_element;
                          // 5. Set the state to our new copy
                          setNew(temp_state);
                          console.log(temp_state);
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        sx={{
                          backgroundColor: New[index].start_days_array[2]
                            ? "gray"
                            : buttonActiveColor,
                        }}
                        variant="contained"
                        onClick={() => {
                          // 1. Make a shallow copy of the array
                          let temp_state = [...New];
                          // 2. Make a shallow copy of the element you want to mutate
                          let temp_element = { ...temp_state[index] };
                          // 3. Update the property you're interested in
                          temp_element.start_days_array[2] =
                            !temp_element.start_days_array[2];
                          // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                          temp_state[index] = temp_element;
                          // 5. Set the state to our new copy
                          setNew(temp_state);
                          console.log(temp_state);
                        }}
                      >
                        Wed
                      </Button>
                      <TextField
                        type="time"
                        size="small"
                        defaultValue={value.start_times_array[2]}
                        onChange={(e) => {
                          // 1. Make a shallow copy of the array
                          let temp_state = [...New];
                          // 2. Make a shallow copy of the element you want to mutate
                          let temp_element = { ...temp_state[index] };
                          // 3. Update the property you're interested in
                          temp_element.start_times_array[2] = e.target.value;
                          // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                          temp_state[index] = temp_element;
                          // 5. Set the state to our new copy
                          setNew(temp_state);
                          console.log(temp_state);
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        sx={{
                          backgroundColor: New[index].start_days_array[3]
                            ? "gray"
                            : buttonActiveColor,
                        }}
                        variant="contained"
                        onClick={() => {
                          // 1. Make a shallow copy of the array
                          let temp_state = [...New];
                          // 2. Make a shallow copy of the element you want to mutate
                          let temp_element = { ...temp_state[index] };
                          // 3. Update the property you're interested in
                          temp_element.start_days_array[3] =
                            !temp_element.start_days_array[3];
                          // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                          temp_state[index] = temp_element;
                          // 5. Set the state to our new copy
                          setNew(temp_state);
                          console.log(temp_state);
                        }}
                      >
                        Thu
                      </Button>
                      <TextField
                        type="time"
                        size="small"
                        defaultValue={value.start_times_array[3]}
                        onChange={(e) => {
                          // 1. Make a shallow copy of the array
                          let temp_state = [...New];
                          // 2. Make a shallow copy of the element you want to mutate
                          let temp_element = { ...temp_state[index] };
                          // 3. Update the property you're interested in
                          temp_element.start_times_array[3] = e.target.value;
                          // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                          temp_state[index] = temp_element;
                          // 5. Set the state to our new copy
                          setNew(temp_state);
                          console.log(temp_state);
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        sx={{
                          backgroundColor: New[index].start_days_array[4]
                            ? "gray"
                            : buttonActiveColor,
                        }}
                        variant="contained"
                        onClick={() => {
                          // 1. Make a shallow copy of the array
                          let temp_state = [...New];
                          // 2. Make a shallow copy of the element you want to mutate
                          let temp_element = { ...temp_state[index] };
                          // 3. Update the property you're interested in
                          temp_element.start_days_array[4] =
                            !temp_element.start_days_array[4];
                          // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                          temp_state[index] = temp_element;
                          // 5. Set the state to our new copy
                          setNew(temp_state);
                          console.log(temp_state);
                        }}
                      >
                        Fri
                      </Button>
                      <TextField
                        type="time"
                        size="small"
                        defaultValue={value.start_times_array[4]}
                        onChange={(e) => {
                          // 1. Make a shallow copy of the array
                          let temp_state = [...New];
                          // 2. Make a shallow copy of the element you want to mutate
                          let temp_element = { ...temp_state[index] };
                          // 3. Update the property you're interested in
                          temp_element.start_times_array[4] = e.target.value;
                          // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                          temp_state[index] = temp_element;
                          // 5. Set the state to our new copy
                          setNew(temp_state);
                          console.log(temp_state);
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        sx={{
                          backgroundColor: New[index].start_days_array[5]
                            ? "gray"
                            : buttonActiveColor,
                        }}
                        variant="contained"
                        onClick={() => {
                          // 1. Make a shallow copy of the array
                          let temp_state = [...New];
                          // 2. Make a shallow copy of the element you want to mutate
                          let temp_element = { ...temp_state[index] };
                          // 3. Update the property you're interested in
                          temp_element.start_days_array[5] =
                            !temp_element.start_days_array[5];
                          // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                          temp_state[index] = temp_element;
                          // 5. Set the state to our new copy
                          setNew(temp_state);
                          console.log(temp_state);
                        }}
                      >
                        Sat
                      </Button>
                      <TextField
                        type="time"
                        size="small"
                        defaultValue={value.start_times_array[5]}
                        onChange={(e) => {
                          // 1. Make a shallow copy of the array
                          let temp_state = [...New];
                          // 2. Make a shallow copy of the element you want to mutate
                          let temp_element = { ...temp_state[index] };
                          // 3. Update the property you're interested in
                          temp_element.start_times_array[5] = e.target.value;
                          // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                          temp_state[index] = temp_element;
                          // 5. Set the state to our new copy
                          setNew(temp_state);
                          console.log(temp_state);
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        sx={{
                          backgroundColor: New[index].start_days_array[6]
                            ? "gray"
                            : buttonActiveColor,
                        }}
                        variant="contained"
                        onClick={() => {
                          // 1. Make a shallow copy of the array
                          let temp_state = [...New];
                          // 2. Make a shallow copy of the element you want to mutate
                          let temp_element = { ...temp_state[index] };
                          // 3. Update the property you're interested in
                          temp_element.start_days_array[6] =
                            !temp_element.start_days_array[6];
                          // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                          temp_state[index] = temp_element;
                          // 5. Set the state to our new copy
                          setNew(temp_state);
                          console.log(temp_state);
                        }}
                      >
                        Sun
                      </Button>
                      <TextField
                        type="time"
                        size="small"
                        defaultValue={value.start_times_array[6]}
                        onChange={(e) => {
                          // 1. Make a shallow copy of the array
                          let temp_state = [...New];
                          // 2. Make a shallow copy of the element you want to mutate
                          let temp_element = { ...temp_state[index] };
                          // 3. Update the property you're interested in
                          temp_element.start_times_array[6] = e.target.value;
                          // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                          temp_state[index] = temp_element;
                          // 5. Set the state to our new copy
                          setNew(temp_state);
                          console.log(temp_state);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="block items-justify">
                <div className="block md:m-auto mt-2">
                  <div className="bg-gray-300 rounded shadow-md p-2">
                    <div className="bg-gray-500 rounded shadow-md p-2 flex align-center justify-center text-gray-700 font-bold">
                      Setpoint
                    </div>
                    <div className="flex align-center justify-center">
                      <div className="grid grid-rows-7 gap-1 mt-2">
                        <div>
                          <TextField
                            type="number"
                            size="small"
                            defaultValue={value.mode_setpoint[0]}
                            onChange={(e) => {
                              // 1. Make a shallow copy of the array
                              let temp_state = [...New];
                              // 2. Make a shallow copy of the element you want to mutate
                              let temp_element = {
                                ...temp_state[index],
                              };
                              // 3. Update the property you're interested in
                              temp_element.mode_setpoint[0] = e.target.value;
                              // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                              temp_state[index] = temp_element;
                              // 5. Set the state to our new copy
                              setNew(temp_state);
                              console.log(temp_state);
                            }}
                          />
                        </div>
                        <div>
                          <TextField
                            type="number"
                            size="small"
                            defaultValue={value.mode_setpoint[1]}
                            onChange={(e) => {
                              // 1. Make a shallow copy of the array
                              let temp_state = [...New];
                              // 2. Make a shallow copy of the element you want to mutate
                              let temp_element = {
                                ...temp_state[index],
                              };
                              // 3. Update the property you're interested in
                              temp_element.mode_setpoint[1] = e.target.value;
                              // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                              temp_state[index] = temp_element;
                              // 5. Set the state to our new copy
                              setNew(temp_state);
                              console.log(temp_state);
                            }}
                          />
                        </div>
                        <div>
                          <TextField
                            type="number"
                            size="small"
                            defaultValue={value.mode_setpoint[2]}
                            onChange={(e) => {
                              // 1. Make a shallow copy of the array
                              let temp_state = [...New];
                              // 2. Make a shallow copy of the element you want to mutate
                              let temp_element = {
                                ...temp_state[index],
                              };
                              // 3. Update the property you're interested in
                              temp_element.mode_setpoint[2] = e.target.value;
                              // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                              temp_state[index] = temp_element;
                              // 5. Set the state to our new copy
                              setNew(temp_state);
                              console.log(temp_state);
                            }}
                          />
                        </div>
                        <div>
                          <TextField
                            type="number"
                            size="small"
                            defaultValue={value.mode_setpoint[3]}
                            onChange={(e) => {
                              // 1. Make a shallow copy of the array
                              let temp_state = [...New];
                              // 2. Make a shallow copy of the element you want to mutate
                              let temp_element = {
                                ...temp_state[index],
                              };
                              // 3. Update the property you're interested in
                              temp_element.mode_setpoint[3] = e.target.value;
                              // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                              temp_state[index] = temp_element;
                              // 5. Set the state to our new copy
                              setNew(temp_state);
                              console.log(temp_state);
                            }}
                          />
                        </div>
                        <div>
                          <TextField
                            type="number"
                            size="small"
                            defaultValue={value.mode_setpoint[4]}
                            onChange={(e) => {
                              // 1. Make a shallow copy of the array
                              let temp_state = [...New];
                              // 2. Make a shallow copy of the element you want to mutate
                              let temp_element = {
                                ...temp_state[index],
                              };
                              // 3. Update the property you're interested in
                              temp_element.mode_setpoint[4] = e.target.value;
                              // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                              temp_state[index] = temp_element;
                              // 5. Set the state to our new copy
                              setNew(temp_state);
                              console.log(temp_state);
                            }}
                          />
                        </div>
                        <div>
                          <TextField
                            type="number"
                            size="small"
                            defaultValue={value.mode_setpoint[5]}
                            onChange={(e) => {
                              // 1. Make a shallow copy of the array
                              let temp_state = [...New];
                              // 2. Make a shallow copy of the element you want to mutate
                              let temp_element = {
                                ...temp_state[index],
                              };
                              // 3. Update the property you're interested in
                              temp_element.mode_setpoint[5] = e.target.value;
                              // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                              temp_state[index] = temp_element;
                              // 5. Set the state to our new copy
                              setNew(temp_state);
                              console.log(temp_state);
                            }}
                          />
                        </div>
                        <div>
                          <TextField
                            type="number"
                            size="small"
                            defaultValue={value.mode_setpoint[6]}
                            onChange={(e) => {
                              // 1. Make a shallow copy of the array
                              let temp_state = [...New];
                              // 2. Make a shallow copy of the element you want to mutate
                              let temp_element = {
                                ...temp_state[index],
                              };
                              // 3. Update the property you're interested in
                              temp_element.mode_setpoint[6] = e.target.value;
                              // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                              temp_state[index] = temp_element;
                              // 5. Set the state to our new copy
                              setNew(temp_state);
                              console.log(temp_state);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex align-center justify-center mt-2 mb-3">
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

const Mix = () => {
  const [pageState, setPageState] = useState(true);

  return (
    <>
      <div className="bg-gray-300 rounded shadow-md p-2">
        <div className="mb-2">
          <Stack spacing={2}>
            <Pagination
              count={2}
              variant="outlined"
              color="primary"
              shape="rounded"
              onChange={() => setPageState(!pageState)}
            />
          </Stack>
          {pageState ? <MixManager1 /> : <MixManager2 />}
        </div>
      </div>
    </>
  );
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
          <Mix />
        </div>
      </div>
    </div>
  );
};
