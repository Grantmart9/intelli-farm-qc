import React, { useCallback, useEffect, useState } from "react";
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import Preloader from "../../components/Preloader";
import { API_URL } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { Button, Tooltip, OverlayTrigger } from "@themesberg/react-bootstrap";
import { TextField } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { DateTimePicker, LocalizationProvider } from "@material-ui/pickers";
import MomentUtils from "@material-ui/pickers/adapter/moment";
import moment from "moment";
import {AppName} from "./AppName";
import ErrorPage from './ErrorPage.jpg';

const DateTimeEditInputCell = (props) => {
  const {id, field, value, api} = props;
  const dateFormat = "YYYY-MM-DD HH:mm";
  const handleChange = useCallback((editedDate) => {
    const editedValue = moment(editedDate).format(dateFormat)
    api.setEditCellValue({id, field, value: editedValue})
  }, [id, field,api]);

  return (
    <LocalizationProvider 
      dateAdapter={MomentUtils}
      dateFormat={dateFormat}>
      <div className="flex flex-col justify-content-center">
        <DateTimePicker 
          renderInput={props => <TextField {...props} variant="outlined" margin="none" helperText=""></TextField>}
          inputFormat={dateFormat}
          value={new Date(value)}
          onChange={handleChange}
        />
      </div>
    </LocalizationProvider>
  );
}

const sectionColumns = [
  {
    field: "name",
    headerName: "Name",
    type: "string"
  },
  {
    field: "ec_setpoint",
    headerName: "EC Setpoint",
    type: "number", 
    editable: true
  },
  {
    field: "run_time",
    headerName: "Run time",
    type: "number"
  },
  {
    field: "start_time",
    headerName: "Start time",
    type: "string", 
    renderEditCell: (props) => <DateTimeEditInputCell {...props}/>,
    editable: true
  },
  {
    field: "end_time",
    headerName: "End time",
    type: "string", 
    renderEditCell: DateTimeEditInputCell,
    editable: true
  }
].map(column => ({ ...column, flex: 1 }));

const SectionTable = ({ section, onChange = null }) => {
  const id = section.sql_index;
  const handleEditCellChangeCommited = useCallback(e => {
    const {field, props: {value}} = e;
    const editedSection = { ...section, [field]: value }
    if (onChange) {
      onChange(editedSection);
    }
  }, [section, onChange])

  return (
    <div className="flex">
      <DataGrid
        hideFooter={true} autoHeight rows={[{ id, ...section }]} columns={sectionColumns}
        onEditCellChangeCommitted={handleEditCellChangeCommited} />
    </div>
  )
}

const fertilizerColumns = [
  {
    field: "name",
    headerName: "Name",
    type: "string"
  },
  {
    field: "ec_setpoint",
    headerName: "EC Setpoint",
    type: "number", 
    editable: true
  },
  {
    field: "flow_rate",
    headerName: "Flow rate",
    type: "number", 
    editable: true
  },
].map(column => ({ ...column, flex: 1, editable: true }));

const FertilizerTable = ({ section, onChange = null }) => {
  const { fertilizer: fertilizers } = section;
  const handleEditCellChangeCommited = useCallback(e => {
    const {id, field, props: {value} } = e;
    const editedFertilizer = { ...fertilizers[id], [field]: value };
    const editedFertilizers = [...fertilizers.slice(0, id), editedFertilizer, ...fertilizers.slice(id + 1)];
    const editedSection = { ...section, fertilizer: editedFertilizers };
    if (onChange) {
      onChange(editedSection);
    }
  }, [section, fertilizers, onChange]);

  return (
    <>
      <h3
        style={{
          background: "#a2d2fc",
          color: "#4a5073",
          border: "1px solid #a2d2fc",
          borderRadius: "0.09cm",
          height: "3rem",
          padding: "0.5rem",
          fontWeight: "bold",
          fontFamily: "'Rubik', sans-serif",
          fontSize: "1.rem",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        Fertilizer
      </h3>
      <DataGrid
        hideFooter={true}
        autoHeight
        rows={fertilizers.map((fertilizer, id) => ({ id: id, ...fertilizer }))}
        columns={fertilizerColumns}
        onEditCellChangeCommitted={handleEditCellChangeCommited}
      />
    </>
  );
};

const SectionRow = ({ section, onChange = null }) => (
  <div
    className="w-full p-1"
    style={{
      border: "1.5px solid #99a9c4",
      borderRadius: "0.1cm",
      padding: "1rem",
      boxShadow: "3px 3px #5b5c75",
      marginTop: "1rem",
    }}
  >
    <div
      className="flex align-items-center align-content-center justify-content-center"
      style={{
        background: "#a2d2fc",
        color: "#4a5073",
        fontWeight: "bold",
        border: "1px solid #a2d2fc",
        borderRadius: "0.09cm",
      }}
    >
      <h3
        style={{
          background: "#a2d2fc",
          color: "#4a5073",
          height: "3rem",
          padding: "0.5rem",
          fontWeight: "bold",
          fontFamily: "'Rubik', sans-serif",
          fontSize: "1.2rem",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {section.name}
      </h3>
    </div>
    <SectionTable section={section} onChange={onChange} />
    <FertilizerTable section={section} onChange={onChange} />
  </div>
);

export const IrrigationSchedule = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }] = useAxios(`${API_URL}/-${farmId}/schedule`);
  const [dirty, setDirty] = useState(false);
  const [schedule, setSchedule] = useState();
  useEffect(() => {
    if(data) {
      setSchedule(data);
    }
  }, [data]);

  const [, postSchedule] = useAxios(
    {
      url: `${API_URL}/-${farmId}/schedule`,
      method: 'POST',
      headers: {
          'content-type': 'application/json',
      },
    },
    {
      manual: true,
    }
  );

  if (loading || !schedule) return <Preloader />;
  if (error)
    return <img src={ErrorPage} alt={ErrorPage}/>;

  const handleChange = async (editedSection) => {
    const editedSchedule = schedule.map(section => 
      section.sql_index === editedSection.sql_index 
      ? editedSection
      : section);
    setDirty(true);
    setSchedule(editedSchedule);
  };

  const showMessage = (msg) => {
    console.log(msg) // Leave it at this for now
  };

  const handleSave = async () => {
    try {
      showMessage("Saving...");
      await postSchedule({ data: schedule });
      setDirty(false);
    } catch (e) {
      showMessage("Failed to save");
    }
  };

  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <AppName />
        <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:mt-0 md:mt-16 xl:mt-16 2xl:mt-16 sm:p-1 md:p-1 p-4">
          <div
            className="flex flex-col align-items-center align-content-center justify-content-center p-1 mt-2"
            style={{
              dislay: "flex",
              background: "white",
              border: "1px solid white",
              borderRadius: "0.09cm",
              fontFamily: "'Rubik', sans-serif",
              fontSize: "1.2rem",
              color: "#4a5073",
            }}
          >
            <OverlayTrigger
              placement="bottom"
              trigger={["hover", "focus"]}
              overlay={<Tooltip>Save All settings</Tooltip>}
            >
              <Button className="m-0" onClick={handleSave} disabled={!dirty}>
                <FontAwesomeIcon icon={faSave} /> Save
              </Button>
            </OverlayTrigger>
            {schedule.map((section, i) => {
              return (
                <SectionRow key={i} section={section} onChange={handleChange} />
              );
            })}
          </div>
        </div>
    </div>
  );
};


