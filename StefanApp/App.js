import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FirstScreen from "./screens/FirstScreen";
import {useFonts} from "expo-font";
import Login from "./screens/Login";
import HomeManager from "./screens/HomeManager";
import Register from "./screens/Register";
import Services from "./screens/Services";


const Stack = createNativeStackNavigator();

function App() {
    const [fontsLoaded] = useFonts({
        BebasNeue: require('./assets/fonts/Bebas_Neue_Regular.ttf'),
        Dosis: require('./assets/fonts/Dosis-Regular.ttf'),
        DosisBold: require('./assets/fonts/Dosis-ExtraBold.ttf'),
    })

    if (!fontsLoaded) {
        return null
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={'FirstPage'} component={FirstScreen}/>
                <Stack.Screen name={'Login'} component={Login}/>
                <Stack.Screen
                    name={'Register'}
                    component={Register}
                    options={{
                        headerShown: true,
                        headerStyle: {}
                    }}
                />
                <Stack.Screen name={'Homepage'} component={HomeManager}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
