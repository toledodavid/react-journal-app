import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';


const RegisterScreen = () => {

  const [formValues, handleInputChange] = useForm({
    name: 'Alex',
    email: 'alex0@gmail.com',
    password: '123456',
    password2: '123456'
  });

  const {name, email, password, password2} = formValues;


  const handleRegister = (event) => {
    event.preventDefault();
    console.log(name, email, password2);
  }

  return(
    <>
      <h3 className="auth__title">login</h3>
      
      <form onSubmit={handleRegister}>
        <input className="auth__input" type="text" placeholder="Name" name="name" value={name} onChange={handleInputChange} autoComplete="off" />
        <input className="auth__input" type="email" placeholder="Email" name="email" value={email} onChange={handleInputChange} autoComplete="off" />
        <input className="auth__input" type="password" placeholder="Password" name="password" value={password} onChange={handleInputChange} />
        <input className="auth__input" type="password" placeholder="Confirm password" name="password2" value={password2} onChange={handleInputChange} />

        <button type="submit" className="btn btn-primary btn-block mb-5">Register</button>


        <Link to="/auth/login" className="link">Already registered?</Link>
      </form>
    </>
  );
}


export default RegisterScreen;