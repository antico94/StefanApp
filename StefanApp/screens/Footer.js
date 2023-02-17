import React, {useContext} from 'react'
import {NavigationContainer} from "@react-navigation/native"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Services from "./Services";
import {Image, TouchableOpacity, Text} from "react-native";
import servicesBlack from '../assets/images/servicesColor.png'
import servicesColor from '../assets/images/servicesBlack.png'
import Contact from "./Contact";
import contactBlack from '../assets/images/contactBlack.png'
import contactColor from '../assets/images/contactColor.png'
import homeBlack from '../assets/images/homeBlack.png'
import homeColor from '../assets/images/homeColor.png'
import HomeScreen from "./HomeScreen";
import {AuthContext} from "../context/AuthContext";
import * as RootNavigation from './../navigation/RootNavigation';
import Ionicons from "react-native-vector-icons/Ionicons";


const Tab = createBottomTabNavigator();

const Footer = () => {
    const {isUserLoggedIn, logOut} = useContext(AuthContext)
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                initialRouteName={'Home'}
                screenOptions={({route}) => ({
                    tabBarStyle: {
                        height: 75,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10
                    },
                    tabBarItemStyle: {
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        height: 50,
                    },
                    tabBarLabelStyle: {
                        fontFamily: 'DosisBold',
                        fontSize: 17,
                    },
                    tabBarIcon: ({focused}) => {
                        let showIcon;
                        let rn = route.name;

                        if (rn === 'Services') {
                            showIcon = focused ? servicesBlack : servicesColor;
                        } else if (rn === 'Contact') {
                            showIcon = focused ? contactColor : contactBlack;
                        } else {
                            showIcon = focused ? homeColor : homeBlack;
                        }

                        return (
                            <Image
                                source={showIcon}
                                style={{
                                    width: 25,
                                    height: 25,
                                }}
                            />
                        );
                    },
                    headerLeft: () => !isUserLoggedIn ? (
                        <TouchableOpacity
                            onPress={() => RootNavigation.navigate("FirstPage")}
                            style={{
                                // borderStyle: 'solid',
                                // borderWidth: 1,
                                // borderColor: 'red',
                                width: 70,
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                                height: 40,
                                flexDirection: 'row',
                                marginBottom: 20
                            }}>
                            <Ionicons name="arrow-back" size={24} color="orange"/>
                            <Text style={{
                                fontFamily: 'Dosis',
                                fontSize: 20,
                                color: 'black'

                            }}>Back</Text>
                        </TouchableOpacity>
                    ) : null,
                    headerRight: () => (
                        isUserLoggedIn ?
                            (<TouchableOpacity
                                style={{
                                    width: 70,
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                    height: 40,
                                    flexDirection: 'row',
                                    marginBottom: 20,
                                    marginRight: 10
                                }}
                                onPress={() => logOut()}>
                                <Text style={{
                                    fontFamily: 'Dosis',
                                    fontSize: 20,
                                    color: 'black'
                                }}>Log Out</Text>
                            </TouchableOpacity>) : null
                    ),
                    headerTitle: () => (null)
                })}
            >
                {!isUserLoggedIn ? (
                    <Tab.Screen name={'Services'} component={Services} options={{headerShown: true}}/>) : null}
                <Tab.Screen name={'Home'} component={HomeScreen} options={{
                    headerShown: true
                }}/>
                {isUserLoggedIn ? (
                    <Tab.Screen name={'Contact'} component={Contact} options={{headerShown: true}}/>) : null}
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Footer;
