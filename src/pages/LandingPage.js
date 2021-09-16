/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 10/08/2021 - 15:19:43
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 10/08/2021
 * - Author          : Grant
 * - Modification    :
 **/

import React from "react";
import { useParams } from "react-router";
import { API_URL, useApi } from "api";
import { Preloader } from "components/Preloader";
import ErrorPage from "images/ErrorPage.jpg";
import { useRefetch } from "../components/Timer";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 6
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "dark" ? 200 : 700]
  },
  bar: {
    borderRadius: 6,
    backgroundColor: "#05ab24"
  }
}))(LinearProgress);

const FarmsData = ({ farm }) => (
  <div className="p-4">
    <div className="font-bold text-3xl">{farm.name}</div>
    <div className="font-bold text-md flex align-center justify-center ">
      Backwash Status: {farm.backwash_status}
    </div>
    <div className="font-bold text-md flex align-center justify-center">
      EC Value: {farm.ec_value}
    </div>
    <div className="font-bold text-md flex align-center justify-center">
      Irrigation percentage
    </div>
    <BorderLinearProgress
      variant="determinate"
      value={farm.irrigation_percentage}
    />
    <div className="font-bold text-md flex align-center justify-center">
      {farm.irrigation_status}
    </div>
    <div className="font-bold text-md flex align-center justify-center">
      Irrigation time left: {farm.irrigation_time_left}
    </div>
    <div className="font-bold text-md flex align-center justify-center">
      Pump Status: {farm.pumps}
    </div>
    <div className="font-bold text-md flex align-center justify-center">
      Water Total: {farm.water_total}
    </div>
  </div>
);

export const LandingPage = () => {
  const { clientId } = useParams();
  const [{ data, loading, error }, refetch] = useApi(
    `${API_URL}/${clientId}/landing`
  );

  useRefetch(refetch);

  if (!data && loading) return <Preloader />;
  if (error) return <img src={ErrorPage} alt={ErrorPage} />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 p-2">
      {data.landing_page.farms.map((farm, i) => (
        <div
          key={i}
          className="bg-gray-300  rounded shadow-md m-3 pt-1 flex align-center justify-center p-3"
        >
          <FarmsData farm={farm} />
        </div>
      ))}
    </div>
  );
};
