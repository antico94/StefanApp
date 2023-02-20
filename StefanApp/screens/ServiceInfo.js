import React, {useEffect, useState} from 'react';
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

const ServiceInfo = () => {
        const route = useRoute();
        const servicesCollectionRef = database.collection('services')
        const serviceId = route.params

        const [serviceData, setServiceData] = useState(null);
        const [isEdit, setIsEdit] = useState(false)
        const [title, setTitle] = useState("")
        const [description, setDescription] = useState("")
        const [image, setImage] = useState(null)
        const [imageURL, setImageURL] = useState(null)

        async function deleteServiceById(serviceId) {

            //First delete the file from storage
            try {
                console.log(imageURL)
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
            } catch (error) {
                console.error(`Error deleting service with ID ${serviceId}:`, error);
            }
        }

        async function updateService(serviceId, title, description, imageUrl) {
            try {
                const serviceRef = servicesCollectionRef.doc(serviceId);
                await serviceRef.update({
                    title: title,
                    description: description,
                    imageUrl: imageUrl
                });
                console.log(`Service with ID ${serviceId} was successfully updated.`);
            } catch (error) {
                console.error(`Error updating service with ID ${serviceId}:`, error);
            }
        }


        const handleEdit = () => {
            setIsEdit(true)
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


        const handleSave = () => {
            setIsEdit(false)
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
            console.log(serviceData)
            return (
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                                      style={styles.container}>
                    <View style={styles.top}>
                        <Image source={{uri: serviceData.imageUrl}} style={{width: 400, height: 400}}></Image>
                        <Svg
                            width={300}
                            height={300}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{opacity: isEdit ? "100%" : '0%', position: 'absolute'}}
                        >
                            <Path
                                d="M8 10h12l-4-4M16 14H4l4 4"
                                stroke="white"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                    </View>
                    <LinearGradient colors={['rgba(237,122,143,0.5)', 'rgba(241,158,120,1)']} style={styles.gradient}>
                        <View style={styles.bottom}>
                            <View style={styles.titleArea}>
                                {
                                    isEdit ? (
                                        <TextInput multiline={true} onChangeText={(text) => setTitle(text)}
                                                   style={styles.title}>
                                            {serviceData.title}
                                        </TextInput>) : (
                                        <Text style={styles.title}>
                                            {serviceData.title}
                                        </Text>
                                    )}

                            </View>
                            <View style={styles.textArea}>
                                {isEdit ?
                                    (
                                        <TextInput multiline={true} onChangeText={(text) => setDescription(text)}
                                                   style={styles.description}>
                                            {serviceData.description}
                                        </TextInput>
                                    )
                                    : <Text style={styles.description}>
                                        {serviceData.description}
                                    </Text>}

                            </View>
                            {
                                isEdit ? <View style={styles.buttonsArea}>
                                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                        <Svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={15}
                                            height={15}
                                            viewBox="0 0 356.725 356.725"
                                            xmlSpace="preserve"
                                            fill='white'>
                                            <Path
                                                d="M307.463 0H49.259C27.905 0 10.53 17.381 10.53 38.73v279.264c0 21.352 17.375 38.73 38.729 38.73h258.203c21.357 0 38.732-17.379 38.732-38.73V38.73C346.196 17.381 328.821 0 307.463 0zM251.43 19.365v121.922H105.295V19.365H251.43zM133.981 337.359v-93.593h88.761v93.593h-88.761zm192.849-19.365c0 10.676-8.686 19.365-19.366 19.365h-65.355V234.084a9.679 9.679 0 0 0-9.683-9.682H124.301c-5.348 0-9.684 4.33-9.684 9.682v103.275H49.26c-10.681 0-19.366-8.689-19.366-19.365V38.73c0-10.674 8.686-19.365 19.366-19.365h36.669v131.604c0 5.344 4.335 9.684 9.683 9.684h165.503c5.346 0 9.682-4.34 9.682-9.684V19.365h36.668c10.682 0 19.366 8.691 19.366 19.365l-.001 279.264z"/>
                                            <Path
                                                d="M127.043 123.898h102.64c5.347 0 9.681-4.34 9.681-9.684a9.679 9.679 0 0 0-9.681-9.682h-102.64c-5.348 0-9.684 4.331-9.684 9.682 0 5.344 4.336 9.684 9.684 9.684zM127.043 90.009h102.64c5.347 0 9.681-4.34 9.681-9.684a9.678 9.678 0 0 0-9.681-9.682h-102.64c-5.348 0-9.684 4.33-9.684 9.682 0 5.345 4.336 9.684 9.684 9.684zM127.043 56.119h102.64c5.347 0 9.681-4.339 9.681-9.682a9.678 9.678 0 0 0-9.681-9.682h-102.64c-5.348 0-9.684 4.33-9.684 9.682 0 5.343 4.336 9.682 9.684 9.682zM203.78 253.441c-5.35 0-9.684 4.34-9.684 9.682v27.439c0 5.344 4.334 9.684 9.684 9.684 5.347 0 9.683-4.34 9.683-9.684v-27.439c-.001-5.342-4.337-9.682-9.683-9.682z"/>
                                        </Svg>
                                        <Text style={[styles.buttonText, {color: 'white'}]}>Save</Text>
                                    </TouchableOpacity>
                                </View> : <View style={styles.buttonsArea}>
                                    <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
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
                                </View>
                            }

                        </View>
                    </LinearGradient>

                </KeyboardAvoidingView>
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
        height: '10%',
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