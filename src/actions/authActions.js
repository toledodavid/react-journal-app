import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';


export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(({user}) => {
      dispatch(loginAction(user.uid, user.displayName));
    }).catch(err => {
      console.log(err);
    });
  }
}

export const startRegisterWithEmailPasswordNameAction = (email, password, name) => {
  return (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then( async({user}) => {
      await user.updateProfile({displayName: name});
      dispatch(loginAction(user.uid, user.displayName));

    }).catch(err => {
      console.log(err);
    });
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