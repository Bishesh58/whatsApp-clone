import { Button } from '@material-ui/core'
import React from 'react';
import './Login.css';
import { auth, providerFacebook, providerGoogle } from "../Firebase/firebase";
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';

function Login() {

    const dispatch = useDispatch();

    const signInWithFacebook =()=> {
        auth.signInWithPopup(providerFacebook)
        .then(result =>(
            //passing the user from result we get to reducer 
            dispatch(login({
                user: result.user.user,
            }))
           // console.log(result.user.displayName, result.user.photoURL )
        ))
        .catch(error => alert(error.message));
    }

    const signInWithGoogle =()=> {
        auth.signInWithPopup(providerGoogle)
        .then(result =>(
            //passing the user from result we get to reducer 
            dispatch(login({
                user: result.user.user,
            }))
           // console.log(result.user.displayName, result.user.photoURL )
        ))
        .catch(error => alert(error.message));
    }
    return (
        <div className="login__container">
                <img src="https://icons.iconarchive.com/icons/pixelkit/flat-jewels/256/Chat-icon.png" alt="img"/>
                <h1>Chat-app </h1>
                <Button 
                onClick={signInWithGoogle}>
                    Sign In with Google
                    <img className="login__container--icons" src="https://upload-icon.s3.amazonaws.com/uploads/icons/png/2659939281579738432-512.png" alt=""/>
                </Button>
                <Button 
                onClick={signInWithFacebook}>
                    Sign In with facebook

                    <img className="login__container--icons" src="https://upload-icon.s3.amazonaws.com/uploads/icons/png/19328366391579738431-512.png" alt=""/>
                </Button>
            </div>
    )
}

export default Login
