import firebase from 'firebase/app';

export default function getToken () {
  const { currentUser } = firebase.auth();

  return currentUser.getIdToken();
}
