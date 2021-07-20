import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from '$layout';
import { Login } from '$views';

import { AuthProvider } from '$store/makeUserContext';
import Store, { initialState } from '$store';

const App = () => (
  <div style={{ height: '100vh' }}>
    <CssBaseline />
    <AuthProvider>
      <Store.Provider initialState={initialState}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/" component={Layout} />
          </Switch>
        </BrowserRouter>
      </Store.Provider>
    </AuthProvider>
  </div>
);

export default App;
