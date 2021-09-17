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
      <div>
        <div className="p-1">
          <img src={ErrorGif} alt={ErrorGif} width="100%" />
        </div>
      </div>
    );

  return (
    <div>
      <div className="p-4">
        <div className="grid xl:grid-cols-4 gap-3 p-2">
          {data.map((data, i) => (
            <div key={i} className="p-2 bg-gray-400 rounded shadow-md ">
              <div className="">
                <div className="font-bold text-2xl mb-2">{data.name}</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="">
                    <div className="font-bold text-green-800 text-xl">
                      Pressure: {data.pressure}
                    </div>
                    <div className="font-bold text-green-800 text-xl">
                      Status: {data.status}
                    </div>
                    <div className="font-bold text-md text-red-400">
                      {data.alarm}
                    </div>
                  </div>
                  <div className="flex ml-10 align-center justify-center">
                    <img width={80} src={pump} alt={pump} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
