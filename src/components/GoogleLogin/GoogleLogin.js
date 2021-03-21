import React, { useContext, useState } from 'react';
import './GoogleLogin.css'
import firebase from "firebase/app";
import "firebase/auth";
import google from '../../images/google.png'
import firebaseConfig from '../../components/Login/Firebase.config';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
// Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}



const GoogleLogin = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    var GoogleProvider = new firebase.auth.GoogleAuthProvider();
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        photo: ''
    })

    //  Google Login Button Handle 
    const handleGoogleLogin = () =>{
        firebase.auth().signInWithPopup(GoogleProvider)
            .then((result) => {
            var user = result.user;
            console.log(user)
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
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }
    //  Google Log Out
    const handleGoogleLogOut = () => {
        firebase.auth().signOut().then(() => {
            const UserData = {
                isSignIn : false, 
                name : '',
                email : '',
                photo : ''
            }
            setUser(UserData)
          }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
          });
    }
    return (
        <div className="google">
            {
                user.isSignIn ? <button onClick={handleGoogleLogOut} className="btn"> <img src={google} alt=""/> <span>Log Out</span></button> : 
                <button onClick={handleGoogleLogin} className="btn"> <img src={google} alt=""/> <span>Continue with Google</span></button>
            }
        </div>
    );
};

export default GoogleLogin;