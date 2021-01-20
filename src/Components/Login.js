import { Button } from '@material-ui/core'
import React from 'react';
import './Login.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import { auth, provider } from "../Firebase/firebase";

function Login() {

    const signIn =()=> {
        auth.signInWithPopup(provider)
        .then(result =>(
            console.log(result)
        ))
        .catch(error => alert(error.message));
    }
    return (
        <div className="login__container">
                <img src="https://icons.iconarchive.com/icons/pixelkit/flat-jewels/256/Chat-icon.png" alt="img"/>
                <h1>Chat-app </h1>
                <Button 
                onClick={signIn}>
                    Sign In with facebook
                    <FacebookIcon />
                    </Button>
            </div>
    )
}

export default Login
