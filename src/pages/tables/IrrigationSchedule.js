import React, { useCallback, useEffect, useState } from "react";
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import Preloader from "../../components/Preloader";
import { API_URL } from "../../api";
import { Table } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { Button, Tooltip, OverlayTrigger } from "@themesberg/react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
  },
}));

const sectionColumns = [
  {
    field: "name",
    headerName: "Name",
    type: "string"
  },
  {
    field: "ec_setpoint",
    headerName: "EC Setpoint",
    type: "number"
  },
  {
    field: "run_time",
    headerName: "Run time",
    type: "number"
  },
  {
    field: "start_time",
    headerName: "Start time",
    type: "dateTime"
  },
  {
    field: "end_time",
    headerName: "End time",
    type: "dateTime"
  }
].map(column => ({ ...column, flex: 1, editable: true }));

const SectionTable = ({ id, section, onChange = null }) => {
  const handleEditCellChangeCommited = useCallback(({ field, props: { value } }) => {
    const editedSection = { ...section, [field]: value }
    if (onChange) {
      onChange(editedSection, id);
    }
  }, [section, onChange])

  return (
    <div className="flex">
      <DataGrid hideFooter={true} autoHeight rows={[{ id: 0, ...section }]} columns={sectionColumns}
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
    type: "number"
  },
  {
    field: "flow_rate",
    headerName: "Flow rate",
    type: "number"
  },
].map(column => ({ ...column, flex: 1, editable: true }));

const FertilizerTable = ({ id: sectionId, section, onChange = null }) => {
  const { fertilizer: fertilizers } = section;
  const handleEditCellChangeCommited = useCallback(({ id: fertilizerId, field, props: { value } }) => {
    const editedFertilizer = { ...fertilizers[fertilizerId], [field]: value };
    const editedFertilizers = [...fertilizers.slice(0, fertilizerId), editedFertilizer, ...fertilizers.slice(fertilizerId + 1)];
    const editedSection = { ...section, fertilizer: editedFertilizers };
    if (onChange) {
      onChange(editedSection, sectionId);
    }
  }, [section, onChange]);
  return (
    <>
      <h3
        style={{
          background: "#b6b9bf",
          color: "#43464d",
          border: "1px solid #5b5c75",
          borderRadius: "0.09cm",
          height: "3rem",
          padding: "0.5rem",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        Fertilizer
      </h3>
      <DataGrid hideFooter={true} autoHeight
        rows={fertilizers.map((fertilizer, id) => ({ id: id, ...fertilizer }))}
        columns={fertilizerColumns}
        onEditCellChangeCommitted={handleEditCellChangeCommited} />
    </>
  );
};

const SectionRow = ({ id, section, onChange = null }) => (
  <div
    className="w-full"
    style={{
      border: "1.5px solid #242540",
      borderRadius: "0.1cm",
      padding: "1rem",
      boxShadow: "3px 3px #5b5c75",
      marginTop: "1rem",
    }}
  >
    <h3
      class="flex align-items-center align-content-center justify-content-center"
      style={{
        background: "#bbbcbf",
        color: "#43464d",
        fontWeight: "bold",
        border: "1px solid #bbbcbf",
        borderRadius: "0.09cm",
      }}
    >
      <h3
        style={{
          background: "#b6b9bf",
          color: "#43464d",
          height: "3rem",
          padding: "0.5rem",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {section.name}
      </h3>
    </h3>
    <SectionTable id={id} section={section} onChange={onChange} />
    <FertilizerTable id={id} section={section} onChange={onChange} />
  </div>
);

export const IrrigationSchedule = () => {
  const classes = useStyles();

  const { farmId } = useParams();
  const [{ data, loading, error }] = useAxios(`${API_URL}/-${farmId}/schedule`);
  const [schedule, setSchedule] = useState();
  useEffect(() => {
    if(data) {
      setSchedule(data);
    }
  }, [data]);

  const [{ loading: posting }, postSchedule] = useAxios(
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
    return (
      <p>
        <FontAwesomeIcon icon={faExclamation} />
      </p>
    );

  const handleChange = async (editedSection, id) => {
    const editedSchedule = schedule.map(section => 
      section.sql_index == editedSection.sql_index 
      ? editedSection
      : section);
    await postSchedule({ data: editedSchedule });
    setSchedule(editedSchedule);
  }
  return (
    <div>
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          fontSize: "2rem",
          fontFamily: "Times New Roman",
          padding: "1rem",
        }}
      >
        Irrigation Schedule
      </h2>
      <div
        class="flex flex-col align-items-center align-content-center justify-content-center"
        style={{
          background: "white",
          border: "1px solid black",
          borderRadius: "0.09cm",
          padding: "1rem",
        }}
      >
        <OverlayTrigger
          placement="bottom"
          trigger={["hover", "focus"]}
          overlay={<Tooltip>Save All settings</Tooltip>}
        >
          <Button className="m-0">
            <FontAwesomeIcon icon={faSave} /> Save
          </Button>
        </OverlayTrigger>
        
        {
          schedule.map((section, i) => {
            return (
              <SectionRow key={i} id={section.sql_index} section={section} onChange={handleChange} />
            );
          })
        }
        
      </div>
    </div>
  );
};


