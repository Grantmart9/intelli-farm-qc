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

const FarmTable = () => {
  const { farmId } = useParams();
  const prefix = `-${farmId}`;

  //const [{ data, loading: loadingData }, refetch] = useApi(
  // `https://lodicon-api.herokuapp.com/api/v1/${prefix}/manual_datetime_settings`
  //)
  const data = [
    {
      name: "Crimson 2+4",
      start_time_01: "12-12-2021 13:00",
      runtime_01: 69696969,
      tank_a_flow_01: 0.0,
      tank_b_flow_01: 0.0,
      tank_c_flow_01: 0.0,
      tank_d_flow_01: 0.0,
      tank_e_flow_01: 0.0,
      ec_01: 0.0,
      start_time_02: "1",
      runtime_02: 0,
      tank_a_flow_02: 0.0,
      tank_b_flow_02: 0.0,
      tank_c_flow_02: 0.0,
      tank_d_flow_02: 0.0,
      tank_e_flow_02: 0.0,
      ec_02: 0.0,
      start_time_03: "1",
      runtime_03: 0,
      tank_a_flow_03: 0.0,
      tank_b_flow_03: 0.0,
      tank_c_flow_03: 0.0,
      tank_d_flow_03: 0.0,
      tank_e_flow_03: 0.0,
      ec_03: 0.0,
      start_time_04: "1",
      runtime_04: 0,
      tank_a_flow_04: 0.0,
      tank_b_flow_04: 0.0,
      tank_c_flow_04: 0.0,
      tank_d_flow_04: 0.0,
      tank_e_flow_04: 0.0,
      ec_04: 0.0
    },
    {
      name: "Crimson 5+Starlight 2",
      start_time_01: "1",
      runtime_01: 0,
      tank_a_flow_01: 0.0,
      tank_b_flow_01: 0.0,
      tank_c_flow_01: 0.0,
      tank_d_flow_01: 0.0,
      tank_e_flow_01: 0.0,
      ec_01: 0.0,
      start_time_02: "1",
      runtime_02: 0,
      tank_a_flow_02: 0.0,
      tank_b_flow_02: 0.0,
      tank_c_flow_02: 0.0,
      tank_d_flow_02: 0.0,
      tank_e_flow_02: 0.0,
      ec_02: 0.0,
      start_time_03: "1",
      runtime_03: 0,
      tank_a_flow_03: 0.0,
      tank_b_flow_03: 0.0,
      tank_c_flow_03: 0.0,
      tank_d_flow_03: 0.0,
      tank_e_flow_03: 0.0,
      ec_03: 0.0,
      start_time_04: "1",
      runtime_04: 0,
      tank_a_flow_04: 0.0,
      tank_b_flow_04: 0.0,
      tank_c_flow_04: 0.0,
      tank_d_flow_04: 0.0,
      tank_e_flow_04: 0.0,
      ec_04: 0.0
    },
    {
      name: "Crimson 6+Timpson",
      start_time_01: "1",
      runtime_01: 0,
      tank_a_flow_01: 0.0,
      tank_b_flow_01: 0.0,
      tank_c_flow_01: 0.0,
      tank_d_flow_01: 0.0,
      tank_e_flow_01: 0.0,
      ec_01: 0.0,
      start_time_02: "1",
      runtime_02: 0,
      tank_a_flow_02: 0.0,
      tank_b_flow_02: 0.0,
      tank_c_flow_02: 0.0,
      tank_d_flow_02: 0.0,
      tank_e_flow_02: 0.0,
      ec_02: 0.0,
      start_time_03: "1",
      runtime_03: 0,
      tank_a_flow_03: 0.0,
      tank_b_flow_03: 0.0,
      tank_c_flow_03: 0.0,
      tank_d_flow_03: 0.0,
      tank_e_flow_03: 0.0,
      ec_03: 0.0,
      start_time_04: "1",
      runtime_04: 0,
      tank_a_flow_04: 0.0,
      tank_b_flow_04: 0.0,
      tank_c_flow_04: 0.0,
      tank_d_flow_04: 0.0,
      tank_e_flow_04: 0.0,
      ec_04: 0.0
    },
    {
      name: "Starlight 1+Sugra",
      start_time_01: "1",
      runtime_01: 0,
      tank_a_flow_01: 0.0,
      tank_b_flow_01: 0.0,
      tank_c_flow_01: 0.0,
      tank_d_flow_01: 0.0,
      tank_e_flow_01: 0.0,
      ec_01: 0.0,
      start_time_02: "1",
      runtime_02: 0,
      tank_a_flow_02: 0.0,
      tank_b_flow_02: 0.0,
      tank_c_flow_02: 0.0,
      tank_d_flow_02: 0.0,
      tank_e_flow_02: 0.0,
      ec_02: 0.0,
      start_time_03: "1",
      runtime_03: 0,
      tank_a_flow_03: 0.0,
      tank_b_flow_03: 0.0,
      tank_c_flow_03: 0.0,
      tank_d_flow_03: 0.0,
      tank_e_flow_03: 0.0,
      ec_03: 0.0,
      start_time_04: "1",
      runtime_04: 0,
      tank_a_flow_04: 0.0,
      tank_b_flow_04: 0.0,
      tank_c_flow_04: 0.0,
      tank_d_flow_04: 0.0,
      tank_e_flow_04: 0.0,
      ec_04: 0.0
    }
  ];

  console.log(data[0].name);
  return (
    <div>
      <div className="bg-white text-center text-justify rounded shadow-md mb-2">
        <div className="text-lg font-bold p-2">{data[0].name}</div>
      </div>
      <div className="mb-2">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Start Time #1: {data[0].start_time_01}</TableCell>
                <TableCell align="right">
                  Run Time #1: {data[0].runtime_01}
                </TableCell>
                <TableCell align="right">
                  EC Setpoint #1: {data[0].ec_01}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
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

                <TableCell align="right">{data[0].tank_a_flow_01}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Tank B
                </TableCell>

                <TableCell align="right">{data[0].tank_b_flow_01}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Tank C
                </TableCell>

                <TableCell align="right">{data[0].tank_c_flow_01}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Tank D
                </TableCell>

                <TableCell align="right">{data[0].tank_d_flow_01}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="mb-2">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Start Time #2: {data[0].start_time_02}</TableCell>
                <TableCell align="right">
                  Run Time #2: {data[0].runtime_02}
                </TableCell>
                <TableCell align="right">
                  EC Setpoint #2: {data[0].ec_02}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
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

                <TableCell align="right">{data[0].tank_a_flow_02}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Tank B
                </TableCell>

                <TableCell align="right">{data[0].tank_b_flow_02}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Tank C
                </TableCell>

                <TableCell align="right">{data[0].tank_c_flow_02}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Tank D
                </TableCell>

                <TableCell align="right">{data[0].tank_d_flow_02}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="mb-2">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Start Time #3: {data[0].start_time_03}</TableCell>
                <TableCell align="right">
                  Run Time #3: {data[0].runtime_03}
                </TableCell>
                <TableCell align="right">
                  EC Setpoint #3: {data[0].ec_03}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
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

                <TableCell align="right">{data[0].tank_a_flow_03}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Tank B
                </TableCell>

                <TableCell align="right">{data[0].tank_b_flow_03}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Tank C
                </TableCell>

                <TableCell align="right">{data[0].tank_c_flow_03}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Tank D
                </TableCell>

                <TableCell align="right">{data[0].tank_d_flow_03}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="mb-2">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Start Time #4: {data[0].start_time_04}</TableCell>
                <TableCell align="right">
                  Run Time #4: {data[0].runtime_04}
                </TableCell>
                <TableCell align="right">
                  EC Setpoint #4: {data[0].ec_04}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
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

                <TableCell align="right">{data[0].tank_a_flow_04}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Tank B
                </TableCell>

                <TableCell align="right">{data[0].tank_b_flow_04}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Tank C
                </TableCell>

                <TableCell align="right">{data[0].tank_c_flow_04}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Tank D
                </TableCell>

                <TableCell align="right">{data[0].tank_d_flow_04}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default FarmTable;
