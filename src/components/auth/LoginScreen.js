import React from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';

import { useDispatch } from 'react-redux';
import { startGoogleLoginAction, startLoginEmailPassword } from '../../actions/authActions';

import { useForm } from '../../hooks/useForm';
import { removeErrorAction, setErrorAction } from '../../actions/uiActions';


const LoginScreen = () => {

  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    email: 'alex0@gmail.com',
    password: '123456'
  });

  const {email, password} = formValues;

  const handleLogin = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      dispatch(startLoginEmailPassword(email, password));
    }
  }

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(setErrorAction('Email is not valid'));
      return false;
    } else if (password.length < 5) {
      dispatch(setErrorAction('Password should be at least 6 characters'));
      return false;
    } else {
      dispatch(removeErrorAction());
      return true;
    }
  }


  const handleGoogleLogin = () => {
    dispatch(startGoogleLoginAction());
  }


  return(
    <>
      <h3 className="auth__title">login</h3>
      
      <form onSubmit={handleLogin}>
        <input className="auth__input" type="text" placeholder="Email" name="email" autoComplete="off" value={email} onChange={handleInputChange} />
        <input className="auth__input" type="password" placeholder="Password" name="password" value={password} onChange={handleInputChange} />

        <button type="submit" className="btn btn-primary btn-block">Login</button>

        
        <div className="auth__social-networks">
          <p>Login with social networks</p>

          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
            </div>
            <p className="btn-text">
                <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link to="/auth/register" className="link">Create new account</Link>
      </form>
    </>
  );
}



export default LoginScreen;