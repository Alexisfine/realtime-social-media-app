import React, {useContext, useRef} from 'react';
import './Login.css';
import {loginCall} from '../../apiCalls'
import {AuthContext} from "../../context/AuthContext";
import {CircularProgress} from '@material-ui/core';

const Login = () => {
    const email = useRef();
    const password = useRef();

    const {user, isFetching, error, dispatch} = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({
            email:email.current.value,
            password:password.current.value},dispatch)
    }

    return (
        <div className='login'>
            <div className='loginWrapper'>
                <div className='loginLeft'>
                    <h3 className='loginLogo'>Social App</h3>
                    <span className='loginDesc'>
                        Connect with friends and the world around you
                    </span>
                </div>
                <div className='loginRight'>
                    <form className='loginBox' onSubmit={handleClick}>
                        <input type='email' placeholder='Enter your email' className='loginInput' ref={email} required/>
                        <input type='password' placeholder='Enter your password' className='loginInput' ref={password} minLength='6' required/>
                        <button className='loginButton' type='submit' disabled={isFetching}>
                            {isFetching ? <CircularProgress color='white'/> : 'login'}
                        </button>
                        <span className='loginForgot'>Forgot Password?</span>
                        <button className='loginRegisterButton' disabled={isFetching}>
                            {isFetching ? <CircularProgress/> : 'Create an account'}
                        </button>

                    </form>
                </div>
            </div>

        </div>

    );
};

export default Login;