import React, { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import services from "../assets/images/services.png";
import LoadingScreen from "./LoadingScreen";

const FirstScreen = ({navigation}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  const navigateToHomepage = () => {
    navigation.navigate('Homepage');
  };

  return (
    <View style={styles.mainView}>
      <Text style={styles.mainTitle}>Welcome to StefanApp</Text>
      <Image
        source={services}
        alt={"Services"}
        style={styles.mainImage}
        onLoad={handleImageLoad}
      />
      {imageLoaded ? (
        <View style={styles.buttonsView}>
          <TouchableOpacity style={styles.buttonsContainer} onPress={navigateToLogin}>
            <Text style={[styles.optionButtons, styles.loginButton]}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonsContainer} onPress={navigateToRegister}>
            <Text style={[styles.optionButtons, styles.registerButton]}>
              Register
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonsContainer} onPress={navigateToHomepage}>
            <Text style={[styles.optionButtons, styles.guestButton]}>
              Continue as guest
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
          <LoadingScreen/>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
    mainView: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        paddingTop: 20,

    },

    mainTitle: {
        marginTop: 10,
        fontSize: 36,
        textAlign: 'center',
        fontFamily: 'Dosis'
    },

    mainImage: {
        maxWidth: '100%',
        height: '80%',
    },

    buttonsView: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        top: -75
    },

    buttonsContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: 'center',
    },

    optionButtons: {
        fontSize: 24,
        height: 40,
        borderRadius: '10px',
        width: 300,
        textAlign: 'center',
        paddingTop: 3,
        marginTop: 10
    },
    loginButton: {
        backgroundColor: '#7cba27',
        borderRadius: 10,
        overflow: 'hidden',
        color: 'white',
        fontFamily: 'Dosis'
    },
    registerButton: {
        backgroundColor: '#feb808',
        borderRadius: 10,
        overflow: 'hidden',
        color: 'white',
        fontFamily: 'Dosis'

    },
    guestButton: {
        backgroundColor: 'black',
        borderRadius: 10,
        overflow: 'hidden',
        color: 'white',
        fontFamily: 'Dosis'
    }
})

export default FirstScreen;