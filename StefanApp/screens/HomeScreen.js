import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from "./Login";
import Services from "./Services";
import {View, Image} from "react-native";
import image from "../assets/images/favicon.png";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    const servicesBlack = require('./../assets/images/servicesBlack.png')
    const servicesColor = require('./../assets/images/servicesColor.png')

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Services"
                component={Services}
                options={{
                    headerShown: false,
                    tabBarStyle: {backgroundColor: '#F5F5F5', width: '100%', display:'flex', justifyContent: 'center', alignItems: 'center'},
                    tabBarIcon: ({focused, color, size}) => (
                        <Image
                            source={
                                focused
                                    ? servicesBlack
                                    : servicesColor
                            }
                            style={{width: size, height: size}}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Contact"
                component={Login}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused, color, size}) => (
                        <Image
                            source={
                                focused
                                    ? image
                                    : image
                            }
                            style={{width: size, height: size}}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default HomeScreen