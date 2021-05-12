import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './layout';
import { Login } from './views';

import { AuthProvider } from './utils/makeUserContext';
import Store, { initialState } from './store';

const App = () => (
  <AuthProvider>
    <Store.Provider initialState={initialState}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/" component={Layout} />
        </Switch>
      </BrowserRouter>
    </Store.Provider>
  </AuthProvider>
);

export default App;
