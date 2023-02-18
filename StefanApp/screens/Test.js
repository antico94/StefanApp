import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from "react-native";
import {database} from "../firebase";

const Test = () => {
    const [users, setUsers] = useState([])
    const usersCollectionRef = database.collection('users')
    const AddUser = () => {
        usersCollectionRef.add({
            email: "syug",
            password: "sex",
            role: 'laba'
        }).then(data => console.log('Success!')).catch(e => {

            console.log('error')
        })
    }

    useEffect(() => {
        // for (let i = 0; i < 10; i++) {
        //     AddUser()
        // }
        const getUsers = async () => {
            const data = await usersCollectionRef.onSnapshot(
                querySnapshot => {
                    const usersZ = []
                    querySnapshot.forEach((doc) => {
                        const {email, password} = doc.data()
                        usersZ.push(email)
                        setUsers([...email, users])
                    })
                    console.log(usersZ)
                    setUsers(usersZ)
                }
            )
            console.log('Success' + data)
        }
        getUsers().then(r => console.log('Am cerut'))
        console.log(users)
    }, [])


    return (
        <View
            style={{width: '100%', height: '100%', borderStyle: 'solid', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{borderWidth: 1, borderColor: 'red', display: 'flex', width: '50%', height: '50%'}}>
                <FlatList data={users} renderItem={({item})=> (
                    <Text>{item}</Text>
                )}/>
            </View>
        </View>
    );
};

export default Test;