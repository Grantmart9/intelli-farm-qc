import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
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

const AlarmTable = () => {
  function createData(DateTime, Reading, Alarm) {
    return { DateTime, Reading, Alarm };
  }

  const rows = [
    createData("2021-04-08-12:00", "159.4 mS", "Low"),
    createData("2021-03-08-12:00", "237.45 mS", "No Alarm"),
    createData("2021-07-08-11:10", "2343.53 mS", "No Alarm"),
    createData("2021-04-08-12:80", "305.67 mS", "High"),
    createData("2021-04-08-12:20", "356.87 mS", "No Alarm"),
  ];

  return (
    <form>
      <h1>Alarm Table</h1>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Date & Time</StyledTableCell>
              <StyledTableCell>Reading</StyledTableCell>
              <StyledTableCell>Alarm</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell>{row.DateTime}</StyledTableCell>
                <StyledTableCell>{row.Reading}</StyledTableCell>
                <StyledTableCell>{row.Alarm}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </form>
  );
};
export default AlarmTable;
