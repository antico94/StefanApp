// noinspection DuplicatedCode

import React, {useContext, useEffect, useState} from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {database, storage} from "../firebase";
import LoadingScreen from "./LoadingScreen";
import Svg, {Path} from "react-native-svg";
import {LinearGradient} from "expo-linear-gradient";
import {useRoute} from '@react-navigation/native';
import * as RootNavigation from './../navigation/RootNavigation'
import {AuthContext} from "../context/AuthContext";

const ServiceInfo = () => {
        const route = useRoute();
        const servicesCollectionRef = database.collection('services')
        const serviceId = route.params
        const {isAdmin} = useContext(AuthContext)

        const [serviceData, setServiceData] = useState(null);
        const [title, setTitle] = useState("")
        const [description, setDescription] = useState("")
        const [imageURL, setImageURL] = useState(null)

        async function deleteServiceById(serviceId) {

            //First delete the file from storage
            try {
                const fileRef = storage.refFromURL(imageURL);
                await fileRef.delete();
                console.log(`File with storage path ${imageURL} was successfully deleted from Firebase Storage.`);
            } catch (error) {
                console.error(`Error deleting document with ID ${serviceId}:`, error);
            }

            //Then delete the database reference
            try {
                await servicesCollectionRef.doc(serviceId).delete();
                console.log(`Service with ID ${serviceId} was successfully deleted.`);
                RootNavigation.navigate("Services")
            } catch (error) {
                console.error(`Error deleting service with ID ${serviceId}:`, error);
            }
        }


        const handleDelete = () => {
            Alert.alert(
                'Are you sure?',
                'This action will delete this service permanently.',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    {
                        text: 'OK', onPress: () => deleteServiceById(serviceId)
                    }
                ],
                {cancelable: false}
            );
        }


        useEffect(() => {
            const serviceDocRef = servicesCollectionRef.doc(serviceId);
            serviceDocRef.get().then((doc) => {
                if (doc.exists) {
                    setServiceData(doc.data());
                } else {
                    console.log('No such document exists!');
                }
            }).catch((error) => {
                console.log('Error getting document:', error);
            });
        }, [serviceId]);

        useEffect(() => {
            if (serviceData !== null) {
                setTitle(serviceData.title)
                setDescription(serviceData.description)
                setImageURL(serviceData.imageUrl)
            }
        }, [serviceData])


        if (serviceData !== null) {
            return (
                <View behavior={Platform.OS === "ios" ? "padding" : "height"}
                      style={styles.container}>
                    <View style={[styles.top]}>
                        <Image source={{uri: serviceData.imageUrl}} style={{width: 400, height: 400}}></Image>
                    </View>
                    <LinearGradient colors={['rgba(237,122,143,0.5)', 'rgba(241,158,120,1)']} style={styles.gradient}>
                        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.bottom}>
                            <View style={styles.titleArea}>
                                <Text style={styles.title}>
                                    {serviceData.title}
                                </Text>

                            </View>
                            <View style={styles.textArea}>
                                <Text style={styles.description}>
                                    {serviceData.description}
                                </Text>

                            </View>
                            {isAdmin && <View style={styles.buttonsArea}>
                                <TouchableOpacity style={styles.editButton}
                                                  onPress={() => RootNavigation.navigate("EditService",
                                                      serviceId)}>
                                    <Svg
                                        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                        width={18} height={18}>
                                        <Path
                                            d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6m-1.586-3.586L19.5 7.328A2 2 0 0 0 16.672 4.5l-1.086 1.086m2.828 2.828-6.036 6.037a2 2 0 0 1-1.022.546l-2.942.589.589-2.942a2 2 0 0 1 .547-1.022l6.036-6.036m2.828 2.828-2.828-2.828"
                                            stroke="white"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </Svg>
                                    <Text style={styles.buttonText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                                    <Svg
                                        width={20}
                                        height={20}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <Path
                                            d="M10 11v6M14 11v6M4 7h16M6 7h12v11a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V7ZM9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9V5Z"
                                            stroke="white"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </Svg>
                                    <Text style={[styles.buttonText]}>Delete</Text>

                                </TouchableOpacity>
                            </View>}
                        </KeyboardAvoidingView>
                    </LinearGradient>

                </View>
            );
        } else
            return <LoadingScreen/>

    }
;

export default ServiceInfo;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    top: {
        width: '100%',
        height: '50%',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        // borderStyle: 'solid',
        // borderWidth: 1,
        // borderColor: 'red',
    },
    bottom: {
        width: '100%',
        height: '50%',
        display: "flex",
        justifyContent: 'space-around',
        // alignItems: 'center',
        borderTopLeftRadius: '50%',
        borderTopRightRadius: '50%',
        overflow: "hidden",
        padding: 25

    },
    gradient: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: '50%',
        borderTopRightRadius: '50%',
        overflow: "hidden",
        zIndex: -999
    },
    title: {
        fontSize: 30,
        fontFamily: 'DosisBold',
    },

    buttonsArea: {
        width: '100%',
        height: '20%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    editButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        backgroundColor: 'orange',
        borderRadius: '30%',
        height: 40
    },

    deleteButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        backgroundColor: 'red',
        borderRadius: '30%',
        height: 40
    },

    buttonText: {
        fontSize: 20,
        fontFamily: 'BebasNeue',
        color: 'white',
        marginLeft: 5
    },
    saveButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
        backgroundColor: 'green',
        borderRadius: '30%',
        height: 40
    },
    textArea: {
        height: '70%',
    },
    description: {
        fontFamily: 'Dosis'
    }


})