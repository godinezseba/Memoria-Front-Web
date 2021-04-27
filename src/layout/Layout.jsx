import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SideBar from './SideBar';

import { getRoutes } from '../routes';

const Layout = () => (
  <SideBar>
    <Switch>
      <Redirect exact from="/" to="/companies" />
      {getRoutes().map((route, key) => {
        const { path, component } = route;
        const keyName = `${path}-${key}`
        return <Route path={path} key={keyName}> {component} </Route>;
      })}
    </Switch>
  </SideBar>
);

export default Layout;
