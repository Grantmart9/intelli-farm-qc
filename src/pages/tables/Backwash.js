import React from "react";
import { AppName } from "./AppName";
import ErrorPage from "./ErrorPage.jpg";
import { API_URL } from "../../api";
import Preloader from "../../components/Preloader";
import { useParams } from "react-router-dom";
import useAxios from "axios-hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRecycle } from "@fortawesome/free-solid-svg-icons";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

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
    <div className="shadow-md rounded p-3 bg-gray-400">
        <div className="font-bold text-2xl">{backwash.name}</div>
        <div className="font-bold text-3xl">
          {backwash.status}
          <span className="ml-20"></span>
          <span className="text-blue-800 text-3xl text-center ml-20">
            <FontAwesomeIcon icon={faRecycle} />
          </span>
        </div>
        <div className="font-bold text-md text-red-400">{backwash.alarm}</div>
    </div>
  );
};

export const Backwash = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }] = useAxios(`${API_URL}/${farmId}/backwash`);

  if (loading) return <Preloader />;
  if (error) return <img src={ErrorPage} alt={ErrorPage} />;

  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <AppName />
      <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:mt-0 md:mt-16 xl:mt-16 2xl:mt-16 sm:p-1 md:p-1 p-1">
        <div className="p-2.5">
          <div className="bg-gray-400 rounded shadow-md font-bold block text-gray-800 text-center p-3">
            <div className="font-bold text-xl">
              Alarm Status: {data.backwash_status.status}
            </div>
            <div className="font-bold text-xl ">
              Percentage Left: {data.backwash_status.percentage_left.toFixed(2)}{" "}
              %
            </div>
            <div className="xl:mt-2 xl:ml-20 xl:mr-20 p-2">
              <BorderLinearProgress
                variant="determinate"
                value={data.backwash_status.percentage_left.toFixed(2)}
              />
            </div>
          </div>
        </div>
        <div>
        <div className="xl:grid grid-cols-4 rounded">
          {data.backwash_valves.map((backwash, i) => (
            <div className="p-2">
              <WashBack key={i} backwash={backwash} />
            </div>
          ))}
          </div>
          </div>
        </div>
      </div>
  );
};
