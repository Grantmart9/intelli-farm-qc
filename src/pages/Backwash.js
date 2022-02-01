/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 12/08/2021 - 15:13:18
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 12/08/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React from "react";
import ErrorGif from "images/ErrorGif.gif";
import { useApi } from "api";
import { Preloader } from "components/Preloader";
import { useParams } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import water_filter from "images/water_filter.png";
import { useRefetch } from "../components/Timer";
import { ProgressBar } from "@themesberg/react-bootstrap";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 6,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "dark" ? 200 : 700],
  },
  bar: {
    borderRadius: 6,
    backgroundColor: "#05ab24",
  },
}))(LinearProgress);

const BackwashItem = ({ backwash }) => {
  return (
    <div className="bg-gray-300 rounded shadow-md p-2">
      <div className="font-bold text-2xl mb-2">{backwash.name}</div>
      <div className="flex justify-between">
        <div className="flex flex-col justify-end">
          <div className="font-bold text-green-800 text-xl">
            {backwash.status}
          </div>
          <div className="font-bold text-sm text-red-400">{backwash.alarm}</div>
        </div>
        <div>
          <img src={water_filter} width={70} />
        </div>
      </div>
    </div>
  );
};
/////////////////////////////////////////////////////////////////////////////////////////////
const backwashdata = [
  {
    timestamp: "31-01-22 12:34",
    backwashtype: "backwash valve 3",
  },
  {
    timestamp: "31-01-22 12:35",
    backwashtype: "backwash valve 4",
  },
  {
    timestamp: "31-01-22 12:36",
    backwashtype: "backwash valve 5",
  },
];
/////////////////////////////////////////////////////////////////////////////////////////////////

const BackwashProgress = ({ data }) => (
  <div className="bg-gray-300 rounded shadow-md p-2 flex flex-col justify-between">
    <span className="text-2xl font-bold">Progress</span>
    <div className="mt-3 mx-4">
      <ProgressBar
        variant="success"
        animated
        now={data.backwash_status.percentage_left}
      />
    </div>
    <div className="flex justify-between text-xl font-bold">
      <span>{data.backwash_status.status}</span>
      <span>{data.backwash_status.percentage_left.toFixed(2)}%</span>
    </div>
  </div>
);

export const Backwash = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }, refetch] = useApi(`/${farmId}/backwash`);

  useRefetch(refetch);

  if (!data && loading) return <Preloader />;
  if (error)
    return (
      <div>
        <img src={ErrorGif} alt={ErrorGif} width="100%" />
      </div>
    );
  if (data === null)
    return (
      <div>
        <img src={ErrorGif} alt={ErrorGif} width="100%" />
      </div>
    );

  return (
    <div>
      <div
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}
        className="grid gap-4 p-4"
      >
        <BackwashProgress data={data} />
        {data.backwash_valves.map((backwash, i) => (
          <div key={i}>
            <BackwashItem backwash={backwash} />
          </div>
        ))}
      </div>
      
    </div>
  );
};
