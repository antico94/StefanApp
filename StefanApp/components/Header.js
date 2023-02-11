import * as React from "react"
import {TouchableOpacity, Text} from "react-native"
import SvgComponent from "./SvgComponent"
import {StackActions, useNavigation} from '@react-navigation/native';

const Header = () => {
    const navigation = useNavigation();

    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    navigation.dispatch(StackActions.pop());
                }}
            >
                <Text>Back</Text>
            </TouchableOpacity>
            <SvgComponent width="100%" height="100%" strokeWidth={0} stroke="black" fill='#7cba27'/>
        </>
    )
}

export default Header