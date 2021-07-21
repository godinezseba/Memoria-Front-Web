import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '$store/makeUserContext';

const PrivateRoute = ({ children, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser)
    return (
      <Route {...rest}>
        {children}
      </Route>
    )
  return (
    <Route {...rest}>
      <Redirect to="/login" />
    </Route>
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.array.isRequired,
}

export default PrivateRoute;
