import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import "../styles/login.css"

const clientId = "372761498123-6qftof5rn1oncipd0sb0jn8o57mjrf1r.apps.googleusercontent.com";

const Loginbutton = () => {
  const history = useHistory();

  const onSuccess = (res) => {
    console.log('login success current user:', res.profileObj);
    // Redirect to the home page
    history.push('/home');
  };

  const onFailure = (res) => {
    console.log('login failed:', res);
  };

  return (
    <div className='main_login_div'>
      <h1>Login Page</h1>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{margin:"80px 0px 0px 0px"}}
      />
    </div>
  );
};

export default Loginbutton