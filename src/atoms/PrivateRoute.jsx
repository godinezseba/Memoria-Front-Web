import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '$store/makeUserContext';

const PrivateRoute = ({ children, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  if (!!currentUser)
    return (
      <Route {...rest}>
        {children}
      </Route>
    )
  return (
    <Route {...rest}>
      <Redirect to={'/login'} />
    </Route>
  );
};


export default PrivateRoute;
