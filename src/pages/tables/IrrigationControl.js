import React from "react";
import useAxios from 'axios-hooks';
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faEdit,
  faRedo,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./IrrigationControl.css";
import { withStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const IrrigationControl = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }] = useAxios(
    `https://lodicon-test-api.herokuapp.com/api/v1/${farmId}/irrigation`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  console.log(data);

  function createData(StartTime, EndTime, RunTime, Status) {
    return { StartTime, EndTime, RunTime, Status };
  }

  const rows = [
    createData("2021-04-08 12:00", "2021-04-08 13:20", "80 Minutes", "Running"),
  ];

  return (
    <>
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        Irrigation Control
      </h1>
      <div style={{ display: "block", marginLeft: "10rem" }}>
        <div class="icons">
          <g class="icons2">
            <FontAwesomeIcon icon={faRedo} />
          </g>
          <g class="icons2">
            <FontAwesomeIcon icon={faPlay} />
          </g>
          <g class="icons2">
            <FontAwesomeIcon icon={faPause} />
          </g>
          <g class="icons2">
            <FontAwesomeIcon icon={faEdit} />
          </g>
          <g class="icons2">
            <FontAwesomeIcon icon={faSave} />
          </g>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Start Time</StyledTableCell>
                <StyledTableCell>End Time</StyledTableCell>
                <StyledTableCell>Run Time</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell>{row.StartTime}</StyledTableCell>
                  <StyledTableCell>{row.EndTime}</StyledTableCell>
                  <StyledTableCell>{row.RunTime}</StyledTableCell>
                  <StyledTableCell>{row.Status}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
export default IrrigationControl;
