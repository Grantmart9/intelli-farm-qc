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
import React, { useContext, useEffect, useState } from "react";
import { Route, Switch, Redirect, useParams } from "react-router-dom";
import { Routes } from "../routes";
import useAxios from "axios-hooks";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Login, ModalContext as LoginContext, openLoginOnUnauthorized as interceptAxiosErrorUnauthorized, useAxiosAddJwt, useAxiosErrorUnauthorized, useAxiosLoginToken } from "../components/Login";

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
  },
};

const farm_order = [
  "dashboard",
  "schedule",
  "fertilizer",
  "irrigation",
  "pumps",
  "backwash",
  "notifications",
  "settings",
];

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

const getFarmItems = (prefix, layout) =>
  Object.entries(layout.farms).map(([farmName, pages]) => ({
    title: farmName,
    action: {
      type: "accordion",
      items: farm_order
        .filter((x) => x in pages)
        .map((pageName) => {
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

const getNavItems = (prefix, layout) =>
  layout ? getFarmItems(prefix, layout) : [];

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const { clientId } = useParams();
  const prefix = `/${clientId}`;

  const [{ data: appLayout }, fetchAppLayout] = useAxios(
    `${API_URL}/${clientId}/get_app_layout`,
    { manual: true }
  );

  const [loginOpen,] = useContext(LoginContext);
  useEffect(() => {
    if(!appLayout && !loginOpen) {
        fetchAppLayout().catch(() => {})
    }
  }, [fetchAppLayout, appLayout, loginOpen])

  return (
    <Route
      {...rest}
      render={(props) => (
        <div
          style={{ "--sidenav-width": "400px" }}
          className="absolute inset-0"
        >
          <Sidebar
            title={appLayout && appLayout.company_name}
            items={getNavItems(prefix, appLayout)}
          />

          <main className="content">
            <Navbar />
              <Login loginUrl={`${API_URL}/${clientId}/intellifarm/login`}/>
              <Component {...props}/>
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

const HomePage = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  useAxiosLoginToken(() => setLoginOpen(true));

  return (
    <LoginContext.Provider value={[loginOpen, setLoginOpen]}>
      <Switch>
        <Redirect exact path="/" to="/denau"/>
        <Route path="/:clientId/" component={RouteInner} />
      </Switch>
    </LoginContext.Provider>
  )
};

export default HomePage;
