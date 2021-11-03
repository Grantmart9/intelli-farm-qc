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
import { API_URL, useApi } from "api";
import { Preloader } from "components/Preloader";
import { useParams } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import fertilizer from "images/fertilizer.png";
import backwash from "images/backwash.gif";
import { useRefetch } from "../components/Timer";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 6
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "dark" ? 200 : 700]
  },
  bar: {
    borderRadius: 6,
    backgroundColor: "#05ab24"
  }
}))(LinearProgress);

const WashBack = ({ backwash }) => {
  return (
    <div className="bg-gray-300 rounded shadow-md p-1">
      <div
        key={backwash.name}
        style={{ fontFamily: "Helvetica Neue" }}
        className="font-bold text-2xl mb-2"
      >
        {backwash.name}
      </div>
      <div className="grid grid-cols-2">
        <div className="grid grid-rows-1">
          <div
            style={{ fontFamily: "Helvetica Neue" }}
            className="font-bold text-green-800 text-xl mt-1"
          >
            {backwash.status}
          </div>
          <div
            style={{ fontFamily: "Helvetica Neue" }}
            key={backwash.alarm}
            className="font-bold text-sm text-red-400"
          >
            {backwash.alarm}
          </div>
        </div>
        <div className="ml-24 2xl:ml-28 md:ml-10">
          <img src={fertilizer} alt={fertilizer} width={70} height={70} />
        </div>
      </div>
    </div>
  );
};

export const Backwash = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }, refetch] = useApi(
    `${API_URL}/${farmId}/backwash`
  );

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
      <div className="p-4">
        <div className="bg-gray-300 rounded shadow-md font-bold block text-gray-800 text-center p-4">
          <div className="inline-block p-1">
            <div
              style={{ fontFamily: "Helvetica Neue" }}
              className="font-bold text-xl "
            >
              Status : {data.backwash_status.status}
            </div>
            <div
              style={{ fontFamily: "Helvetica Neue" }}
              className="font-bold text-xl "
            >
              Progress : {data.backwash_status.percentage_left.toFixed(2)} %
            </div>
          </div>
          <div className="mt-1">
            <div className="xl:mt-4 mt-4 xl:ml-20 xl:mr-20 p-1">
              <BorderLinearProgress
                variant="determinate"
                value={data.backwash_status.percentage_left}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="xl:grid grid-cols-4 rounded ml-6 mr-6 gap-4">
        {data.backwash_valves.map((backwash, i) => (
          <div key={i} className="mt-2 mb-3">
            <WashBack backwash={backwash} />
          </div>
        ))}
      </div>
    </div>
  );
};
