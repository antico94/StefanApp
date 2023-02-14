import React, {createContext, useState} from 'react'
import {auth} from "../firebase";
import {Alert} from "react-native";
import * as RootNavigation from './../navigation/RootNavigation';

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const admins = ["meiuandrei@gmail.com"]
    const logIn = (email, password) => {
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user
                console.log(`Logged in with : ${user.email}`)
                setIsUserLoggedIn(true)
                if (admins.includes(user.email)){
                    console.log('Admin')
                    setIsAdmin(true)
                }
                else {
                    console.log("Not Admin!")
                    setIsAdmin(false)
                }
            })
            .catch(err => {
                alert(err.message)
                return false
            })
        return isUserLoggedIn
    }

    // const register = (email, password)

    return (
        <AuthContext.Provider value={{isUserLoggedIn, logIn, isAdmin}}>
            {children}
        </AuthContext.Provider>
    )
}