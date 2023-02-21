// noinspection DuplicatedCode
// noinspection DuplicatedCode

import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity, Dimensions, TextInput, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Animated
} from "react-native";
import * as ImagePicker from 'expo-image-picker'
import {database, storage} from "../firebase";
import {LinearGradient} from "expo-linear-gradient";
import placeholder from './../assets/images/placeholder.png'
import * as RootNavigation from "../navigation/RootNavigation";
import addServicePhoto from './../assets/images/addService.webp'
import Svg, {Path} from "react-native-svg";
import {useRoute} from '@react-navigation/native';
import LoadingScreen from "./LoadingScreen";
import {AuthContext} from "../context/AuthContext";

const imagesRef = storage.ref().child('images');
const screenWidth = Dimensions.get("window").width;

const EditService = () => {
    const servicesCollectionRef = database.collection('services')
    const route = useRoute();
    const serviceId = route.params
    const [serviceData, setServiceData] = useState(null);
    const [oldTitle, setOldTitle] = useState("")
    const [oldDescription, setOldDescription] = useState("")
    const [oldImageURL, setOldImageURL] = useState("")
    const [newTitle, setNewTitle] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [newImage, setNewImage] = useState(null)
    const [newImageURL, setNewImageURL] = useState("")
    const [nextScreen, setNextScreen] = useState(false)
    const descriptionRef = useRef(null)


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setNewImage(result);
        }
    };

    const handleNextScreen = () => {
        setNextScreen(true)
    }

    const handleOutsidePress = () => {
        descriptionRef.current.blur()
    }

    useEffect(() => {
        if (serviceId !== null && serviceId !== "") {
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
        }
    }, [serviceId]);

    useEffect(() => {
        if (serviceData !== null) {
            setOldTitle(serviceData.title)
            setOldDescription(serviceData.description)
            setOldImageURL(serviceData.imageUrl)
        }
    }, [serviceData])

    const uploadImage = async () => {
        if (newImage !== null) {
            const fileName = `edited_${Date.now()}.jpg`;
            const storageRef = imagesRef.child(fileName);
            const response = await fetch(newImage.uri);
            const blob = await response.blob();
            const uploadTask = storageRef.put(blob);
            // Wait for the upload task to complete
            await uploadTask;
            // Get the download URL
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            setNewImageURL(downloadURL);
            // Return the download URL
            return downloadURL;
        } else {
            alert('Please select an image first.');
        }
    }

    const updateService = async () => {
        if (newImage !== null) {
            // Wait for the upload image function to finish and get the new image URL
            const newImageUrl = await uploadImage();
            try {
                const serviceRef = servicesCollectionRef.doc(serviceId);
                await serviceRef.update({
                    title: newTitle !== '' ? newTitle : oldTitle,
                    description: newDescription !== '' ? newDescription : oldDescription,
                    imageUrl: newImageUrl
                });
                console.log('Document updated successfully!');
                if (newImageUrl !== null && newImageUrl !== undefined && newImageUrl !== "") {
                    const oldImageRef = storage.refFromURL(oldImageURL);
                    await oldImageRef.delete()
                    resetFields()
                    RootNavigation.navigate("Services")
                }
            } catch (error) {
                console.error('Error updating document: ', error);
            }
        } else {
            try {
                const serviceRef = servicesCollectionRef.doc(serviceId);
                await serviceRef.update({
                    title: newTitle !== '' ? newTitle : oldTitle,
                    description: newDescription !== '' ? newDescription : oldDescription,
                    imageUrl: oldImageURL
                });
                console.log('Document updated successfully!');


            } catch (error) {
                console.error('Error updating document: ', error);
            }
            RootNavigation.navigate("Services")
            resetFields()
        }
    }

    const resetFields = () => {
        setServiceData(null);
        setOldTitle(newTitle)
        setOldDescription(newDescription)
        setOldImageURL(newImageURL)
        setNewTitle("")
        setNewDescription("")
        setNewImage(null)
        setNewImageURL("")
        setNextScreen(false)
    }


    if (oldImageURL !== "") {
        return (
            !nextScreen ? (<View style={styles.container}>
                    <LinearGradient
                        colors={['#ed7a8f', '#f19e78']}
                        style={styles.container}
                    >
                        <View style={styles.top}>
                            <Text style={styles.title}>Choose an image</Text>
                            <TouchableOpacity
                                style={[styles.imageContainer, {width: screenWidth * 0.8, height: screenWidth * 0.8}]}
                                onPress={pickImage}>
                                <Image source={newImage === null ? {uri: oldImageURL} : newImage.assets}
                                       style={[styles.image, {width: screenWidth * 0.7, height: screenWidth * 0.7}]}/>
                            </TouchableOpacity>
                            <View style={styles.delimiter}>
                                <TextInput style={styles.input}
                                           maxLength={30}
                                           onChangeText={(text) => setNewTitle(text)}
                                           placeholderTextColor={"white"}
                                >{oldTitle}
                                </TextInput>
                            </View>

                        </View>
                        <View style={styles.bot}>
                            <TouchableOpacity style={styles.buttonsContainer} onPress={handleNextScreen}>
                                <Text style={styles.customButton}>
                                    Next
                                </Text>
                            </TouchableOpacity>
                            <Image source={addServicePhoto}
                                   style={{width: screenWidth * 0.9, height: screenWidth * 0.9, position: 'absolute'}}
                            ></Image>
                        </View>

                    </LinearGradient>
                </View>) :
                (
                    <TouchableWithoutFeedback onPress={handleOutsidePress}>
                        <View style={styles.container}>
                            <LinearGradient
                                colors={['#ed7a8f', '#f19e78']}
                                style={styles.container}
                            >
                                <View style={styles.nextScreenTop}>
                                    <Image
                                        source={newImage === null ? {uri: oldImageURL} : newImage.assets}
                                        style={[
                                            styles.image,
                                            {
                                                width: screenWidth * 0.7,
                                                height: screenWidth * 0.7,
                                            },
                                        ]}
                                    />
                                    <Text
                                        style={styles.title}>{newTitle !== "" ? newTitle : oldTitle}</Text>
                                </View>
                                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                                                      style={styles.nextScreenBottom}>
                                    <TextInput ref={descriptionRef} multiline={true}
                                               onChangeText={(text) => setNewDescription(text)}
                                               style={styles.addDescription}>
                                        {oldDescription}
                                    </TextInput>
                                    <View style={{
                                        marginTop: 50, borderStyle: 'solid',
                                        borderWidth: 1,
                                        borderColor: 'white'
                                    }}>
                                        <TouchableOpacity style={styles.uploadService}
                                                          onPress={() => updateService()}>
                                            <Text style={styles.customButton}>
                                                Update Service
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </KeyboardAvoidingView>
                            </LinearGradient>
                        </View>
                    </TouchableWithoutFeedback>
                )

        )
    } else {
        return <LoadingScreen/>
    }

};

