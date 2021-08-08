import React from "react";
import {AppName} from "./AppName";
import ErrorPage from "./ErrorPage.jpg";
import { useParams } from "react-router-dom";
import useAxios from "axios-hooks";
import Preloader from "../../components/Preloader";
import { API_URL } from "../../api";

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
      <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:mt-0 md:mt-16 xl:mt-16 2xl:mt-16 sm:p-1 md:p-1 p-1">
        <div className="p-4">
        <div className="bg-gray-400 rounded shadow-md  p-2 flex justify-center">
        <div className="bg-gray-400 rounded shadow-md font-bold text-gray-800 text-center p-3 mt-3">
          <div className="font-bold text-2xl">{data.map(({ name }) => name)}</div>
          <div className="font-bold text-3xl">Pressure: {data.map(({ pressure }) => pressure)}</div>
          <div className="font-bold text-md text-red-400">Alarm Status: {data.map(({ alarm }) => alarm)}</div>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};
