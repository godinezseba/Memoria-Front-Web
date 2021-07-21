import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import { gql } from '@apollo/client';

import Loading from '$atoms/Loading';

import { apiGraph } from '$services/api';

const ME = gql`
{
  me {
    id
    name
    lastName
    email
    firebaseId
    isAdmin
    companyType
    companyId
    editableCompanies
  }
}
`;

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    // observer that return the user when this changes
    // because we want to update the tree with this new result
    // this value is saved in the context
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        apiGraph.query({ query: ME })
          .then(({ data: { me } }) => {
            setCurrentUser({
              user,
              data: me,
            });
          })
          .catch((error) => console.log(error))
          .finally(() => setPending(false));
      } else {
        setPending(false);
      }
    });
  }, []);

  if (pending) {
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
