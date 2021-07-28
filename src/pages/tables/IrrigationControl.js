import React from "react";
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faEdit,
  faRedo,
  faSave,faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import "./IrrigationControl.css";
import Preloader from "../../components/Preloader";
import { Table } from "@themesberg/react-bootstrap";
import { Button, Tooltip, OverlayTrigger } from "@themesberg/react-bootstrap";
import { AppName } from "./IrrigationSchedule";

const IrrigationControl = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }] = useAxios(
    `https://lodicon-test-api.herokuapp.com/api/v1/${farmId}/irrigation`
  );

  if (loading) return <Preloader />;
  if (error) return <p><FontAwesomeIcon icon={faExclamation}/></p>;

  console.log(data);

  return (
    <>
      <AppName />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          padding: "0.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontFamily: "Times New Roman",
            padding: "0.5rem",
            background: "#406a79",
            color: "white",
            border: "1px 1px solid #406a79",
            borderRadius: "0.2cm",
          }}
        >
          Irrigation Control
        </h2>
      </div>
      <div
        style={{
          display: "block",
          background: "transparent",
          color: "#43464d",
          border: "1px solid #5b5c75",
          borderRadius: "0.09cm",
          padding: "0.5rem",
          boxShadow: "3px 3px grey",
        }}
      >
        <div
          style={{
            display: "inline-block",
            marginBottom: "1rem",
            background: "#b6b9bf",
            border: "1px solid black",
            padding: "0.5rem",
            borderRadius: "0.2cm",
          }}
        >
          <span style={{ marginRight: "1rem" }}>
            <OverlayTrigger
              placement="bottom"
              trigger={["hover", "focus"]}
              overlay={<Tooltip>Start</Tooltip>}
            >
              <Button style={{ backgroundColor: "#406a79" }}>
                <FontAwesomeIcon icon={faPlay} />
              </Button>
            </OverlayTrigger>
          </span>
          <span style={{ marginRight: "1rem" }}>
            <OverlayTrigger
              placement="bottom"
              trigger={["hover", "focus"]}
              overlay={<Tooltip>Pause</Tooltip>}
            >
              <Button style={{ backgroundColor: "#406a79" }}>
                <FontAwesomeIcon icon={faPause} />
              </Button>
            </OverlayTrigger>
          </span>
          <span style={{ marginRight: "1rem" }}>
            <OverlayTrigger
              placement="bottom"
              trigger={["hover", "focus"]}
              overlay={<Tooltip>Edit</Tooltip>}
            >
              <Button style={{ backgroundColor: "#406a79" }}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </OverlayTrigger>
          </span>
          <span style={{ marginRight: "1rem" }}>
            <OverlayTrigger
              placement="bottom"
              trigger={["hover", "focus"]}
              overlay={<Tooltip>Refresh</Tooltip>}
            >
              <Button style={{ backgroundColor: "#406a79" }}>
                <FontAwesomeIcon icon={faRedo} />
              </Button>
            </OverlayTrigger>
          </span>
          <OverlayTrigger
            placement="bottom"
            trigger={["hover", "focus"]}
            overlay={<Tooltip>Save</Tooltip>}
          >
            <Button style={{ backgroundColor: "#406a79" }}>
              <FontAwesomeIcon icon={faSave} />
            </Button>
          </OverlayTrigger>
        </div>
        <Table>
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ background: "#8fc99a" }}>
                Start Time
              </th>
              <th className="border-0" style={{ background: "#8fc99a" }}>
                End Time
              </th>
              <th className="border-0" style={{ background: "#8fc99a" }}>
                Run Time
              </th>
              <th className="border-0" style={{ background: "#8fc99a" }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-0 fw-bold">2021-04-08 12:00</td>
              <td className="border-0 fw-bold">2021-04-08 13:20</td>
              <td className="border-0 fw-bold">80 Minutes</td>
              <td className="border-0 fw-bold">Running</td>
            </tr>
            <tr>
              <td className="border-0 fw-bold">2021-04-08 12:00</td>
              <td className="border-0 fw-bold">2021-04-08 13:20</td>
              <td className="border-0 fw-bold">80 Minutes</td>
              <td className="border-0 fw-bold">Running</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default IrrigationControl;
