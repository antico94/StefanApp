import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FirstScreen from "./screens/FirstScreen";
import {useFonts} from "expo-font";


const Stack = createStackNavigator();

function App() {
    const [fontsLoaded] = useFonts({
        BebasNeue: require('./assets/fonts/Bebas Neue Regular.ttf'),
        Dosis: require('./assets/fonts/Dosis-Regular.ttf'),
    })

    if (!fontsLoaded){
        return null
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={' '} component={FirstScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
