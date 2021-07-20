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

const IrrigationSchedule = () => {
  function createData(
    name,
    Number,
    Block,
    MoistureLevel,
    RunTime,
    Fertilizer,
    FertA,
    FertB,
    FertC,
    FertD,
    FertE
  ) {
    return {
      name,
      Number,
      Block,
      MoistureLevel,
      RunTime,
      Fertilizer,
      FertA,
      FertB,
      FertC,
      FertD,
      FertE,
    };
  }

  const rows = [
    createData(
      "1",
      "Block A",
      "98.1 %",
      "16 Minutes",
      "65 L",
      "60 %",
      "20 %",
      "5 %",
      "15 %",
      "2 %",
      "6 %"
    ),
    createData(
      "2",
      "Block B",
      "98.1 %",
      "16 Minutes",
      "65 L",
      "60 %",
      "20 %",
      "5 %",
      "15 %",
      "2 %",
      "6 %"
    ),
    createData(
      "3",
      "Block C",
      "98.1 %",
      "16 Minutes",
      "65 L",
      "60 %",
      "20 %",
      "5 %",
      "15 %",
      "2 %",
      "6 %"
    ),
    createData(
      "4",
      "Block D",
      "98.1 %",
      "16 Minutes",
      "65 L",
      "60 %",
      "20 %",
      "5 %",
      "15 %",
      "2 %",
      "6 %"
    ),
    createData(
      "5",
      "Block E",
      "98.1 %",
      "16 Minutes",
      "65 L",
      "60 %",
      "20 %",
      "5 %",
      "15 %",
      "2 %",
      "6 %"
    ),
  ];

  return (
    <form>
      <h1>Irrigation Schedule</h1>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Block</StyledTableCell>
              <StyledTableCell>Moisture Level</StyledTableCell>
              <StyledTableCell>Run Time</StyledTableCell>
              <StyledTableCell>Fertilizer</StyledTableCell>
              <StyledTableCell>Fert A</StyledTableCell>
              <StyledTableCell>Fert B</StyledTableCell>
              <StyledTableCell>Fert C</StyledTableCell>
              <StyledTableCell>Fert D</StyledTableCell>
              <StyledTableCell>Fert E</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell>{row.Number}</StyledTableCell>
                <StyledTableCell>{row.Block}</StyledTableCell>
                <StyledTableCell>{row.MoistureLevel}</StyledTableCell>
                <StyledTableCell>{row.RunTime}</StyledTableCell>
                <StyledTableCell>{row.Fertilizer}</StyledTableCell>
                <StyledTableCell>{row.FertA}</StyledTableCell>
                <StyledTableCell>{row.FertB}</StyledTableCell>
                <StyledTableCell>{row.FertC}</StyledTableCell>
                <StyledTableCell>{row.FertD}</StyledTableCell>
                <StyledTableCell>{row.FertE}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </form>
  );
};
export default IrrigationSchedule;
