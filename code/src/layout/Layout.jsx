import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import StickyFooter from './Footer';

import { getRoutes } from '../routes';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

const Layout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
      <StickyFooter />
    </div>
  );
};

export default Layout;