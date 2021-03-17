import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { startGoogleLoginAction, startLoginEmailPassword } from '../../actions/authActions';

import { useForm } from '../../hooks/useForm';


const LoginScreen = () => {

  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    email: 'david10@gmail.com',
    password: '123456'
  });

  const {email, password} = formValues;

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(startLoginEmailPassword(email, password));
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