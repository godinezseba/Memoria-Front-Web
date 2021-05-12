import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SideBar from './SideBar';
import { PrivateRoute } from '../atoms';

import { getRoutes } from '../routes';

const Layout = () => (
  <SideBar>
    <Switch>
      <Redirect exact from="/" to="/companies" />
      {getRoutes().map((route, key) => {
        const { path, component, access } = route;
        const keyName = `${path}-${key}`;
        console.log(keyName, access)
        if (access !== 1)
          return <PrivateRoute path={path} key={keyName}> {component} </PrivateRoute>;
        return <Route path={path} key={keyName}> {component} </Route>;
      })}
    </Switch>
  </SideBar>
);

export default Layout;
