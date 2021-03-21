import React, { useContext, useState } from 'react';
import './FacebookLogin.css';
import Facebook from '../../images/facebook.png'
import firebase from "firebase/app";
import "firebase/auth";
import {userContext} from '../../App'
import firebaseConfig from '../../components/Login/Firebase.config';
import { useHistory, useLocation } from 'react-router';
// Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}





const FacebookLogin = () => {
    const FacebookProvider = new firebase.auth.FacebookAuthProvider();
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [user, setUser] = useState({
        isSignIn : false,
        name : '',
        email : '',
        photo : ''
    })
    //  Facebook Login button handle
    const FacebookLoginHandle = () => {
        firebase.auth().signInWithPopup(FacebookProvider)
        .then((result) => {
            var user = result.user;
            const {displayName, email, photoURL} = result.user;
            const UserData = {
                isSignIn : true,
                name : displayName,
                email : email,
                photo : photoURL
            }
            setUser(UserData)
            setLoggedInUser(result.user)
            history.replace(from);
        })
        .catch((error) => {
            //    error handle
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
        });
    }

    //  Facebook Log Out handle
    const FacebookLogoutHandle = () => {
        firebase.auth().signOut().then(() => {
            const UserData = {
                isSignIn : false,
                name : '',
                email : '',
                photo : ''
            }
            setUser(UserData)
          }).catch((error) => {
            //    error handle
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
          });
    }
    return (
        <div className="facebook">
            {
                user.isSignIn ? <button onClick={FacebookLogoutHandle} className="btn"><img src={Facebook} alt=""/> <span>Log Out</span></button> : 
                <button onClick={FacebookLoginHandle}><img src={Facebook} alt=""/> <span>Continue with Facebook</span></button>
            }
        </div>
    );
};

export default FacebookLogin;