import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { finishLoadingAction, startLoadingAction } from './uiActions';


export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {

    dispatch(startLoadingAction());

    firebase.auth().signInWithEmailAndPassword(email, password).then(({user}) => {
      dispatch(loginAction(user.uid, user.displayName));
      dispatch(finishLoadingAction());
    }).catch(err => {
      console.log(err);
      dispatch(finishLoadingAction());
    });
  }
}

export const startRegisterWithEmailPasswordNameAction = (email, password, name) => {
  return (dispatch) => {

    dispatch(startLoadingAction());

    firebase.auth().createUserWithEmailAndPassword(email, password).then( async({user}) => {
      await user.updateProfile({displayName: name});
      dispatch(loginAction(user.uid, user.displayName));
      dispatch(finishLoadingAction());
    }).catch(err => {
      console.log(err);
      dispatch(finishLoadingAction());
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


export const startLogoutAction = () => {
  return async(dispatch) => {
    await firebase.auth().signOut();
    dispatch(logoutAction());
  }
}

export const logoutAction = () => ({
  type: types.logout
});