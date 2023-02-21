import React, {useContext, useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from "react-native";
import ServiceCreator from "../components/ServiceCreator";
import {database} from "../firebase";
import {AuthContext} from "../context/AuthContext";
import Service from "../components/Service";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


const Services = () => {
    const {isAdmin} = useContext(AuthContext)
    const servicesCollectionRef = database.collection('services')
    const [services, setServices] = useState([])
    const [loadingServices, setLoadingServices] = useState(true)
    useEffect(() => {
        // for (let i = 0; i < 10; i++) {
        //     AddServices()
        // }
        const getServices = async () => {
            await servicesCollectionRef.onSnapshot(
                querySnapshot => {
                    const servicesZ = []
                    querySnapshot.forEach((doc) => {
                        const {description, imageUrl, title} = doc.data()
                        servicesZ.push({
                            title: title,
                            description: description,
                            imageUrl: imageUrl,
                            serviceId: doc.id
                        })
                    })
                    setServices(servicesZ)
                    console.log(servicesZ)
                }
            )
        }
        getServices().then(_ => setLoadingServices(false)).then(e => console.log(e))
    }, [])

    if (!loadingServices) {
        return (<View style={styles.container}>
            <ScrollView>
                <View style={styles.serviceContainer}>
                    {Array.from({length: services.length}, (_, index) => (
                        <View key={index} style={styles.serviceContainerInside}>
                            <Service
                                style={styles.service}
                                image={services[index].imageUrl}
                                title={services[index].title}
                                serviceId={services[index].serviceId}
                            />
                        </View>
                    ))}
                    {isAdmin && <ServiceCreator/>}
                </View>
            </ScrollView>
        </View>)
    } else {
        return <View><Text>Loading</Text></View>
    }


};

export default Services;


const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white'
    },
    servicesTextContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10
    },
    servicesText: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Dosis'
    },
    serviceContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    serviceContainerInside: {
    },

    service: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: 'violet',
        width: screenWidth / 2 - 15,
        height: screenHeight / 3,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },
});