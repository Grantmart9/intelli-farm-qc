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
import { Table, ProgressBar } from "@themesberg/react-bootstrap";
import { useRefetch } from "../components/Timer";

const columns = [
  {
    name: "Name",
    field: "name",
    type: "text"
  },
  {
    name: "Irrigation",
    field: "irrigation_status",
    type: "text"
  },
  {
    name: "Irrigation %",
    field: "irrigation_percentage",
    type: "progress"
  },
  {
    name: "Time Left",
    field: "irrigation_time_left",
    type: "text"
  },
  {
    name: "Backwash",
    field: "backwash_status",
    type: "text"
  },
  {
    name: "Backwash %",
    field: "backwash_percentage",
    type: "progress"
  },
  {
    name: "Water Total",
    field: "water_total",
    type: "text"
  },
  {
    name: "Pumps",
    field: "pumps",
    type: "text"
  },
  {
    name: "EC Value",
    field: "ec_value",
    type: "text"
  }
];

const FarmTableCell = ({ value, type }) => {
  switch (type) {
    case "text":
      return <td>{value}</td>;
    case "progress":
      return (
        <td>
          <ProgressBar value={value} min={0} max={100} />
        </td>
      );
    default:
      throw Error("impossible");
  }
};

const FarmTable = ({ data }) => {
  return (
    <div className="sm-ml-0 md:ml-6 xl:ml-6 2xl:ml-6 sm:p-1 md:p-1 p-2">
      <div className="bg-blue-100 rounded shadow-md w-full ">
        <Table>
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i}>{col.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((farm) => (
              <tr>
                {columns.map((col, i) => (
                  <FarmTableCell
                    key={i}
                    value={farm[col.field]}
                    type={col.type}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export const LandingPage = () => {
  const { clientId } = useParams();
  const [{ data, loading, error }, refetch] = useApi(
    `${API_URL}/${clientId}/landing`
  );

  useRefetch(refetch);

  if (!data && loading) return <Preloader />;
  if (error) return <img src={ErrorPage} alt={ErrorPage} />;

  return <FarmTable data={data.landing_page.farms} />;
};
