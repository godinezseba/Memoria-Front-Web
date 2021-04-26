import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SideBar from './SideBar';

import { getRoutes } from '../routes';



const Layout = () => {
  return (
    <SideBar>
      <Switch>
        <Redirect exact from="/" to="/companies" />
        {getRoutes().map((props, key) => {
          const { path, component } = props;
          return (
            <Route path={path} key={path}>
              {component}
            </Route>
          );
        })}
      </Switch>
    </SideBar>
  );
};

export default Layout;