export default EditService;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'yellow',
        width: '100%',
        height: '100%'
    },
    title: {
        borderRadius: 10,
        overflow: 'hidden',
        color: 'white',
        fontFamily: 'BebasNeue',
        textAlign: 'center',
        fontSize: 40,
        marginBottom: 10
    },

    top: {
        width: '100%',
        height: '60%',
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
    },
    imageContainer: {
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        borderTopStyle: 'solid',
        borderTopWidth: 5,
        borderTopColor: 'white',
    },
    image: {
        borderRadius: '30%',
        height: 300,
        width: 300,
        position: 'relative'
    },
    description: {
        borderRadius: 10,
        overflow: 'hidden',
        color: 'white',
        fontFamily: 'BebasNeue',
        textAlign: 'center',
        fontSize: 25,
        position: 'absolute',
        top: 420
    },
    delimiter: {
        marginTop: 20,
        borderBotStyle: 'solid',
        borderBotWidth: 5,
        borderBotColor: 'white',
        width: '80%',
        height: 5,
        backgroundColor: 'orange',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderRadius: 10,
        overflow: 'hidden',
        color: 'white',
        fontFamily: 'BebasNeue',
        textAlign: 'center',
        fontSize: 25,
        position: 'absolute',
        backgroundColor: 'orange',
        padding: 5,
    },
    bot: {
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        height: '40%',
        width: '100%',
    },
    buttonsContainer: {
        height: 50,
        width: '80%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        zIndex: 20
    },
    customButton: {
        borderRadius: 10,
        overflow: 'hidden',
        color: 'white',
        fontFamily: 'DosisBold',
        textAlign: 'center',
        fontSize: 20
    },
    nextScreenTop: {
        marginTop: 30,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '50%',
    },
    nextScreenBottom: {
        width: '100%',
        height: '50%',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: `rgba(255, 255, 255, 0.5)`,
    },
    addDescription: {
        padding: 10,
        height: 150,
        width: '90%',
        backgroundColor: `rgba(255, 255, 255, 0.5)`,
        fontSize: 15,
        fontFamily: 'Dosis',
        borderRadius: '15%'
    },
    uploadService: {
        // backgroundColor: 'red',
        height: 50,
        width: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '30%'
    }
})