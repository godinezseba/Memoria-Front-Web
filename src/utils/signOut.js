import firebase from 'firebase/app';

export default function logOut({history}) {
  firebase.auth().signOut().then(() => {
    history.push("/login");
  }).catch((error) => {
    console.log(error);
  });
}
