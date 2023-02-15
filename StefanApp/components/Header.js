import React from 'react';
import {View, Text, StyleSheet} from "react-native";

const Header = ({message}) => {
    return (
        <Header style={styles.headerContainer}>
            <View style={styles.headerSub}>
                <Text style={styles.headerSubtext}>
                    {message}
                </Text>
            </View>
        </Header>
    );
};

export default Header;

const styles = StyleSheet.create({
    headerContainer: {

    },
    headerSub: {

    },
    headerSubtext: {

    }


})