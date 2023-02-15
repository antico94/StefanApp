import React, {useContext, useRef, useState} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import SvgComponent from "../components/SvgComponent";
import {LinearGradient} from 'expo-linear-gradient';
import {AuthContext} from "../context/AuthContext";


const Login = ({navigation}) => {
    const {logIn} = useContext(AuthContext)
    const emailRef = useRef(null);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [email, setEmail] = useState('');
    const passwordRef = useRef(null);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [password, setPassword] = useState('');
    const handleOutsidePress = () => {
        setIsEmailFocused(false);
        setIsPasswordFocused(false);
        emailRef.current.blur();
        passwordRef.current.blur();
    };


    const handleLogin = () => {
        logIn(email, password)
    };
    return (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text style={styles.loginTitle}>Login</Text>
                    <Text style={styles.loginSubTitle}>Please sign in to continue</Text>
                </View>
                <View style={styles.abstractSvgTop}>
                    <SvgComponent width="100%" height="100%" strokeWidth={0} stroke="black" startColor='#3d8e2f'
                                  stopColor='#7cba27'/>
                </View>
                <View style={styles.loginArea}>
                    <View style={[styles.emailArea, isEmailFocused ? styles.emailAreaFocused : null]}>
                        <Text
                            style={[styles.textSuperscript,
                                isEmailFocused ? styles.textSuperscriptFocused : null,
                                {display: email.length > 0 && !isEmailFocused ? 'none' : 'show'}]}
                        >Email</Text>
                        <View style={styles.emailInputContainer}>
                            <Icon
                                name='mail-outline'
                                color="black"
                                size={25}
                            />
                            <TextInput underlineColorAndroid={'transparent'}
                                       style={styles.textInput}
                                       ref={emailRef}
                                       onFocus={() => setIsEmailFocused(true)}
                                       onBlur={() => setIsEmailFocused(false)}
                                       onChangeText={text => setEmail(text)}></TextInput>
                        </View>
                    </View>
                    <View style={[styles.passwordArea, isPasswordFocused ? styles.passwordAreaFocused : null]}>
                        <Text
                            style={[styles.textSuperscript,
                                isPasswordFocused ? styles.textSuperscriptFocused : null,
                                {display: password.length > 0 && !isPasswordFocused ? 'none' : 'show'}]}
                        >Password</Text>
                        <View style={styles.passwordInputContainer}>
                            <Icon
                                name='lock-closed-outline'
                                color="black"
                                size={20}
                            />
                            <TextInput underlineColorAndroid={'transparent'}
                                       style={styles.textInput}
                                       ref={passwordRef}
                                       onFocus={() => setIsPasswordFocused(true)}
                                       onBlur={() => setIsPasswordFocused(false)}
                                       onChangeText={text => setPassword(text)}
                                       secureTextEntry={true}
                            ></TextInput>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonAreaContainer} onPress={() => handleLogin()}>
                    <LinearGradient
                        colors={['#7cba27', '#3d8e2f']}
                        start={[0, 0]}
                        end={[1, 0]}
                        style={styles.buttonArea}
                    >
                        <Text style={styles.loginButtonText}>LOG IN</Text>
                        <Icon name="arrow-forward-outline" size={25} color="white"/>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={styles.abstractSvgBottom}>
                    <SvgComponent width="100%" height="100%" strokeWidth={0} stroke="black" startColor='#3d8e2f'
                                  stopColor='#7cba27'/>
                </View>
                <View style={styles.footerContainer}>
                    <View style={styles.footerArea}>
                        <Text style={styles.footerText}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.footerSignUp}>
                                Sign up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
        ;
};

export default Login;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: 25
    },
    containerTitle: {
        marginTop: 50,
        display: "flex",
        width: '100%',
        alignItems: "flex-start"
    },
    loginTitle: {
        fontSize: 50,
        fontFamily: 'DosisBold',
    },
    loginSubTitle: {
        fontSize: 22,
        color: 'rgb(144,144,144)',
        fontFamily: 'DosisBold'
    },
    loginArea: {
        marginTop: 50,
        display: "flex",
        width: '100%',
        alignItems: "center"
    },
    emailArea: {
        display: "flex",
        width: '100%',
        borderStyle: 'solid',
        borderRadius: '5px',
        borderWidth: '1px',
        height: 50,
        padding: 10,
        justifyContent: 'center'
    },
    emailAreaFocused: {
        backgroundColor: 'white',
        shadowColor: 'grey',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: {width: 10, height: 10},
        elevation: 5,
        borderWidth: 2
    },
    textSuperscript: {
        marginLeft: 37,
        top: 10,
        fontFamily: 'Dosis',
        position: 'absolute',
        fontSize: 18,
        color: 'grey'
    },
    textSuperscriptFocused: {
        fontSize: 10,
        fontFamily: 'DosisBold',
        marginLeft: 48,
        top: 0,
        color: 'grey'
    },
    emailInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        position: "relative",
        width: '90%',

    },
    textInput: {
        position: 'relative',
        height: 30,
        width: '100%',
        marginLeft: 10,
        fontSize: 20,
        fontFamily: 'Dosis',
    },
    passwordArea: {
        marginTop: 15,
        display: "flex",
        width: '100%',
        borderStyle: 'solid',
        borderRadius: '5px',
        borderWidth: '1px',
        height: 50,
        padding: 10,
    },
    passwordAreaFocused: {
        backgroundColor: 'white',
        shadowColor: 'grey',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: {width: 10, height: 10},
        elevation: 5,
        borderWidth: 2
    },
    passwordInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        position: "relative",
        width: '90%',
    },
    buttonAreaContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '100%',
    },
    buttonArea: {
        borderStyle: 'solid',
        height: 50,
        width: 150,
        marginTop: 20,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#7cba27',
        position: 'relative'
    },
    loginButtonText: {
        fontSize: 20,
        fontFamily: 'DosisBold',
        color: 'white',
        marginRight: 10
    },
    footerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 50
    },
    footerArea: {
        display: "flex",
        flexDirection: 'row'
    },
    footerSignUp: {
        fontFamily: 'DosisBold',
        marginLeft: 10,
        fontSize: 20,
        color: '#7cba27'

    },
    footerText: {
        fontFamily: 'Dosis',
        fontSize: 20,
    },
    abstractSvgBottom: {
        position: 'absolute',
        right: '50%',
        top: '50%',
        zIndex: -1,
        width: '90%',
        height: '50%',
        transform: [{rotate: '180deg'}]
    },
    abstractSvgTop: {
        position: 'absolute',
        right: '-10%',
        top: '-12%',
        zIndex: -1,
        width: '50%',
        height: '50%',
    }
})