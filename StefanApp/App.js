import React from 'react';
import {useFonts} from "expo-font";
import {AuthProvider} from "./context/AuthContext";
import AppNav from "./navigation/AppNav";
import { LogBox } from 'react-native';
import ServiceInfo from "./screens/ServiceInfo";
import AddService from "./screens/AddService";
import Test from "./screens/Test";
// import Test from "./screens/Test";
LogBox.ignoreLogs(['AsyncStorage', 'Key "uri"']);

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
            {/*<ServiceInfo serviceId={'mw5JSTnjK7qgHXaO5OQY'}/>*/}
            {/*<AddService/>*/}
            {/*<Test/>*/}
            {/*<TestSteps/>*/}
        </AuthProvider>
    );
}

export default App;
