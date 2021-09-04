import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import firebase from 'firebase/app';

/**
 * Instance of GraphQL client.
 * ref: https://www.apollographql.com/docs/react/networking/authentication/#header
 */
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
});

/**
 * Function to add token in every call
 */
const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const { currentUser } = firebase.auth();
  const token = await currentUser.getIdToken();

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'Authorization': token,
    }
  }
});

export const apiGraph = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false
  }),
});
