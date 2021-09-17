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
    <div className="grid grid-cols-2 gap-1 p-1">
      <div className="shadow-md flex align-center justify-center rounded">
        <img src={drop} alt={drop} />
      </div>
      <div className="inline-block shadow-md text-center rounded">
        <div className="font-bold rounded text-xl">
          Water Total: {farm.water_total}
        </div>
        <div className="font-bold text-md">{farm.name}</div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2 p-1">
      <div className="p-2 shadow-md text-center rounded ">
        <div className="font-bold text-lg">Irrigation</div>
        <div className="font-bold text-sm">
          Time left: {farm.irrigation_time_left} min
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
        <div className="font-bold text-lg">Backwash</div>
        <div className="font-bold text-sm">
          Percentage: {farm.backwash_percentage} %
        </div>
        <div className="p-2">
          <ProgressBar variant="info" animated now={farm.backwash_percentage} />
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
