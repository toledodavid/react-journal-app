import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { loginAction } from '../actions/authActions';

import { firebase } from '../firebase/firebase-config';

import AuthRouter from './AuthRouter';
import JournalScreen from '../components/journal/JournalScreen';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { loadNotes } from '../helpers/loadNotes';
import { setNotesAction } from '../actions/notesActions';




const AppRouter = () => {

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(loginAction(user.uid, user.displayName));
        setIsLoggedIn(true);

        const notes = await loadNotes(user.uid);
        dispatch(setNotesAction(notes));
      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return (
      <h2>Please, wait...</h2>
    );
  }

  return(
    <Router>
      <div>
        <Switch>
          
          <PublicRoute
            isAuthenticated={isLoggedIn}
            path="/auth"
            component={AuthRouter} 
          />

          <PrivateRoute
            exact
            isAuthenticated={isLoggedIn}
            path="/"
            component={JournalScreen}
          />

          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
}


export default AppRouter