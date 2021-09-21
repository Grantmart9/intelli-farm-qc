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
import React, { createContext, useState, useContext } from "react";
import { Route, Switch, Redirect, useParams } from "react-router-dom";
import { Routes } from "routes";
import { Sidebar } from "components/Sidebar";
import { Navbar } from "components/Navbar";
import { Login, Logout, LoginContext } from "components/Login";

import { LandingPage } from "pages/LandingPage";
import { IrrigationControl } from "pages/IrrigationControl";
import { Fertilizer } from "pages/Fertilizer";
import { IrrigationSchedule } from "pages/IrrigationSchedule";
import { Dashboard } from "pages/Dashboard";
import { Report } from "pages/Report";
import { Backwash } from "pages/Backwash";
import { Notifications } from "pages/Notifications";
import { Pumps } from "pages/Pumps";
import { API_URL, useApi } from "api";
import { SidebarContext } from "../components/Sidebar";
import { useMd } from "media-query";

const AppLayout = createContext();

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
  report: {
    name: "Report",
    path: "/report",
    page: Report,
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
  "report",
];

const FarmRoutes = () => (
  <>
    {Object.values(farm_pages).map((page, i) => (
      <RouteWithSidebar
        key={i}
        exact
        path={`/:clientId/:farmId${page.path}`}
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
  const isMd = useMd();
  const [show] = useContext(SidebarContext);
  const fullSidebar = show && isMd;
  const appLayout = useContext(AppLayout);
  const prefix = `/${clientId}`;

  return (
    <Route
      {...rest}
      render={(props) => (
        <div className="absolute w-full vh-100 flex flex-col overflow-hidden">
          <Navbar />
          <div
            style={{
              height: "calc(100vh - 60px)",
            }}
            className="flex"
          >
            <Sidebar items={getNavItems(prefix, appLayout)} />

            <main
              style={{
                width: show ? "calc(100vw - 300px)" : "calc(100vw)",
              }}
              className={`relative ${
                fullSidebar ? "hidden" : ""
              } content flex-grow-1 bg-gray-500 overflow-auto`}
            >
              <Login loginUrl={`${API_URL}/${clientId}/intellifarm/login`} />
              <Component {...props} />
            </main>
          </div>
        </div>
      )}
    />
  );
};

const RouteInner = () => {
  const { clientId } = useParams();

  const [{ data: appLayout }] = useApi(`${API_URL}/${clientId}/get_app_layout`);

  return (
    <AppLayout.Provider value={appLayout}>
      <Switch>
        <RouteWithSidebar
          exact
          path={Routes.LandingPage.path}
          component={LandingPage}
        />
        <RouteWithSidebar
          exact
          path={Routes.NotFound.path}
          component={() => <p>Not Found</p>}
        />
        <RouteWithSidebar
          exact
          path={Routes.Logout.path}
          component={() => (
            <Logout
              logoutUrl={`${API_URL}/${clientId}/intellifarm/logout`}
              redirect={Routes.LandingPage.path.replace(":clientId", clientId)}
            />
          )}
        />
        <FarmRoutes />
        <Redirect to={Routes.NotFound.path} />
      </Switch>
    </AppLayout.Provider>
  );
};

export const HomePage = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <LoginContext.Provider value={[loginOpen, setLoginOpen]}>
      <SidebarContext.Provider value={[showSidebar, setShowSidebar]}>
        <Switch>
          <Redirect exact path="/" to="/denau" />
          <Route path="/:clientId/" component={RouteInner} />
        </Switch>
      </SidebarContext.Provider>
    </LoginContext.Provider>
  );
};
