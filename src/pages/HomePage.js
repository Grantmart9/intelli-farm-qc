import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useParams } from "react-router-dom";
import { Routes } from "../routes";
import DashboardOverview from "./dashboard/DashboardOverview";
import useAxios from 'axios-hooks';
import Preloader from '../components/Preloader';
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

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

const RouteWithSidebar = ({ component: Component, ...rest }) => {

  const [loaded, setLoaded] = useState(false);

  const [{ data: appLayout, loading, error }] = useAxios(
    "https://lodicon-test-api.herokuapp.com/api/v1/denau/get_app_layout"
  );

  const getNavItems = (layout) => {
    const topItems = [];
    const botItems = [];

    let ClientName = layout.company_name;

    const farmItems = Object.entries(layout.farms).map(([farmName, pages]) => ({
      title: farmName,
      action: {
        type: "accordion",
        items: Object.entries(pages).map(([pageName, path]) => ({
          title: pageName,
          action: {
            type: "link",
            path: path
          }
        }))
      }
    }))
    return [topItems, farmItems, botItems].flat();
  }

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar items={getNavItems(appLayout)} />

        <main className="content">
          <Navbar />
          <Component {...props} />
          <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
        </main>
      </>
    )}
    />
  );
};

/*
localhost:3000/denau/dashboard/overview
*/

// Take an object containing all the routes with their paths and prefix the paths with the client id.
const prefixRoutes = (prefix, routes) => Object.entries(routes)
  .map(([name, { path }]) => ({ [name]: { path: `${prefix}${path}` } }))
  .reduce(Object.assign, {});

const RouteInner = () => {
  const { clientId } = useParams();
  const routes = prefixRoutes(`/${clientId}`, Routes);
  console.log(routes);
  return (
    <Switch>
      <Route
        exact
        path={routes.Default}>
        <Redirect to={routes.DashboardOverview.path}/>
      </Route>
      <RouteWithSidebar
        exact
        path={routes.DashboardOverview.path}
        component={DashboardOverview}
      />
      <Route exact path={routes.NotFound.path} component={() => <p>Not Found</p>}/>
      <Redirect to={routes.NotFound.path} />
    </Switch>
  )
}

export default () => (
  <Switch>
    <Route path={'/:clientId'} component={RouteInner}/>
  </Switch>
);
