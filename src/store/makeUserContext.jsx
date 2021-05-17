import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';

import { Loading } from '../atoms';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('current user:', user)
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if(pending){
    return <Loading />
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
