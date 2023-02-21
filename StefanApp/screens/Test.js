// noinspection DuplicatedCode

import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Platform} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import placeholder from './../assets/images/placeholder.png'
import {database, storage} from "../firebase";


const imagesRef = storage.ref().child('images');
const Test = () => {
    const [step, setStep] = useState(1);
    const [serviceDescription, setServiceDescription] = useState('');
    const [serviceImage, setServiceImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [serviceTitle, setServiceTitle] = useState("")
    const [imageUrl, setImageUrl] = useState(null)
    const servicesCollectionRef = database.collection('services')

    const AddServiceToCloud = (description, imageUrl) => {
        servicesCollectionRef.add({
            description: description,
            imageUrl: imageUrl
        }).then(_ => _).catch(_ => {
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
            setServiceImage(result);
        }
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrev = () => {
        setStep(step - 1);
    };

    const handleTitleChange = (value) => {
        setServiceTitle(value);
    };

    const handleDescriptionChange = (value) => {
        setServiceDescription(value);
    };

    const uploadImage = async () => {
        if (serviceImage) {
            const fileName = `image_${Date.now()}.jpg`;
            const storageRef = imagesRef.child(fileName);
            const response = await fetch(serviceImage.uri);
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
                    setServiceImage(null);
                    setProgress(0);
                    AddServiceToCloud(serviceTitle, downloadURL)
                }
            );
        } else {
            alert('Please select an image first.');
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#ed7a8f', '#f19e78']}
                style={styles.container}
            >
                {step === 1 && (
                    <View style={styles.top}>
                        <Text style={styles.title}>Choose a service image</Text>
                        <TouchableOpacity
                            style={[styles.imageContainer]}
                            onPress={pickImage}>
                            <Image source={serviceImage !== null ? serviceImage.assets : placeholder}
                                   style={[styles.image]}/>
                        </TouchableOpacity>

                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.customButton} onPress={handleNext}>
                                <Text style={styles.customButtonText}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {step === 2 && (
                    <View style={styles.stepTwo}>
                        <View style={styles.titleContainer}>
                            <TextInput style={styles.title}
                                       maxLength={30}
                                       onChangeText={handleTitleChange}
                                       placeholder={"2. Add your service title"}
                                       placeholderTextColor={"white"}>
                            </TextInput>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.customButton} onPress={handlePrev}>
                                <Text style={styles.customButtonText}>Previous</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.customButton} onPress={handleNext}>
                                <Text style={styles.customButtonText}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {step === 3 && (
                    <View style={styles.stepTwo}>
                        <TextInput style={styles.serviceDescription} placeholder={'Describe your service'}
                                   placeholderTextColor={'black'} value={serviceDescription}
                                   onChangeText={handleDescriptionChange}>
                        </TextInput>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.customButton} onPress={handlePrev}>
                                <Text style={styles.customButtonText}>Previous</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.customButton} onPress={handleNext}>
                                <Text style={styles.customButtonText}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {step === 4 && (
                    <View style={styles.stepTwo}>
                        <Image source={serviceImage.assets}></Image>
                        <Text style={styles.title}>3 . Service added successfully!
                        </Text>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.customButton} onPress={() => setStep(1)}>
                                <Text style={styles.customButtonText}>Add another service</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </LinearGradient>
        </View>
    );
};


export default Test

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    top: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    bot: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
        paddingTop: 30,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Dosis',
        marginBottom: 10,
    },
    imageContainer: {
        width: 350,
        height: 350,
        borderRadius: 75,
        overflow: 'hidden',
        marginVertical: 30,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    serviceDescription: {
        height: 150,
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        color: 'black',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',

    },
    customButton: {
        width: '30%',
        backgroundColor: '#ffa94d',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    customButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

    stepTwo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        height: '100%'
    },
    titleContainer: {
        backgroundColor: 'rgba(239,193,199,0.5)',
    }
};