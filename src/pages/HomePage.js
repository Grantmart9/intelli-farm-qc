import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useParams } from "react-router-dom";
import { Routes } from "../routes";
import useAxios from 'axios-hooks';
import Preloader from '../components/Preloader';
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import DashboardOverview from "./dashboard/DashboardOverview";
import IrrigationControl from "./tables/IrrigationControl";
import Fertilizer from './tables/Fertilizer';
import {IrrigationSchedule} from "./tables/IrrigationSchedule";
import {Dashboard} from "./tables/Dashboard";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

const farm_pages = {
  irrigation: {
    name: "Irrigation Control",
    path: "/irrigation",
    page: IrrigationControl
  },
  fertilizer: {
    name: "Fertilizer",
    path: "/fertilizer",
    page: Fertilizer
  },
  schedule: {
    name: "Schedule",
    path: "/schedule",
    page: IrrigationSchedule
  },
  dashboard: {
    name: "Dashboard",
    path: "/dashboard",
    page: Dashboard
  }
};

const FarmRoutes = ({ prefix }) =>
  <>
    {
      Object.values(farm_pages).map((page, i) =>
        <RouteWithSidebar key={i} exact path={`${prefix}/:farmId${page.path}`} component={page.page} />)
    }
  </>

const getNavItems = (prefix, layout) => {
  const topItems = [];
  const botItems = [];

  const farmItems = Object.entries(layout.farms).map(([farmName, pages]) => ({
    title: farmName,
    action: {
      type: "accordion",
      items: Object.entries(pages).map(([pageName, path]) => {
        const farmPage = farm_pages[pageName] || { name: pageName };
        return {
          title: farmPage.name,
          action: {
            type: "link",
            path: `${prefix}/${path}`
          }
        };
      })
    }
  }))
  return [topItems, farmItems, botItems].flat();
}

const RouteWithSidebar = ({ component: Component, ...rest }) => {

  const { clientId } = useParams();
  const prefix = `/${clientId}`;

  const [loaded, setLoaded] = useState(false);

  const [{ data: appLayout, loading, error }] = useAxios(
    "https://lodicon-test-api.herokuapp.com/api/v1/denau/get_app_layout"
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar title={appLayout.company_name} items={getNavItems(prefix, appLayout)} />

        <main className="content">
          <Navbar />
          <Component {...props} />
          <Footer />
        </main>
      </>
    )}
    />
  );
};
const prefixRoutes = (prefix, routes) => Object.entries(routes)
  .map(([name, { path }]) => ({ [name]: { path: `${prefix}${path}` } }))
  .reduce((acc, obj) => Object.assign(acc, obj), {});

const RouteInner = () => {
  const { clientId } = useParams();
  const prefix = `/${clientId}`;
  const routes = prefixRoutes(prefix, Routes);
  console.log(routes);
  return (
    <Switch>
      <RouteWithSidebar
        exact
        path={routes.DashboardOverview.path}
        component={DashboardOverview}
      />
      <Route exact path={routes.NotFound.path} component={() => <p>Not Found</p>}/>
      <FarmRoutes prefix={prefix}/>
      <Redirect to={routes.NotFound.path} />
    </Switch>
  )
}

export default () => (
  <Switch>
    <Route path="/:clientId" component={RouteInner}/>
  </Switch>
);
