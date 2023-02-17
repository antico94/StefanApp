import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import FirstScreen from "../screens/FirstScreen";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Footer from "../screens/Footer";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AuthContext} from "../context/AuthContext";
import {navigationRef} from "./RootNavigation";
import Services from "../screens/Services";
import {Animated, Text, TouchableOpacity, View} from "react-native";
import AddService from "../screens/AddService";

const Stack = createNativeStackNavigator();

const AppNav = () => {
        const {message, setMessage} = useContext(AuthContext)
        const {isUserLoggedIn, logOut} = useContext(AuthContext)
        const [opacity] = useState(new Animated.Value(0));

        // Start the animation when the message changes
        useEffect(() => {
            // Fade in to 1
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500, // Duration in milliseconds
                useNativeDriver: true, // Use native driver for better performance
            }).start(() => {
                // Fade out to 0 after 1 second
                setTimeout(() => {
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 500, // Duration in milliseconds
                        useNativeDriver: true, // Use native driver for better performance
                    }).start()
                    setMessage("")
                    ;
                }, 1000);
            });
        }, [message]);
        return (
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator screenOptions={() => ({
                    headerRight: () => (
                        isUserLoggedIn ?
                            (<TouchableOpacity onPress={() => logOut()}>
                                <Text>Log Out</Text>
                            </TouchableOpacity>) : null
                    ),
                    headerTitle: () =>
                        (<View
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '75%',
                                height: 40,
                            }}>
                            <Animated.View
                                style={{
                                    opacity, // Animated opacity
                                }}>
                                <Text style={{
                                    fontSize: 20,
                                    fontFamily: 'Dosis',
                                    color: message !== '' ? message.toLowerCase().includes('success') ? 'green' : 'red' : null
                                }}>{message}</Text>
                            </Animated.View>
                        </View>)
                })}>
                    <Stack.Screen name={'FirstPage'} component={FirstScreen}/>
                    <Stack.Screen name={'Login'} component={Login}/>
                    <Stack.Screen name={'Register'} component={Register}/>
                    <Stack.Screen name={'Homepage'} component={Footer} options={{headerShown: false}}/>
                    <Stack.Screen name={'Services'} component={Services}/>
                    <Stack.Screen name={'AddImage'} component={AddService} options={{headerShown: true, headerTransparent: true}}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
            ;
    }
;

export default AppNav;