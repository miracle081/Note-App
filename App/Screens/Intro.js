import { useState, useContext, useEffect } from 'react';
import { ActivityIndicator, Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Button, TextInput, } from 'react-native-paper';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { authentication, db } from '../../services/firebase';
import { AppContext } from '../Globals/Appcontext';
import { Loader } from '../Components/loder';
import { Formik } from 'formik';
import * as Yup from 'yup'
export function Intro({ navigation, route }) {

    const { setUserUID } = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [word, setWord] = useState(true);
    const [icon, setIcon] = useState("eye");
    const [load, setLoad] = useState(false);

    function LoginAuth(email, password) {
        setLoad(true)
        signInWithEmailAndPassword(authentication, email, password)
            .then(() => {
                // const user = userCredential.user;
                onAuthStateChanged(authentication, (userInfo) => {
                    setUserUID(userInfo.uid);
                    setLoad(false)
                    // navigation.replace('Intro')
                    navigation.navigate('HomeScreen');
                })
            })
            .catch((error) => {
                let msg = error.code.split("/").pop()
                msg = msg.split("-").join(" ")
                navigation.replace('Intro')
                alert(msg)
            })
    }


    return (
        <ImageBackground source={require('../../assets/15.jpg')} style={styles.container}>
            <Formik
                initialValues={{
                    email: "",
                    password: ""
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email("Invalid Email!").
                        required("Field Cannot be Empty"),
                    password: Yup.
                        string("Must be a string value!").
                        min(8, "Password is too short!").
                        max(14, "Password is too long").
                        required("Filed cannot be empty")
                })}
                onSubmit={(values, action) => {
                    LoginAuth(values.email, values.password)
                }}

            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View style={styles.overlay}>
                        <Text style={styles.header}>Sign In</Text>
                        <TextInput
                            label="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            underlineColor="none"
                            activeUnderlineColor='none'
                            keyboardType='email-address'
                            style={styles.input}
                        />
                        {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                        <TextInput
                            underlineColor="none"
                            activeUnderlineColor='none'
                            label="Passsord"
                            secureTextEntry={word}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            style={styles.input}
                            right={<TextInput.Icon onPress={() => { setWord(!word) }} icon={icon} />}
                        />
                        {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
                        <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
                            <Text style={styles.last}>Forgotten Passsord</Text>
                        </TouchableOpacity>
                        <Button mode='contained' loading={load} onPress={handleSubmit}>Log In</Button>
                        <TouchableOpacity onPress={() => navigation.navigate("SignUp")} >
                            <Text style={styles.last}>Don't have an accout, create one</Text>
                        </TouchableOpacity>
                        {/* <Loader /> */}
                    </View>
                )}
            </Formik>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        // backgroundColor: '#372948',
    },
    overlay: {
        padding: 25,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.3)"
    },
    input: {
        width: '100%',
        borderRadius: 50,
        marginTop: 20,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        borderBottomColor: 'green',
        borderBottomWidth: 2,
        backgroundColor: 'transpirent',
        backgroundColor: "rgba(255, 255, 255, 0.612)",
        color: 'white',
        fontSize: 17,
    },
    header: {
        color: "white",
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20
    },
    last: {
        marginVertical: 10,
        color: "white",
        fontWeight: 'bold',
        fontSize: 17,
    },
});
