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
import { useParams } from "react-router";
import { API_URL, useApi } from "api";
import { Preloader } from "components/Preloader";
import ErrorGif from "images/ErrorGif.gif";
import { useRefetch } from "../components/Timer";
import { ProgressBar } from "@themesberg/react-bootstrap";
import drop from "images/drop.png";

const FarmsData = ({ farm }) => (
  <div className="p-2">
    <div className="grid grid-cols-2 gap-2 p-1">
      <div className="inline-flex align-center justify-center shadow-md rounded p-1 ">
        <div className="flex items-center">
          <img width={40} height={40} src={drop} alt={drop} />
        </div>
        <div
          style={{ fontFamily: "Helvetica Neue" }}
          className="font-bold text-sm flex items-center"
        >
          {farm.name}
        </div>
      </div>
      <div className="inline-block shadow-md text-center rounded p-1">
        <div
          style={{ fontFamily: "Helvetica Neue" }}
          className="font-bold rounded text-md mt-2 "
        >
          Water Supply <div>{farm.water_total} m³/h</div>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2 p-1">
      <div className="p-2 shadow-md text-center rounded ">
        <div
          style={{ fontFamily: "Helvetica Neue" }}
          className="font-bold text-md pb-2"
        >
          Irrigation
        </div>

        <div className="p-2">
          <ProgressBar
            variant="success"
            animated
            now={farm.irrigation_percentage}
          />
        </div>
      </div>
      <div className="p-2 shadow-md text-center rounded">
        <div
          style={{ fontFamily: "Helvetica Neue" }}
          className="font-bold text-md pb-2"
        >
          EC
        </div>
        <div
          style={{ fontFamily: "Helvetica Neue" }}
          className="font-bold text-sm"
        >
          Value: {farm.ec_value} µS
        </div>
        <div
          style={{ fontFamily: "Helvetica Neue" }}
          classNme="font-bold text-sm"
        >
          Target: {farm.ec_target} µS
        </div>
      </div>
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
  if (error) return <img src={ErrorGif} alt={ErrorGif} />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 p-2">
      {data.landing_page.farms.map((farm, i) => (
        <div key={i} className="bg-gray-300  rounded shadow-md m-3 pt-1">
          <FarmsData farm={farm} />
        </div>
      ))}
    </div>
  );
};
