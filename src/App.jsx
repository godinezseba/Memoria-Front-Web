import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom';

import Layout from './layout';
import Store, { initialState } from './store';

const App = () => (
  <Store.Provider initialState={initialState}>
    <BrowserRouter>
      <CssBaseline />
      <Layout />
    </BrowserRouter>
  </Store.Provider>
);

export default App;
