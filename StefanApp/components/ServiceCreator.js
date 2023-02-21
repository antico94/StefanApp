import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Svg, {Path} from "react-native-svg";
import * as RootNavigation from './../navigation/RootNavigation';

const ServiceCreator = () => {
    return (
        <TouchableOpacity style={styles.serviceCreatorContainer} onPress={()=> RootNavigation.navigate('AddService')}>
            <Svg
                style={styles.svgStyle}
                viewBox="0 0 24 24"
                fill="violet"
                xmlns="http://www.w3.org/2000/svg"
            >
                <Path
                    d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM8 12h8M12 16V8"
                    stroke="white"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        </TouchableOpacity>
    )
}

export default ServiceCreator;

const styles = StyleSheet.create({
    serviceCreatorContainer: {
        display: "flex",
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        height: 50,
        width: '100%',

    },
    svgStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
    }
})