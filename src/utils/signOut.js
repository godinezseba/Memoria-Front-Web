import firebase from 'firebase/app';

export default function logOut({history}) {
  firebase.auth().signOut()
    .catch((error) => console.error(error))
    .finally(() => history.push("/login"));
}
