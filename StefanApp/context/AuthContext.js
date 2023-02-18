import React, {createContext, useEffect, useState} from 'react'
import {auth} from "../firebase";
import * as RootNavigation from './../navigation/RootNavigation';

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
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
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
                showMessage("Login successful");
                RootNavigation.navigate("Homepage");
                // call the showMessage function with a success message

            })
            .catch((err) => {
                alert(err.message);
                showMessage("Login Failed")
            });
    };

    const register = (email, password, confirmPassword) => {
        if (password === confirmPassword) {
            auth
                .createUserWithEmailAndPassword(email, password)
                .then((_) => {
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

    useEffect(() => {
        setTimeout(()=> {
            setMessage('')
        }, 1000)
    }, [message])

    return (
        <AuthContext.Provider value={{isUserLoggedIn, logIn, isAdmin, register, logOut, message, setMessage}}>
            {children}
        </AuthContext.Provider>
    )
}