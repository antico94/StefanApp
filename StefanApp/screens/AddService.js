import React, {useState} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity, Dimensions, TextInput
} from "react-native";
import * as ImagePicker from 'expo-image-picker'
import {storage} from "../firebase";
import {LinearGradient} from "expo-linear-gradient";
import placeholder from './../assets/images/placeholder.png'
import * as RootNavigation from "../navigation/RootNavigation";
import addServicePhoto from './../assets/images/addService.webp'


const imagesRef = storage.ref().child('images');
const screenWidth = Dimensions.get("window").width;

const AddService = () => {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [description, setDescription] = useState("")
    const [imageUrl, setImageUrl] = useState(null)

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
                    alert(`Image uploaded successfully. Download URL: ${downloadURL}`);
                    setImage(null);
                    setProgress(0);
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
                                   maxLength={21}
                                   onChangeText={(text) => setDescription(text)}
                                   placeholder={"Insert service description"}
                                   placeholderTextColor={"white"}
                        >{progress === 100 ? 'Done' : null}
                        </TextInput>
                    </View>

                </View>
                <View style={styles.bot}>
                    <TouchableOpacity style={styles.buttonsContainer} onPress={uploadImage}>
                        <Text style={styles.loginButton}>
                            Add service
                        </Text>
                    </TouchableOpacity>
                    <Image source={addServicePhoto}
                           style={{width: screenWidth * 0.9, height: screenWidth * 0.9, position: 'absolute'}}
                    ></Image>

                </View>

            </LinearGradient>
        </View>
    );
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
    loginButton: {
        borderRadius: 10,
        overflow: 'hidden',
        color: 'white',
        fontFamily: 'DosisBold',
        textAlign: 'center',
        fontSize: 20
    }
})