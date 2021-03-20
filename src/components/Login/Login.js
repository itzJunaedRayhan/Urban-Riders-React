import React from 'react';
import FacebookLogin from '../FacebookLogin/FacebookLogin';
import FormValidation from '../FormValidation/FormValidation';
import GoogleLogin from '../GoogleLogin/GoogleLogin';
import './Login.css';

const Login = () => {
    return (
        <div className="login">
            <FormValidation/>
            <FacebookLogin/>
            <GoogleLogin/>
        </div>
    );
};

export default Login;