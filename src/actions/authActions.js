import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';


export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(loginAction(1234, 'Alex'));
    }, 3500);
  }
}

export const startGoogleLoginAction = () => {
  return (dispatch) => {
    firebase.auth().signInWithPopup(googleAuthProvider).then(({user}) => {
      dispatch(loginAction(user.uid, user.displayName));
    });
  }
}

export const loginAction = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName
  }
});