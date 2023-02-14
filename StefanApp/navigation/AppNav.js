import React, {useContext} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import FirstScreen from "../screens/FirstScreen";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Footer from "../screens/Footer";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AuthContext} from "../context/AuthContext";
import {navigationRef} from "./RootNavigation";
import Services from "../screens/Services";

const Stack = createNativeStackNavigator();

const AppNav = () => {
    const {isLoading, userToken} = useContext(AuthContext)
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                <Stack.Screen name={'FirstPage'} component={FirstScreen} options={{headerShown: false}}/>
                <Stack.Screen name={'Login'} component={Login}/>
                <Stack.Screen name={'Register'} component={Register}/>
                <Stack.Screen name={'Homepage'} component={Footer}/>
                <Stack.Screen name={'Services'} component={Services}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNav;