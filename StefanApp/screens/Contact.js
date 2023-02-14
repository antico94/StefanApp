import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import Svg, {Path} from "react-native-svg";
import contact from './../assets/images/contact.png'
import * as RootNavigation from './../navigation/RootNavigation';

const Contact = () => {
    return (
        <View style={styles.contactContainer}>
            <View style={styles.contactTop}>
                <Text style={styles.contactText}>At our core, we believe in the power of communication and building strong relationships with our clients. That's why we always love to chat and connect with new people, learning more about their unique needs and exploring ways we can support them in achieving their goals.</Text>
                <TouchableOpacity style={styles.buttonsContainer} onPress={() => RootNavigation.navigate('Services')}>
                    <Text style={styles.loginButton}>
                        Check our Services
                    </Text>
                </TouchableOpacity>
            </View>

            <Svg style={styles.backgroundSvg} xmlns="http://www.w3.org/2000/svg">
                <Path fill="#fff" d="M0 0h540v960H0z"/>
                <Path
                    d="M540 540c-87-26.1-174-52.3-257.5-94S118.9 346.9 72.3 270C25.8 193.1 12.9 96.5 0 0h540ZM0 420c88.8 22.9 177.7 45.8 261 87.9 83.3 42.2 161.1 103.5 206.7 182.1 45.5 78.6 58.9 174.3 72.3 270H0Z"
                    fill="#FBAE3C"
                />
            </Svg>
            <View style={styles.contactBot}>
                <Image style={styles.contactImage} source={contact}/>
            </View>


        </View>
    );
};

export default Contact;

const styles = StyleSheet.create({
    contactContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contactTop: {
        height: '50%',
        width: '80%',
        left: '10%',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
    },
    contactText: {
        fontFamily: 'Dosis',
        color: 'white',
        fontSize: 20,
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
    },
    backgroundSvg: {
        maxHeight: '100%',
        position: 'absolute',
        zIndex: -1
    },
    contactBot: {
        display: "flex",
        height: '50%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    contactImage: {
        position: 'absolute',
        height: 300,
        width: 300,
    }


})