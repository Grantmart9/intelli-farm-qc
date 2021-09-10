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
import React, { useState } from "react";
import { Route, Switch, Redirect, useParams } from "react-router-dom";
import { Routes } from "routes";
import { Sidebar } from "components/Sidebar";
import { Navbar } from "components/Navbar";
import {
  Login,
  Logout,
  LoginContext,
  useAxiosLoginToken,
} from "components/Login";

import { LandingPage } from "pages/LandingPage";
import { IrrigationControl } from "pages/IrrigationControl";
import { Fertilizer } from "pages/Fertilizer";
import { IrrigationSchedule } from "pages/IrrigationSchedule";
import { Dashboard } from "pages/Dashboard";
import { Settings } from "pages/Settings";
import { Backwash } from "pages/Backwash";
import { Notifications } from "pages/Notifications";
import { Pumps } from "pages/Pumps";
import { API_URL, useApi } from "api";

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

const getBrandItem = (prefix, title) => ({
  title: title,
  action: {
    type: "brand",
    path: `${prefix}/`,
  },
});

const getFarmItems = (prefix, layout) =>
  !layout
    ? []
    : Object.entries(layout.farms).map(([farmName, pages]) => ({
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

const spacerItem = { action: { type: "spacer" } };

const getLogoutItem = (prefix) => ({
  title: "Logout",
  action: {
    type: "link",
    path: `${prefix}/logout`,
  },
});

const getNavItems = (prefix, layout) =>
  [
    [getBrandItem(prefix, layout && layout.company_name)],
    getFarmItems(prefix, layout),
    [spacerItem, getLogoutItem(prefix)],
  ].flat();

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const { clientId } = useParams();
  const prefix = `/${clientId}`;

  const [{ data: appLayout }] = useApi(`${API_URL}/${clientId}/get_app_layout`);

  return (
    <Route
      {...rest}
      render={(props) => (
        <div className="absolute inset-0 flex flex-col">
          <Navbar />
          <div className="flex flex-grow-1">
            <Sidebar items={getNavItems(prefix, appLayout)} />

            <main className="content">
              <Login loginUrl={`${API_URL}/${clientId}/intellifarm/login`} />
              <Component {...props} />
            </main>
          </div>
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
        path={routes.LandingPage.path}
        component={LandingPage}
      />
      <RouteWithSidebar
        exact
        path={routes.NotFound.path}
        component={() => <p>Not Found</p>}
      />
      <RouteWithSidebar
        exact
        path={routes.Logout.path}
        component={() => (
          <Logout
            logoutUrl={`${API_URL}${prefix}/intellifarm/logout`}
            redirect={routes.LandingPage.path}
          />
        )}
      />
      <FarmRoutes prefix={prefix} />
      <Redirect to={routes.NotFound.path} />
    </Switch>
  );
};

export const HomePage = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const ready = useAxiosLoginToken(() => setLoginOpen(true));

  if (!ready) return <></>;
  return (
    <LoginContext.Provider value={[loginOpen, setLoginOpen]}>
      <Switch>
        <Redirect exact path="/" to="/denau" />
        <Route path="/:clientId/" component={RouteInner} />
      </Switch>
    </LoginContext.Provider>
  );
};
