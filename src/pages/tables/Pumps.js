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
import { AppName } from "./AppName";
import ErrorGif from "./ErrorGif.gif";
import { useParams } from "react-router-dom";
import useAxios from "axios-hooks";
import Preloader from "../../components/Preloader";
import { API_URL } from "../../api";
import pump from "./pump.png";

export const Pumps = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }] = useAxios(`${API_URL}/${farmId}/pumps`);

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

  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <AppName />
      <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:mt-0 md:mt-16 xl:mt-16 2xl:mt-16 sm:p-1 md:p-1 p-4">
        <div className="flex gap-2">
          {data.map((data, name, pressure, alarm) => (
            <div
              key="1"
              className="flex p-2 gap-2 bg-gray-400 rounded shadow-md "
            >
              <div key="2" className="bg-gray-400 rounded shadow-md p-2">
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
              <div
                key="4"
                className="bg-gray-400 rounded shadow-md p-2 flex justify-center"
              >
                <img src={pump} alt={pump} width={100} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
