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
      <div className="p-4 ml-2 mt-2">
        <div className="grid xl:grid-cols-4 gap-3">
          {data.map((data, i) => (
            <div key={i} className="p-1.5 pb-2 bg-gray-300 rounded shadow-md ">
              <div className="font-bold text-2xl mb-2">{data.name}</div>
              <div className="grid grid-cols-2 -mb-2">
                <div className="grid grid-rows-2">
                  <div className="font-bold text-green-800 text-xl">
                    {data.pressure}
                  </div>
                  <div className="font-bold text-green-800 text-xl">
                    {data.status}
                  </div>
                  <div className="font-bold text-sm text-red-400 mb-2">
                    {data.alarm}
                  </div>
                </div>
                <div className="flex ml-10 align-center justify-center">
                  <img width={95} height={95} src={pump} alt={pump} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};
