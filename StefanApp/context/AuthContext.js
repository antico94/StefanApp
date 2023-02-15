import React, {createContext, useState} from 'react'
import {auth} from "../firebase";
import * as RootNavigation from './../navigation/RootNavigation';

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [registerSuccess, setRegisterSuccess] = useState(false)
    const admins = ["meiuandrei@gmail.com"]
    const [message, setMessage] = useState("");

    const showMessage = (text) => {
        setMessage(text);
    };
    const logIn = (email, password) => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                setIsUserLoggedIn(true);

                if (admins.includes(user.email)) {
                    console.log("Admin");
                    setIsAdmin(true);
                } else {
                    console.log("Not Admin!");
                    setIsAdmin(false);
                }
                RootNavigation.navigate("Homepage");
                // call the showMessage function with a success message
                showMessage("Login successful");
            })
            .catch((err) => {
                alert(err.message);
                showMessage("Login Failed")
            });
    };

    const register = (email, password, confirmPassword) => {
        console.log('called')
        if (password === confirmPassword) {
            auth
                .createUserWithEmailAndPassword(email, password)
                .then((_) => {
                    setRegisterSuccess(true);
                    RootNavigation.navigate("Login");
                    showMessage("Register successful");
                })
                .catch((err) => {
                    alert(err.message);
                    showMessage("Register failed");
                });
        } else {
            showMessage("The passwords don't match.");
        }
    };


    const logOut = () => {
        setIsUserLoggedIn(false)
        RootNavigation.navigate('FirstPage')
        showMessage("Logged out successfully");
    }

    return (
        <AuthContext.Provider value={{isUserLoggedIn, logIn, isAdmin, register, logOut, message, setMessage}}>
            {children}
        </AuthContext.Provider>
    )
}