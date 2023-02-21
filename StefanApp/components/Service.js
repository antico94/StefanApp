import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Touchable} from "react-native";
import {Image} from "react-native-elements";
import LoadingScreen from "../screens/LoadingScreen";
import * as RootNavigation from './../navigation/RootNavigation';




const Service = ({style, image, title, serviceId}) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handlePress = () => {
        RootNavigation.navigate('ServiceInfo', serviceId)
    }

    return (
        <TouchableOpacity style={[style, styles.serviceContainer]} onPress={handlePress}>
            <Image source={{uri: image}} style={styles.serviceImage} onLoadEnd={handleImageLoad}/>
            {imageLoaded ? (<Text style={styles.serviceText}>{title}</Text>) : (<LoadingScreen/>)}
        </TouchableOpacity>)
};

export default Service;


const styles = StyleSheet.create({
    serviceContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    serviceImage: {
        minHeight: '60%',
        maxHeight: '100%',
    },
    serviceText: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Dosis'
    }
})