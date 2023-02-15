import React from 'react';
import {useFonts} from "expo-font";
import {AuthProvider} from "./context/AuthContext";
import AppNav from "./navigation/AppNav";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['AsyncStorage']);

function App() {
    const [fontsLoaded] = useFonts({
        BebasNeue: require('./assets/fonts/Bebas_Neue_Regular.ttf'),
        Dosis: require('./assets/fonts/Dosis-Regular.ttf'),
        DosisBold: require('./assets/fonts/Dosis-ExtraBold.ttf'),
    })


    if (!fontsLoaded) {
        return null
    }

    return (
        <AuthProvider>
            <AppNav/>
        </AuthProvider>
    );
}

export default App;
