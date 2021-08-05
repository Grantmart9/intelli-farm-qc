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

   var Name = (data.map(({name})=>name));

   console.log(Name);

  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <AppName />
      <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:mt-0 md:mt-16 xl:mt-16 2xl:mt-16 sm:p-1 md:p-1 p-1">
        <div className="bg-gray-400 rounded shadow-md font-bold text-gray-800 text-center">
          <h1>Name: {data.map(({ name }) => name)}</h1>
          <h1>Alarm: {data.map(({ alarm }) => alarm)}</h1>
          <h1>Pressure: {data.map(({ pressure }) => pressure)}</h1>
          <h1>Pump Type: {data.map(({ pump_type }) => pump_type)}</h1>
        </div>
      </div>
    </div>
  );
};
