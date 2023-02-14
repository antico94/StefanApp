import React, {useContext} from 'react'
import {NavigationContainer} from "@react-navigation/native"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Services from "./Services";
import {Image} from "react-native";
import servicesBlack from '../assets/images/servicesColor.png'
import servicesColor from '../assets/images/servicesBlack.png'
import Contact from "./Contact";
import contactBlack from '../assets/images/contactBlack.png'
import contactColor from '../assets/images/contactColor.png'
import homeBlack from '../assets/images/homeBlack.png'
import homeColor from '../assets/images/homeColor.png'
import HomeScreen from "./HomeScreen";
import {AuthContext} from "../context/AuthContext";



const Tab = createBottomTabNavigator();

const Footer = () => {
    const {userToken} = useContext(AuthContext)
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
                })}
            >
                {userToken !== null ? (<Tab.Screen name={'Services'} component={Services} options={{headerShown: false}}/>) : null}
                <Tab.Screen name={'Home'} component={HomeScreen} options={{headerShown: false}}/>
                {userToken !== null ? (<Tab.Screen name={'Contact'} component={Contact} options={{headerShown: false}}/>) : null}
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Footer;
