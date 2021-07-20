import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";

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

const Fertilizer = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }] = useAxios(
    `https://lodicon-test-api.herokuapp.com/api/v1/${farmId}/fertilizer`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  console.log(data);

  function createData(name, RequestedLevel, CurrentTotal, FlowRate) {
    return { name, RequestedLevel, CurrentTotal, FlowRate };
  }

  const rows = [
    createData("Fertilizer A", "160 L", "16 L", "123 m3/h"),
    createData("Fertilizer B", "150 L", "16 L", "123 m3/h"),
    createData("Fertilizer C", "140 L", "16 L", "123 m3/h"),
    createData("Fertilizer D", "100 L", "16 L", "123 m3/h"),
  ];

  return (
    <div>
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        Fertilizer
      </h1>
      <div style={{ display: "flex", marginLeft: "10rem" }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Fertilizer</StyledTableCell>
                <StyledTableCell>Requested Level</StyledTableCell>
                <StyledTableCell>Current Total</StyledTableCell>
                <StyledTableCell>Flow Rate</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.RequestedLevel}</StyledTableCell>
                  <StyledTableCell>{row.CurrentTotal}</StyledTableCell>
                  <StyledTableCell>{row.FlowRate}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
export default Fertilizer;
