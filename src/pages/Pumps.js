/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 16/08/2021 - 14:46:41
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 16/08/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React from "react";
import ErrorGif from "images/ErrorGif.gif";
import { useParams } from "react-router-dom";
import { Preloader } from "components/Preloader";
import { API_URL, useApi } from "api";
import pump from "images/pump.png";
import { useRefetch } from "../components/Timer";

export const Pumps = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }, refetch] = useApi(
    `${API_URL}/${farmId}/pumps`
  );

  useRefetch(refetch);

  if (!data && loading) return <Preloader />;
  if (error)
    return (
      <div style={{ backgroundColor: "#cad3de" }}>
        <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:p-1 md:p-1 p-1">
          <img src={ErrorGif} alt={ErrorGif} width="100%" />
        </div>
      </div>
    );

  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:p-1 md:p-1 p-4 mt-2">
        <div className="grid xl:grid-cols-4 gap-3 p-2">
          {data.map((data, name, pressure, alarm) => (
            <div className="flex p-2 gap-2 bg-gray-400 rounded shadow-md ">
              <div className="bg-gray-400 rounded shadow-md p-2">
                <div key={name} className="font-bold text-2xl">
                  {data.name}
                </div>
                <div key={pressure} className="font-bold text-3xl">
                  {data.pressure}
                </div>
                <div key={alarm} className="font-bold text-md text-red-400">
                  {data.alarm}
                </div>
              </div>
              <div className="bg-gray-400 rounded shadow-md p-2 flex justify-center">
                <img src={pump} alt={pump} width={100} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
