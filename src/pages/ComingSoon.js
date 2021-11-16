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
import { useApi, API_URL, post } from "api";
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

export const ComingSoon = () => {
  const { farmId } = useParams();
  const prefix = `${API_URL}/-${farmId}`;
  const [{ data, loading, error }, refetch] = useApi(`${prefix}/notifications`);

  useRefetch(refetch);

  const defaultData = {
    email_address: "2021-11-10-14:28:11",
    cellphone_number: "Manual",
    notification_type: "Manual Date Time",
    alarms_enabled: "unknown",
    start_enabled: "Inactive",
    schedule_enabled: "Inactive",
    whatsapp_api_key : "Inactive",
  };

  const { order,
    email_address,
    cellphone_number,
    notification_type,
    alarms_enabled,
    start_enabled,
    schedule_enabled,
    whatsapp_api_key } = data || defaultData;


    console.log(data);

  if (!data && loading) return <Preloader />;
  if (error)
    return (
      <div className="p-4">
        <img src={ErrorGif} alt={ErrorGif} width="100%" />
      </div>
    );

  return (
    <div className="bg-gray-400 rounded shadow-md p-2 m-4">
    <div className="flex align-center justify-center">
      <div className="xl:grid grid-cols-4 gap-4 rounded p-4">
      {data.map(
          ({
            order,
            email_address,
            cellphone_number,
            notification_type,
            alarms_enabled,
            start_enabled,
            schedule_enabled,
            whatsapp_api_key
          }) => (
            <div className="mt-2">
              <div className="bg-gray-200 rounded shadow-md p-4">
                <div className="font-bold flex justify-center mb-2">
                  User:{order}
                </div>
                <div className="grid grid-row-2 gap-2">
                  <TextField variant="outlined"  value={email_address}  />
                  <TextField variant="outlined" value={cellphone_number}/>
                </div>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Alarms"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Start Time"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Schedule"
                  />
                </FormGroup>
                <FormControl>
                  <InputLabel id="demo-simple-select-label" variant="outlined">Method</InputLabel>
                  <Select
                    value={notification_type}
                   
                  >
                    <MenuItem value={"None"}>None</MenuItem>
                    <MenuItem value={"WhatsApp"}>WhatsApp</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          ),[order,
            email_address,
            cellphone_number,
            notification_type,
            alarms_enabled,
            start_enabled,
            schedule_enabled,
            whatsapp_api_key]
        )}
      </div>
    </div>
    <div className="flex align-center justify-center mb-2">
    <Button variant="contained" color="primary">
      <div style={{ color: "white" }}>Save</div>
    </Button>
  </div>
  </div>
  );
};
