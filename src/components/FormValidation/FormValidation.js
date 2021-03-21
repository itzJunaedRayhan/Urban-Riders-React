import React, { useContext, useState } from 'react';
import './FormValidation.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../components/Login/Firebase.config'
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
// Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}




const FormValidation = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: false
    })
    

//  Input Field Validation    
    const handleBlur = (event) => {
        let isFieldValid = true;
        if(event.target.name === 'name'){
            isFieldValid = event.target.value;
        }
        if(event.target.name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if(event.target.name === 'password'){
            const isPasswordValid = event.target.value.length > 6;
            const isPasswordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && isPasswordHasNumber;
        }
        if(event.target.name === 'confirmPassword'){
            const confirmPassword = document.getElementById('password').value;
            if(event.target.value === confirmPassword){
                isFieldValid = true;
            }else{
                isFieldValid = false;
                alert("Passwords Don't Match")
            }
            isFieldValid = event.target.value;
            setUser(confirmPassword)
        }
        if(isFieldValid){
            const newUserInfo = {...user}
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo)
        }
    }


//  Form Validation
    const handleSubmit = (event) => {
        //  For New User
        if(newUser && user.email && user.password === user.confirmPassword){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((result) => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setLoggedInUser(result.user)
                setUser(newUserInfo)
                updatedUserName(user.name)
                history.replace(from);
            })
            .catch((error) => {
                // Error Handle
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo)
            });
        }

        //  For Old User
        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((result) => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo)
                setLoggedInUser(result.user)
                history.replace(from);
            })
            .catch((error) => {
               // Error Handle
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo)
            });
        }
        event.preventDefault()
    }

    //  Update User Name
    const updatedUserName = (name) => {
        var user = firebase.auth().currentUser;
        user.updateProfile({
        displayName: name
    }).then(function() {
        }).catch(function(error) {
            console.log(error)
        });
    }
    return (
        <div>
            <form  onSubmit={handleSubmit}>
                    {
                        newUser ? <h1>Create An Account</h1> : <h1>Login</h1>
                    }
                    {
                        newUser && <div>
                        <label>User Name:</label>
                        <input type="text" onBlur={handleBlur} name="name" placeholder="Your Name" required/>
                    </div>
                    }
                    <div>
                        <label>User Email:</label>
                        <input type="email"  onBlur={handleBlur} name="email" placeholder="Your Email" required/>
                    </div>
                    <br/>
                    <div>
                        <label>Password:</label>
                        <input type="password"  onBlur={handleBlur}  name="password" id="password" placeholder="your password" required/>  
                    </div>
                    {
                        newUser && <div style={{marginTop: '25px'}}>
                        <label>Confirm Password:</label>
                        <input type="password"  onBlur={handleBlur}  name="confirmPassword" placeholder="Confirm password" required/>  
                    </div>
                    }
                    <br/>  
                    <div>
                        <input type="submit" value={newUser ? 'Sign Up' : 'Login'} />
                    </div>
                    {
                        newUser ?  <p>Already have an account ? <span onClick={() => setNewUser(!newUser)}>Log In</span></p> : 
                        <p>Don't have an account ? <span onClick={() => setNewUser(!newUser)}>Create an account</span></p>
                    }
            </form>
            <p style={{color: 'red', textAlign: 'center'}}>{user.error}</p>
            {
                user.success && <p style={{color: 'green',textAlign: 'center'}}>User {newUser ? 'created' : 'Logged In'} Successfully</p>
            }
        </div>
    );
};

export default FormValidation;