import React from "react";
import { AppName } from "./AppName";
import ErrorPage from "./ErrorPage.jpg";
import { API_URL } from "../../api";
import Preloader from "../../components/Preloader";
import { useParams } from "react-router-dom";
import useAxios from "axios-hooks";

 const WashBack = ({ backwash }) => {
   return (
     <div>
       <div className="shadow-md border-1 rounded">
         <div
           style={{
             border: "1px 1px solid black",
             display: "flex",
             padding: "1rem",
             fontFamiliy: "Times New Roman",
             fontWeight: "bold",
             gap: "1rem",
           }}
         >
           <div>
             <h4 style={{ color: "#4a5073", fontSize: "1rem" }}>{backwash.name}</h4>
             <h2 style={{ color: "#4a5073", fontSize: "1.5rem" }}>
               {backwash.status}
             </h2>
             <h2 style={{ color: "#4a5073", fontSize: "0.7rem" }}>
               {backwash.alarm}
             </h2>
           </div>
         </div>
       </div>
     </div>
   );
 };

export const Backwash = () => {
  const { farmId } = useParams();
 const [{ data, loading, error }] = useAxios(`${API_URL}/${farmId}/backwash`);

 if (loading) return <Preloader />;
 if (error) return <img src={ErrorPage} alt={ErrorPage}/>;

  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <AppName />
      <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:mt-0 md:mt-16 xl:mt-16 2xl:mt-16 sm:p-1 md:p-1 p-1">
        <div className="bg-gray-400 rounded shadow-md font-bold text-gray-800 p-2 text-center mt-3">
          <h1>Alarm Status: {data.backwash_status.status}</h1>
          <h1>Percentage Left: {data.backwash_status.percentage_left} %</h1>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(15rem, 1fr))",
            gridGap: "1rem",
            marginTop: "1rem",
            padding: "0.8rem",
          }}
        >
          {data.backwash_valves.map((backwash, i) => (
            <div className="bg-gray-400 rounded shadow-md">
              <WashBack key={i} backwash={backwash} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
