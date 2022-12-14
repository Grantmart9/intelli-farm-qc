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
import { Route, Switch, Redirect, useParams, Link } from "react-router-dom";
import { Routes } from "routes";
import { Sidebar } from "components/Sidebar";
import { Navbar } from "components/Navbar";
import { Login, Logout, LoginContext } from "components/Login";
import { Users } from "pages/Users";
import { LandingPage } from "pages/LandingPage";
import { Control } from "pages/Control";
import { IrrigationControl } from "pages/IrrigationControl";
import { Fertilizer } from "pages/Fertilizer";
import { IrrigationSchedule } from "pages/IrrigationSchedule";
import { Dashboard } from "pages/Dashboard";
import { Report } from "pages/Report";
import { Backwash } from "pages/Backwash";
import { Notifications } from "pages/Notifications";
import { Pumps } from "pages/Pumps";
import { useApi } from "api";
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
    name: "AI Schedule",
    path: "/schedule",
    page: IrrigationSchedule,
  },
  fertilizer: {
    name: "Fertilizer",
    path: "/fertilizer",
    page: Fertilizer,
  },
  irrigation: {
    name: "Irrigation",
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
  control: {
    name: "Control",
    path: "/controller_state",
    page: Control,
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
  "control",
];

const FarmRoutes = () => (
  <>
    {Object.values(farm_pages).map((page, i) => (
      <Route
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
const growItem = { action: { type: "grow" } };

const getBottomItems = (prefix) => [
  {
    title: "Users",
    action: {
      type: "link",
      path: `${prefix}/users`,
    },
  },
  {
    title: "Logout",
    action: {
      type: "link",
      path: `${prefix}/logout`,
    },
  },
];

const getNavItems = (prefix, layout) =>
  [
    [getBrandItem(prefix, layout && layout.company_name)],
    [spacerItem],
    getFarmItems(prefix, layout),
    [growItem],
    getBottomItems(prefix),
  ].flat();

const WithSidebar = ({ children }) => {
  const { clientId } = useParams();
  const isMd = useMd();
  const [show] = useContext(SidebarContext);
  const fullSidebar = show && isMd;
  const appLayout = useContext(AppLayout);
  const prefix = `/${clientId}`;
  const navItems = getNavItems(prefix, appLayout);

  return (
    <div className="absolute w-full vh-100 flex flex-col overflow-hidden">
      <Navbar />
      <div
        style={{
          height: "calc(100vh - 60px)",
        }}
        className="flex"
      >
        <Sidebar items={navItems}></Sidebar>

        {/* TODO: Simplify this shit without breaking anything */}
        <main
          style={{
            width: show ? "calc(100vw - 300px)" : "calc(100vw)",
          }}
          className={`relative ${
            fullSidebar ? "hidden" : ""
          } content flex-grow-1 bg-gray-500 overflow-auto`}
        >
          <Login loginUrl={`/${clientId}/intellifarm/login`} />
          {children}
        </main>
      </div>
    </div>
  );
};

const RouteInner = () => {
  const { clientId } = useParams();

  const [{ data: appLayout }] = useApi(`/${clientId}/get_app_layout`);

  return (
    <AppLayout.Provider value={appLayout}>
      <WithSidebar>
        <Switch>
          <Route exact path={Routes.LandingPage.path} component={LandingPage} />
          <Route
            exact
            path={Routes.NotFound.path}
            component={() => <p>Not Found</p>}
          />
          <Route exact path={Routes.Users.path} component={Users} />

          <Route exact path={Routes.Control.path} component={Control} />
          <Route
            exact
            path={Routes.Logout.path}
            component={() => (
              <Logout
                logoutUrl={`/${clientId}/intellifarm/logout`}
                redirect={Routes.LandingPage.path.replace(
                  ":clientId",
                  clientId
                )}
              />
            )}
          />
          <FarmRoutes />
          <Redirect to={Routes.NotFound.path} />
        </Switch>
      </WithSidebar>
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
