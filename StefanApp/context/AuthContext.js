import React, {createContext, useState} from 'react'
import {Alert} from "react-native";

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [userToken, setUserToken] = useState(null)
    const login = () => {
        setUserToken('dadadada')
        console.log(userToken)
        setIsLoading(false)
    }

    const logout = () => {
        setUserToken(null)
        setIsLoading(false)
    }
    return (
        <AuthContext.Provider value={{login, logout, isLoading, userToken}}>
            {children}
        </AuthContext.Provider>
    )
}