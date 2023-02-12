import React from 'react'
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


const Tab = createBottomTabNavigator();

const HomeManager = () => {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                initialRouteName={'HomeScreen'}
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
                        fontSize: 20,
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
                <Tab.Screen name={'Services'} component={Services} options={{headerShown: false}}/>
                <Tab.Screen name={'Home'} component={HomeScreen} options={{headerShown: false}}/>
                <Tab.Screen name={'Contact'} component={Contact} options={{headerShown: false}}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default HomeManager;
