import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from '$layout';
import { Login } from '$views';

import { AuthProvider } from '$store/makeUserContext';
import { apiGraph } from '$services/api';

const App = () => (
  <ChakraProvider>
    <AuthProvider>
      <ApolloProvider client={apiGraph}>
          <div style={{ height: '100vh' }}>
            <CssBaseline />
            <BrowserRouter>
              <Switch>
                <Route exact path='/login' component={Login} />
                <Route path='/' component={Layout} />
              </Switch>
            </BrowserRouter>
          </div>
      </ApolloProvider>
    </AuthProvider>
  </ChakraProvider>
);

export default App;
