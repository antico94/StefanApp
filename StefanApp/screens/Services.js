import React, {Suspense} from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from "react-native";
import development from './../assets/images/services/developement.png'
import graphic_designer from './../assets/images/services/graphic_designer.png'
import research from './../assets/images/services/research.png'
import security from './../assets/images/services/security.png'
import simple_customer_service from './../assets/images/services/simple_customer_service.png'
import technical_customer_service from './../assets/images/services/technical_customer_service.png'
import Service from "../components/Service";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


const Services = () => {
    const LazyService = React.memo(React.lazy(() => import('./../components/Service')));
    const fakeServicesApi = [
        {
            image: development,
            description: "Development Services"
        },
        {
            image: graphic_designer,
            description: "Graphic Design Services"
        },
        {
            image: research,
            description: "Research Services"
        },
        {
            image: security,
            description: "Security Services"
        },
        {
            image: simple_customer_service,
            description: "Customer Services"
        },
        {
            image: technical_customer_service,
            description: "Technical Customer Services"
        }
    ];

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.serviceContainer}>
                    {Array.from({length: fakeServicesApi.length}, (_, index) => (
                        <View key={index} style={styles.serviceContainerInside}>
                            <LazyService
                                style={styles.service}
                                image={fakeServicesApi[index].image}
                                description={fakeServicesApi[index].description}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
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
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    serviceContainerInside: {},

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