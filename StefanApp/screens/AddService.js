// noinspection DuplicatedCode
// noinspection DuplicatedCode

import React, {useEffect, useRef, useState} from 'react';
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


const imagesRef = storage.ref().child('images');
const screenWidth = Dimensions.get("window").width;

const AddService = () => {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [success, setSuccess] = useState(false)
    const [nextScreen, setNextScreen] = useState(false)
    const servicesCollectionRef = database.collection('services')
    const descriptionRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const AddServiceToCloud = (title, description, imageUrl) => {
        servicesCollectionRef.add({
            imageUrl: imageUrl,
            title: title,
            description: description
        }).then(_ => {
            setSuccess(true)
            resetFields()
        }).catch(_ => {
            console.log('error')
        })
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result);
        }
    };


    const uploadImage = async () => {
        if (image) {
            const fileName = `image_${Date.now()}.jpg`;
            const storageRef = imagesRef.child(fileName);
            const response = await fetch(image.uri);
            const blob = await response.blob();
            const uploadTask = storageRef.put(blob);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    let percent =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(percent);
                },
                (error) => {
                    console.log(error);
                },
                async () => {
                    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                    setImage(null);
                    setProgress(0);
                    setLoading(true)
                    AddServiceToCloud(title, description, downloadURL)
                }
            );
        } else {
            alert('Please select an image first.');
        }
    };

    const handleNextScreen = () => {
        if (image && title.length > 0) {
            setNextScreen(true)
        }
    }

    const handleOutsidePress = () => {
        descriptionRef.current.blur()
    }


    useEffect(() => {
        if (progress >= 1) {
            setLoading(true)
        }
    }, [progress])

    useEffect(() => {
        if (success) {
            RootNavigation.navigate("Services")
        }
    }, [success])

    const resetFields = () => {
        setImage(null)
        setProgress(0)
        setTitle("")
        setDescription("")
        setSuccess(false)
        setNextScreen(false)
        setLoading(false)
    }


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
                            <Image source={image !== null ? image.assets : placeholder}
                                   style={[styles.image, {width: screenWidth * 0.7, height: screenWidth * 0.7}]}/>
                        </TouchableOpacity>
                        <View style={styles.delimiter}>
                            <TextInput style={[styles.input,
                                {
                                    width: progress > 1 ? `${progress}%` : 'auto',
                                    backgroundColor: progress === 100 ? 'green' : 'orange'
                                }
                            ]}
                                       maxLength={30}
                                       onChangeText={(text) => setTitle(text)}
                                       placeholder={"Insert service title"}
                                       placeholderTextColor={"white"}
                            >{progress === 100 ? 'Done' : null}
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
                                    source={image !== null ? image.assets : placeholder}
                                    style={[
                                        styles.image,
                                        {
                                            width: screenWidth * 0.7,
                                            height: screenWidth * 0.7,
                                        },
                                    ]}
                                />
                                <Text
                                    style={[styles.title, {
                                        fontSize: 30,
                                        color: progress === 100 ? 'green' : 'white'
                                    }]}>{progress === 100 ? 'Service added successfully' : title}</Text>
                            </View>
                            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                                                  style={styles.nextScreenBottom}>
                                <TextInput ref={descriptionRef} multiline={true}
                                           onChangeText={(text) => setDescription(text)} style={styles.addDescription}
                                           placeholder={"Describe your service"}>
                                </TextInput>
                                <View style={{
                                    marginTop: 50, borderStyle: 'solid',
                                    borderWidth: 1,
                                    borderColor: 'white'
                                }}>
                                    <TouchableOpacity style={styles.uploadService} onPress={() => uploadImage()}>
                                        <Text style={styles.customButton}>
                                            Upload Service
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </KeyboardAvoidingView>
                        </LinearGradient>
                    </View>
                </TouchableWithoutFeedback>
            )

    )
        ;
};

export default AddService;

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