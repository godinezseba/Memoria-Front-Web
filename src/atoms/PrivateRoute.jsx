import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '$store/makeUserContext';
import { checkAccess } from '$utils';

const PrivateRoute = ({ children, access, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser && checkAccess(access, currentUser))
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
  access: PropTypes.number,
}

PrivateRoute.defaultProps = {
  access: 2,
}

export default PrivateRoute;
