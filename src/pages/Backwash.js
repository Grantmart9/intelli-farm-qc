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
    <div className="bg-gray-300 rounded shadow-md p-1">
      <div className="font-bold text-2xl mb-2">{backwash.name}</div>
      <div className="flex justify-between mb-2">
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
      <div className="p-4">
        <div className="bg-gray-300 rounded shadow-md font-bold block text-gray-800 text-center p-4">
          <div className="inline-block p-1">
            <div className="font-bold text-xl">
              Status : {data.backwash_status.status}
            </div>
            <div className="font-bold text-xl ">
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
      <div
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}
        className="grid gap-4 p-4"
      >
        {data.backwash_valves.map((backwash, i) => (
          <div key={i}>
            <BackwashItem backwash={backwash} />
          </div>
        ))}
      </div>
    </div>
  );
};
