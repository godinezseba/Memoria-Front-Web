import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './layout';
import { Login } from './views';
import Store, { initialState } from './store';

const App = () => (
  <Store.Provider initialState={initialState}>
    <CssBaseline />
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/" component={Layout} />
      </Switch>
    </BrowserRouter>
  </Store.Provider>
);

export default App;
