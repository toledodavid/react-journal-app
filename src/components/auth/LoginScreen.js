import React from 'react';


const LoginScreen = () => {
  return(
    <div>
      <h3>login</h3>
      
      <form>
        <input type="text" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />

        <button type="submit">Login</button>

        <hr/>
        google
      </form>
    </div>
  );
}



export default LoginScreen;