import React from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';

import { useDispatch, useSelector } from 'react-redux';
import { removeErrorAction, setErrorAction } from '../../actions/uiActions';

import { useForm } from '../../hooks/useForm';
import { startRegisterWithEmailPasswordNameAction } from '../../actions/authActions';


const RegisterScreen = () => {

  const dispatch = useDispatch();

  const {msgError, loading} = useSelector(state => state.ui);


  const [formValues, handleInputChange] = useForm({
    name: 'Alex',
    email: 'alex0@gmail.com',
    password: '123456',
    password2: '123456'
  });

  const {name, email, password, password2} = formValues;


  const handleRegister = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordNameAction(email, password, name));
    }
    
  }

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setErrorAction('Name is required'));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setErrorAction('Email is not valid'));
      return false;
    } else if(password !== password2 || password.length < 5) {
      dispatch(setErrorAction('Password should be at least 6 characters and match each other'));
      return false;
    } else {
      dispatch(removeErrorAction());
      return true;
    }
  }

  return(
    <>
      <h3 className="auth__title">login</h3>

      {
        msgError && 
          (
            <div className="auth__alert-error">
              {msgError}
            </div>
          )
      }
      
      <form onSubmit={handleRegister}>
        <input className="auth__input" type="text" placeholder="Name" name="name" value={name} onChange={handleInputChange} autoComplete="off" />
        <input className="auth__input" type="email" placeholder="Email" name="email" value={email} onChange={handleInputChange} autoComplete="off" />
        <input className="auth__input" type="password" placeholder="Password" name="password" value={password} onChange={handleInputChange} />
        <input className="auth__input" type="password" placeholder="Confirm password" name="password2" value={password2} onChange={handleInputChange} />

        <button type="submit" className="btn btn-primary btn-block mb-5" disabled={loading}>Register</button>


        <Link to="/auth/login" className="link">Already registered?</Link>
      </form>
    </>
  );
}


export default RegisterScreen;