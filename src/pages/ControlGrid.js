/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 26/10/2021 - 11:06:08
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 26/10/2021
 * - Author          : Grant
 * - Modification    :
 **/
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, ec, flow) {
  return { name, ec, flow };
}

const rows = [
  createData("Tank A", 159, 6.0),
  createData("Tank B", 237, 9.0),
  createData("Tank C", 262, 16.0),
  createData("Tank D", 305, 3.7)
];

const BasicTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">EC Setpoint</TableCell>
            <TableCell align="right">Flow rate ℓ/mᶟ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.ec}</TableCell>
              <TableCell align="right">{row.flow}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
