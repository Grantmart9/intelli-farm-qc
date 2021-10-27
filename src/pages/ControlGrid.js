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
import { useParams } from "react-router-dom";
import { useApi, API_URL, post } from "api";
import Paper from "@mui/material/Paper";

const BasicTable1 = () => {
  return (
    <div className="mb-2">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Flow m³/h</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Tank A
              </TableCell>

              <TableCell align="right">3.4</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Tank B
              </TableCell>

              <TableCell align="right">3.4</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Tank C
              </TableCell>

              <TableCell align="right">3.4</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Tank D
              </TableCell>

              <TableCell align="right">3.4</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
const BasicTable2 = () => {
  return (
    <div className="mb-2">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Flow m³/h</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Tank A
              </TableCell>

              <TableCell align="right">3.4</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Tank B
              </TableCell>

              <TableCell align="right">3.4</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Tank C
              </TableCell>

              <TableCell align="right">3.4</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Tank D
              </TableCell>

              <TableCell align="right">3.4</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
const BasicTable3 = () => {
  return (
    <div className="mb-2">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Flow m³/h</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Tank A
              </TableCell>

              <TableCell align="right">3.4</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Tank B
              </TableCell>

              <TableCell align="right">3.4</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Tank C
              </TableCell>

              <TableCell align="right">3.4</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Tank D
              </TableCell>

              <TableCell align="right">3.4</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
const BasicTable4 = () => {
  return (
    <div className="mb-2">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Flow m³/h</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Tank A
              </TableCell>

              <TableCell align="right">3.4</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Tank B
              </TableCell>

              <TableCell align="right">3.4</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Tank C
              </TableCell>

              <TableCell align="right">3.4</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Tank D
              </TableCell>

              <TableCell align="right">3.4</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const FarmName = () => {
  return (
    <div className="bg-white rounded shadow-md mb-2 ">
      <div className="p-2 text-center font-bold">Crimson 5 + Startlight 6</div>
    </div>
  );
};

const TopBar1 = () => {
  return (
    <div className="mb-2">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Start Time #1: 12:34</TableCell>
              <TableCell align="right">Run Time #1: 12 min</TableCell>
              <TableCell align="right">EC Setpoint #1: 12 µS </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
};
const TopBar2 = () => {
  return (
    <div className="mb-2">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Start Time #2: 12:34</TableCell>
              <TableCell align="right">Run Time #2: 12 min</TableCell>
              <TableCell align="right">EC Setpoint #2: 12 µS </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
};
const TopBar3 = () => {
  return (
    <div className="mb-2">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Start Time #3: 12:34</TableCell>
              <TableCell align="right">Run Time #3: 12 min</TableCell>
              <TableCell align="right">EC Setpoint #3: 12 µS </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
};
const TopBar4 = () => {
  return (
    <div className="mb-2">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Start Time #4: 12:34</TableCell>
              <TableCell align="right">Run Time #4: 12 min</TableCell>
              <TableCell align="right">EC Setpoint #4: 12 µS </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
};

const FarmTable = () => {
  const { farmId } = useParams();
  const prefix = `${API_URL}/-${farmId}`;

  const [{ data, loading: loadingData }, refetch] = useApi(
    `https://87ef07d7-12c7-4394-b72e-68d37a808372.mock.pstmn.io/get`
  );
  return (
    <div>
      <FarmName />
      <TopBar1 />
      <BasicTable1 />
      <TopBar2 />
      <BasicTable2 />
      <TopBar3 />
      <BasicTable3 />
      <TopBar4 />
      <BasicTable4 />
    </div>
  );
};

export default FarmTable;
