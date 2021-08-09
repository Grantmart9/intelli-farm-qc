import React from "react";
import {AppName} from "./AppName";
import ErrorPage from "./ErrorPage.jpg";
import { useParams } from "react-router-dom";
import useAxios from "axios-hooks";
import Preloader from "../../components/Preloader";
import { API_URL } from "../../api";
import IrrigationPump from "./IrrigationPump.png";

export const Pumps = () => {
   const { farmId } = useParams();
   const [{ data, loading, error }] = useAxios(
     `${API_URL}/${farmId}/pumps`
   );

   if (loading) return <Preloader />;
   if (error) return <img src={ErrorPage} alt={ErrorPage} width="100%" />;

  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <AppName />
      <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:mt-0 md:mt-16 xl:mt-16 2xl:mt-16 sm:p-1 md:p-1 p-4">
        <div className="bg-gray-400 shadow-md rounded p-1 inline-flex">
        <div className="flex p-2 gap-2">
        <div className="bg-gray-400 rounded shadow-md p-2">
          <div className="font-bold text-2xl">{data.map(({ name }) => name)}</div>
          <div className="font-bold text-3xl">Pressure: {data.map(({ pressure }) => pressure)}</div>
          <div className="font-bold text-md text-red-400">Alarm Status: {data.map(({ alarm }) => alarm)}</div>
        </div>
        <div className="bg-gray-400 rounded shadow-md p-2"><img src={IrrigationPump} alt={IrrigationPump} width={100}/></div>
        </div>
        </div>
      </div>
    </div>
  );
};
