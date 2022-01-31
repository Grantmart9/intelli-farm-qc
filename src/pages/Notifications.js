/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 16/08/2021 - 08:24:31
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 16/08/2021
 * - Author          : Grant
 * - Modification    :
 **/

import React, { useState, useMemo, useEffect, useCallback } from "react";
import PreloaderBar from "images/PreloaderBar.gif";
import { useApi, post } from "api";
import { useRefetch } from "components/Timer";
import { useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Preloader } from "components/Preloader";
import ErrorGif from "images/ErrorGif.gif";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { setAt } from "immutable";

const useHandler = (field, state, setter) =>
  useCallback(
    (e) => setter({ ...state, [field]: e.target.value }),
    [field, state, setter]
  );

const useChecked = (field, state, setter) =>
  useCallback(
    (e) => setter({ ...state, [field]: e.target.checked }),
    [field, state, setter]
  );

const UserForm = ({ value, onChange }) => {
  const {
    order,
    email_address,
    cellphone_number,
    notification_type,
    alarms_enabled,
    start_enabled,
    schedule_enabled,
    whatsapp_api_key,
  } = value;

  const handleEmailAddress = useHandler("email_address", value, onChange);
  const handleCellphoneNumber = useHandler("cellphone_number", value, onChange);
  const handleNotificationType = useHandler(
    "notification_type",
    value,
    onChange
  );
  const handleWhatsapp_api_key = useHandler(
    "whatsapp_api_key",
    value,
    onChange
  );

  const handleAlarmsEnabled = useChecked("alarms_enabled", value, onChange);
  const handleStartEnabled = useChecked("start_enabled", value, onChange);
  const handleScheduleEnabled = useChecked("schedule_enabled", value, onChange);
  return (
    <div className="flex flex-col space-y-4 bg-gray-200 rounded shadow-md p-4">
      <div className="font-bold flex justify-center mb-2">
        User:&nbsp;{order}
      </div>
      <TextField
        variant="outlined"
        label="Email address"
        value={email_address}
        onInput={handleEmailAddress}
      />
      <TextField
        variant="outlined"
        label="Cellphone number"
        value={cellphone_number}
        onInput={handleCellphoneNumber}
      />
      <TextField
        variant="outlined"
        label="WhatsApp API key"
        value={whatsapp_api_key}
        onInput={handleWhatsapp_api_key}
      />
      <FormControl>
        <InputLabel variant="outlined">Method</InputLabel>
        <Select
          value={notification_type}
          onChange={handleNotificationType}
          variant="outlined"
        >
          <MenuItem value={"None"}>None</MenuItem>
          <MenuItem value={"WhatsApp"}>WhatsApp</MenuItem>
        </Select>
      </FormControl>
      <FormGroup row={true} className="flex justify-center">
        <FormControlLabel
          control={
            <Checkbox checked={alarms_enabled} onChange={handleAlarmsEnabled} />
          }
          label="Alarms"
        />
        <FormControlLabel
          control={
            <Checkbox checked={start_enabled} onChange={handleStartEnabled} />
          }
          label="Start Notification"
        />
      </FormGroup>
    </div>
  );
};

export const Notifications = () => {
  const { farmId } = useParams();
  const prefix = `/-${farmId}`;
  const [{ data, loading, error }, refetch] = useApi(`${prefix}/notifications`);
  const [{ loading: postLoading }, postNotification] = useApi(
    ...post(`${prefix}/notifications`)
  );

  const [state, setState] = useState(null);

  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data]);

  const handleChange = useCallback((user) => {
    const { index } = user;
    setState((state) => setAt(state, index, user));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    postNotification({ data: state }).finally(() => refetch());
  });

  if (!state) return <Preloader />;
  if (error)
    return (
      <div className="p-4">
        <img src={ErrorGif} alt={ErrorGif} width="100%" />
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="m-4">
      <div
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr)",
        }}
        className="grid gap-4"
      >
        {state.map((user, i) => (
          <UserForm
            key={i}
            value={{ ...user, index: i }}
            onChange={handleChange}
          />
        ))}
      </div>
      <div className="flex align-center justify-center">
        {loading ? (
          <img width={50} height={50} src={PreloaderBar} alt={PreloaderBar} />
        ) : null}
      </div>
      <div className="flex align-center justify-center mt-4">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={postLoading}
        >
          <div style={{ color: "white" }}>Save</div>
        </Button>
      </div>
    </form>
  );
};
