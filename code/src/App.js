import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom';

import Layout from './layout';

const App = () => (
  <BrowserRouter>
    <CssBaseline />
    <Layout />
  </BrowserRouter>
);

export default App;
