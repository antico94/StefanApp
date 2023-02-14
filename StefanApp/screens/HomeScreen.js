import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, ActivityIndicator, TouchableOpacity} from "react-native";
import Svg, {LinearGradient, Path, Stop} from "react-native-svg";
import services from '../assets/images/servicesProvided.png'
import Image from 'react-native-image-progress';
import ProgressCircle from 'react-native-progress/Circle';


const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.containerHomeScreen}>
            <Svg style={styles.svgBackground} xmlns="http://www.w3.org/2000/svg">
                <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor='#fa8284'/>
                    <Stop offset="100%" stopColor='#feb808'/>
                </LinearGradient>
                <Path fill="url(#gradient)"
                      d="M0 0h540v960H0z"/>
                <Path fill="white"
                      d="m0 400 0.5-9C45 489 90 471 135 459.3c45-11.6 90-17 135-.1 45 16.8 90 55.8 135 62.1 45 6.4 90-20 112.5-33.1L540 475V0H0Z"/>
            </Svg>
            <View style={styles.top}>
                <Image
                    source={services}
                    style={styles.servicesImage}
                    indicator={ProgressCircle}
                    indicatorProps={{
                        size: 40,
                        borderWidth: 0,
                        color: 'rgba(150, 150, 150, 1)',
                        unfilledColor: 'rgba(200, 200, 200, 0.2)'
                    }}
                />
            </View>
            <View style={styles.bot}>
                <Text style={styles.titleBot}>
                    Perfect for your business
                </Text>
                <Text style={styles.descriptionBot}>
                    StefanApp is your one-stop solution for all your business needs. Our app provides a wide range of IT
                    services, including development, graphic design, research, and much more. With our experienced and
                    skilled professionals, we guarantee to deliver top-notch solutions to help your business thrive. We
                    understand the importance of technology in today's world, and our services are designed to keep your
                    business ahead of the competition. Contact us today to get started on your next project and
                    experience the best of IT services.
                </Text>
                <TouchableOpacity style={styles.buttonsContainer} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginButton}>
                        Check our Services
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
        ;
};

export default HomeScreen;

const styles = StyleSheet.create({
    containerHomeScreen: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    top: {
        width: '100%',
        height: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    servicesImage: {
        height: '100%',
        width: '100%',
        // borderStyle: 'solid',
        // borderWidth: 1,
        // borderColor: 'red',
    },
    bot: {
        width: '100%',
        height: '50%',
        display: "flex",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 10,
        paddingTop: 50,

    },
    svgBackground: {
        zIndex: -1,
        position: 'absolute',
        padding: 10,
        width: '100%',
        height: '125%',
    },
    titleBot: {
        fontFamily: 'Dosis',
        fontSize: 35,
        color: 'white',
        textAlign: 'center'

    },
    descriptionBot: {
        fontFamily: 'Dosis',
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    buttonsContainer: {
        height: 50,
        width: 200,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    loginButton: {
        borderRadius: 10,
        overflow: 'hidden',
        color: 'white',
        fontFamily: 'Dosis',
        textAlign: 'center',
        fontSize: 20
    }
});