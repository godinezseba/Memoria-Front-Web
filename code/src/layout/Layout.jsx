import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SideBar from './SideBar';

import { getRoutes } from '../routes';

const Layout = () => (
  <SideBar>
    <Switch>
      <Redirect exact from="/" to="/companies" />
      {getRoutes().map((route) => {
        const { path, component } = route;
        return <Route path={path}>{component}</Route>;
      })}
    </Switch>
  </SideBar>
);

export default Layout;
