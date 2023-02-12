import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Touchable} from "react-native";
import {Image} from "react-native-elements";
import LoadingScreen from "../screens/LoadingScreen";


const Service = ({style, image, description}) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <TouchableOpacity style={[style, styles.serviceContainer]}>
            <Image source={image} style={styles.serviceImage} onLoadEnd={handleImageLoad}/>
            {imageLoaded ? (<Text style={styles.serviceText}>{description}</Text>) : (<LoadingScreen/>)}
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