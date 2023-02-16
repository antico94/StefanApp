import React, {useEffect, useState} from 'react';
import {View, Text, Image, Button} from "react-native";
import * as ImagePicker from 'expo-image-picker'

const AddService = () => {
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })


        if (!result.canceled) {
            setImage(result.assets)
        }
    }

    if (hasGalleryPermission === false) {
        return <Text>No access to Internal Storage</Text>
    }


    return (
        <View>
            <Button title={'Pick Image'} onPress={pickImage} style={{marginTop: 30}}/>
            {image && <Image source={image} style={{width: 500, height: 500}}/>}
        </View>
    );
};

export default AddService;