/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 16/08/2021 - 16:23:58
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 16/08/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React from "react";
import { Route, Switch, Redirect, useParams } from "react-router-dom";
import { Routes } from "../routes";
import useAxios from "axios-hooks";
import Preloader from "../components/Preloader";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import DashboardOverview from "./dashboard/DashboardOverview";
import IrrigationControl from "./tables/IrrigationControl";
import Fertilizer from "./tables/Fertilizer";
import { IrrigationSchedule } from "./tables/IrrigationSchedule";
import { Dashboard } from "./tables/Dashboard";
import Settings from "./tables/Settings";
import { Backwash } from "./tables/Backwash";
import { Notifications } from "./tables/Notifications";
import { Pumps } from "./tables/Pumps";
import { API_URL } from "../api";

const farm_pages = {
  dashboard: {
    name: "Dashboard",
    path: "/dashboard",
    page: Dashboard,
  },
  schedule: {
    name: "Schedule",
    path: "/schedule",
    page: IrrigationSchedule,
  },
  fertilizer: {
    name: "Fertilizer",
    path: "/fertilizer",
    page: Fertilizer,
  },
  irrigation: {
    name: "Irrigation Valves",
    path: "/irrigation",
    page: IrrigationControl,
  },
  pumps: {
    name: "Pumps",
    path: "/pumps",
    page: Pumps,
  },
  backwash: {
    name: "Backwash",
    path: "/backwash",
    page: Backwash,
  },
  notifications: {
    name: "Notifications",
    path: "/notifications",
    page: Notifications,
  },
  settings: {
    name: "Settings",
    path: "/settings",
    page: Settings,
  }
};

const farm_order = [
  "dashboard",
  "schedule",
  "fertilizer",
  "irrigation",
  "pumps",
  "backwash",
  "notifications",
  "settings"
]

const FarmRoutes = ({ prefix }) => (
  <>
    {Object.values(farm_pages).map((page, i) => (
      <RouteWithSidebar
        key={i}
        exact
        path={`${prefix}/:farmId${page.path}`}
        component={page.page}
      />
    ))}
  </>
);

const getNavItems = (prefix, layout) => {
  const topItems = [];
  const botItems = [];

  const farmItems = Object.entries(layout.farms).map(([farmName, pages]) => ({
    title: farmName,
    action: {
      type: "accordion",
      items: farm_order.filter(x => x in pages).map(pageName => {
        const path = pages[pageName];
        const farmPage = farm_pages[pageName] || { name: pageName };
        return {
          title: farmPage.name,
          action: {
            type: "link",
            path: `${prefix}/${path}`,
          },
        };
      }),
    },
  }));
  return [topItems, farmItems, botItems].flat();
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const { clientId } = useParams();
  const prefix = `/${clientId}`;

  const [{ data: appLayout, loading, error }] = useAxios(
    `${API_URL}/${clientId}/get_app_layout`
  );

  if (loading) return <Preloader />;
  if (error) return <p>Error!</p>;

  return (
    <Route
      {...rest}
      render={(props) => (
        <div
          style={{ "--sidenav-width": "400px" }}
          className="absolute inset-0"
        >
          <Sidebar
            title={appLayout.company_name}
            items={getNavItems(prefix, appLayout)}
          />

          <main className="content">
            <Navbar />
            <Component {...props} />
            <Footer />
          </main>
        </div>
      )}
    />
  );
};
const prefixRoutes = (prefix, routes) =>
  Object.entries(routes)
    .map(([name, { path }]) => ({ [name]: { path: `${prefix}${path}` } }))
    .reduce((acc, obj) => Object.assign(acc, obj), {});

const RouteInner = () => {
  const { clientId } = useParams();
  const prefix = `/${clientId}`;
  const routes = prefixRoutes(prefix, Routes);
  return (
    <Switch>
      <RouteWithSidebar
        exact
        path={routes.DashboardOverview.path}
        component={DashboardOverview}
      />
      <Route
        exact
        path={routes.NotFound.path}
        component={() => <p>Not Found</p>}
      />
      <FarmRoutes prefix={prefix} />
      <Redirect to={routes.NotFound.path} />
    </Switch>
  );
};

const HomePage = () => (
  <Switch>
    <Route path="/:clientId" component={RouteInner} />
  </Switch>
);

export default HomePage;
