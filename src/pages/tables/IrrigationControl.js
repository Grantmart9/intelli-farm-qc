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
import { withStyles } from "@material-ui/core/styles";
import Preloader from "../../components/Preloader";
import { API_URL } from "../../api";
import { Table } from "@themesberg/react-bootstrap";
import { Button, Tooltip, OverlayTrigger } from "@themesberg/react-bootstrap";


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
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          fontSize: "2rem",
          fontFamily: "Times New Roman",
        }}
      >
        Irrigation Control
      </h2>
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
              <Button>
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
              <Button>
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
              <Button>
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
              <Button>
                <FontAwesomeIcon icon={faRedo} />
              </Button>
            </OverlayTrigger>
          </span>
          <OverlayTrigger
            placement="bottom"
            trigger={["hover", "focus"]}
            overlay={<Tooltip>Save</Tooltip>}
          >
            <Button>
              <FontAwesomeIcon icon={faSave} />
            </Button>
          </OverlayTrigger>
        </div>
        <Table>
          <thead className="thead-light">
            <tr>
              <th
                className="border-0"
                style={{ background: "#b6b9bf"}}
              >
                Start Time
              </th>
              <th className="border-0" style={{ background: "#b6b9bf" }}>
                End Time
              </th>
              <th className="border-0" style={{ background: "#b6b9bf" }}>
                Run Time
              </th>
              <th className="border-0" style={{ background: "#b6b9bf" }}>
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
