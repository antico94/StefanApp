import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.mainView}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 20 }}>Loading... Please wait</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    mainView: {
        display: "flex",
        justifyContent: 'center',
        alignItems: "center",
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    }
})

export default LoadingScreen;