import React, {useRef} from 'react';
import './Register.css';
import {loginCall} from "../../apiCalls";
import axios from "axios";
import {useNavigate} from "react-router";

const Register = () => {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if (password.current.value !== passwordAgain.current.value) {
             password.current.setCustomValidity('Passwords do not match');
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                await axios.post('/auth/register', user);
                navigate('/login');
            } catch (err) {
                console.log(err);
            }

        }

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
                        <input type='text' required placeholder='Enter your username' className='loginInput' ref={username}/>
                        <input type='email' required placeholder='Enter your email' className='loginInput' ref={email}/>
                        <input type='password' required placeholder='Enter your password' className='loginInput'  minLength={6} ref={password}/>
                        <input type='password' required placeholder='Enter your password again' className='loginInput' minLength={6} ref={passwordAgain}/>
                        <button className='loginButton' type={"submit"}>Sign Up</button>
                        <button className='loginRegisterButton'>Login to your account</button>

                    </form>
                </div>
            </div>

        </div>

    );
};

export default Register;