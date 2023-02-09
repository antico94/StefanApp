import React, {useLayoutEffect} from 'react';
import {View, Text, SafeAreaView} from "react-native";
import {useNavigation} from "@react-navigation/native";

const HomeScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    return (
        <SafeAreaView>
            <Text>HomeScreen</Text>
        </SafeAreaView>
    );
};

export default HomeScreen;