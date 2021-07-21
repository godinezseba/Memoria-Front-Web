import firebase from 'firebase/app';

export default function logOut({history}) {
  firebase.auth().signOut()
    .finally(() => history.push("/login"));
}
