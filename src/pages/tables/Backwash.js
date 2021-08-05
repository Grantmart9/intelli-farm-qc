import React from "react";
import { AppName } from "./AppName";
import ErrorPage from "./ErrorPage.jpg";
import { API_URL } from "../../api";
import Preloader from "../../components/Preloader";
import { useParams } from "react-router-dom";
import useAxios from "axios-hooks";

 const IrrigationEC = ({ data }) => (
   <div className="box-content p-2 text-center font-bold">
     <h1>Status: {data.status}</h1>
     <h1>Percentage Left: {data.percentage_left} %</h1>
   </div>
 );

export const Backwash = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }] = useAxios(`${API_URL}/${farmId}/backwash`);

  if (loading) return <Preloader />;
  if (error) return <img src={ErrorPage} alt={ErrorPage}/>;

  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <AppName />
      <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:mt-0 md:mt-16 xl:mt-16 2xl:mt-16 sm:p-1 md:p-1 p-1">
      <div className="grid grid-cols-1 lg:grid-cols-1 p-4 gap-4">
          <div className="bg-gray-400 rounded shadow-md">
            <IrrigationEC data={data.backwash_status} />
          </div>
        </div>
        </div>
      </div>
  );
};
