/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 27/08/2021 - 15:24:25
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 27/08/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Preloader } from "components/Preloader";
import { API_URL, useApi } from "api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { Button, Tooltip, OverlayTrigger } from "@themesberg/react-bootstrap";
import { TextField } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import {
  MobileDateTimePicker,
  LocalizationProvider
} from "@material-ui/pickers";
import MomentUtils from "@material-ui/pickers/adapter/moment";
import moment from "moment";
import ErrorGif from "images/ErrorGif.gif";
import play from "images/play.png";
import pause from "images/pause.png";
import stop from "images/stop.png";

const DateTimeEditInputCell = (props) => {
  const { id, field, value, api } = props;
  const dateFormat = "YYYY-MM-DD HH:mm:ss";
  const handleChange = useCallback(
    (editedDate) => {
      const editedValue = moment(editedDate).format(dateFormat);
      api.setEditCellValue({ id, field, value: editedValue });
    },
    [id, field, api]
  );

  return (
    <LocalizationProvider dateAdapter={MomentUtils} dateFormat={dateFormat}>
      <div className="flex flex-col justify-content-center">
        <MobileDateTimePicker
          renderInput={(props) => (
            <TextField
              {...props}
              variant="outlined"
              margin="none"
              helperText=""
            ></TextField>
          )}
          inputFormat={dateFormat}
          value={new Date(value)}
          onChange={handleChange}
        />
      </div>
    </LocalizationProvider>
  );
};

const sectionColumns = [
  {
    field: "ec_setpoint",
    headerName: "EC Setpoint",
    type: "number",
    editable: false
  },
  {
    field: "run_time",
    headerName: "Run time",
    type: "number",
    editable: false
  },
  {
    field: "start_time",
    headerName: "Start time",
    type: "string",
    renderEditCell: (props) => <DateTimeEditInputCell {...props} />,
    editable: false
  },
  {
    field: "end_time",
    headerName: "End time",
    type: "string",
    renderEditCell: DateTimeEditInputCell,
    editable: false
  }
].map((column) => ({ ...column, flex: 0.5 }));

const SectionTable = ({ editable, section, onChange = null }) => {
  const id = section.sql_index;
  const handleCellEditCommit = useCallback(
    (e) => {
      const { field, value } = e;
      const editedSection = { ...section, [field]: value };
      if (onChange) {
        onChange(editedSection);
      }
    },
    [section, onChange]
  );

  return (
    <div className="flex">
      <DataGrid
        hideFooter={true}
        autoHeight
        rows={[{ id, ...section }]}
        columns={sectionColumns}
        isCellEditable={({ colDef }) => editable && colDef.editable}
        onCellEditCommit={handleCellEditCommit}
      />
    </div>
  );
};

const fertilizerColumns = [
  {
    field: "name",
    headerName: "Name",
    type: "text",
    editable: false
  },
  {
    field: "ec_setpoint",
    headerName: "EC Setpoint µS",
    type: "number",
    editable: true
  },
  {
    field: "flow_rate",
    headerName: "Flow rate ℓ/m³",
    type: "number",
    editable: true
  }
].map((column) => ({ ...column, flex: 0.5 }));

const FertilizerTable = ({ section, onChange = null }) => {
  const { fertilizer: fertilizers } = section;
  const handleCellEditCommit = useCallback(
    (e) => {
      const { id, field, value } = e;
      const editedFertilizer = { ...fertilizers[id], [field]: value };
      const editedFertilizers = [
        ...fertilizers.slice(0, id),
        editedFertilizer,
        ...fertilizers.slice(id + 1)
      ];
      const editedSection = { ...section, fertilizer: editedFertilizers };
      if (onChange) {
        onChange(editedSection);
      }
    },
    [section, fertilizers, onChange]
  );

  return (
    <div>
      <div className="bg-blue-200 align-center justify-center flex font-bold">
        Fertilizer
      </div>
      <DataGrid
        hideFooter={true}
        autoHeight
        rows={fertilizers.map((fertilizer, id) => ({ id: id, ...fertilizer }))}
        columns={fertilizerColumns}
        onCellEditCommit={handleCellEditCommit}
      />
    </div>
  );
};

const SectionRow = ({ editable, section, onChange = null }) => (
  <div className="w-full p-2 bg-gray-200 rounded">
    <div className="flex bg-blue-200 rounded-1 justify-content-center font-bold">
      {section.name}
    </div>
    <SectionTable editable={editable} section={section} onChange={onChange} />
    <FertilizerTable
      editable={editable}
      section={section}
      onChange={onChange}
    />
  </div>
);

export const IrrigationSchedule = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }] = useApi(`${API_URL}/-${farmId}/schedule`);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [schedule, setSchedule] = useState();

  useEffect(() => {
    if (data) {
      setSchedule(data);
    }
  }, [data]);

  const [, postSchedule] = useApi(
    {
      url: `${API_URL}/-${farmId}/schedule`,
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    },
    {
      manual: true
    }
  );

  if (loading || !schedule) return <Preloader />;
  if (error) return <img src={ErrorGif} alt={ErrorGif} />;

  const handleChange = async (editedSection) => {
    const editedSchedule = schedule.map((section) =>
      section.sql_index === editedSection.sql_index ? editedSection : section
    );
    setDirty(true);
    setSchedule(editedSchedule);
  };

  const showMessage = (msg) => {
    console.log(msg); // Leave it at this for now
  };

  const handleSave = async () => {
    if (saving) return;
    try {
      setSaving(true);
      setDirty(false);
      let newSchedule = (await postSchedule({ data: schedule })).data;
      setSchedule(newSchedule);
    } catch (e) {
      setDirty(true);
      showMessage("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="p-4">
        <div className="flex flex-col align-items-center align-content-center justify-content-center p-1">
          <div className="flex align-center justify-center items-center mb-3">
            <OverlayTrigger
              placement="bottom"
              trigger={["hover", "focus"]}
              overlay={<Tooltip>Save All settings</Tooltip>}
            >
              <Button className="m-0" onClick={handleSave} disabled={!dirty}>
                <FontAwesomeIcon icon={faSave} /> Save
              </Button>
            </OverlayTrigger>
          </div>
          <div className="w-full">
            {schedule.map((section, i) => {
              return (
                <div
                  key={i}
                  className="bg-gray-200 rounded shadow-md w-full mb-4 p-2"
                >
                  <SectionRow
                    editable={!saving}
                    section={section}
                    onChange={handleChange}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
