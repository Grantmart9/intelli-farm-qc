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
import { AppName } from "./AppName";
import ErrorGif from "./ErrorGif.gif";
import { API_URL } from "../../api";
import Preloader from "../../components/Preloader";
import { useParams } from "react-router-dom";
import useAxios from "axios-hooks";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import fertilizer from "./fertilizer.png";

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

const WashBack = ({ backwash }) => {
  return (
    <div className="bg-gray-400 rounded shadow-md p-2 flex gap-2">
      <div className="shadow-md rounded p-3 bg-gray-400 w-100">
        <div className="font-bold text-2xl">{backwash.name}</div>
        <div className="font-bold text-xl">{backwash.status}</div>
        <div className="font-bold text-md text-red-400">{backwash.alarm}</div>
      </div>
      <div className="bg-gray-400 rounded shadow-md p-2 items-center flex justify-center">
        <img src={fertilizer} alt={fertilizer} width="100rem" height="50rem" />
      </div>
    </div>
  );
};

export const Backwash = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }] = useAxios(`${API_URL}/${farmId}/backwash`);

  if (loading) return <Preloader />;
  if (error)
    return (
      <div style={{ backgroundColor: "#cad3de" }}>
        <AppName />
        <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:mt-0 md:mt-16 xl:mt-16 2xl:mt-16 sm:p-1 md:p-1 p-1">
          <img src={ErrorGif} alt={ErrorGif} width="100%" />
        </div>
      </div>
    );
  if (data === null)
    return (
      <div style={{ backgroundColor: "#cad3de" }}>
        <AppName />
        <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:mt-0 md:mt-16 xl:mt-16 2xl:mt-16 sm:p-1 md:p-1 p-1">
          <img src={ErrorGif} alt={ErrorGif} width="100%" />
        </div>
      </div>
    );

  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <AppName />
      <div className="h-500 sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:mt-0 md:mt-16 xl:mt-16 2xl:mt-16 sm:p-1 md:p-1 p-1">
        <div className="p-4">
          <div className="bg-gray-400 rounded shadow-md font-bold block text-gray-800 text-center p-4">
            <div className="bg-gray-400 rounded shadow-md inline-block p-2">
              <div className="font-bold text-xl">
                Status: {data.backwash_status.status}
              </div>
              <div className="font-bold text-xl ">
                Percentage left:
                {data.backwash_status.percentage_left.toFixed(2)} %
              </div>
            </div>
            <div className="bg-gray-400 shadow-md p-2">
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
            <div className="mt-2 mb-2">
              <WashBack key={i} backwash={backwash} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
