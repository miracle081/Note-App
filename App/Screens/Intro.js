import { useState, useContext } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Button, TextInput, } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { authentication, db } from '../../services/firebase';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

export function Intro({ navigation, route }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [word, setWord] = useState(true);
    const [icon, setIcon] = useState("eye");

    function LoginAuth() {
        signInWithEmailAndPassword(authentication, email, password)
            .then((userCredential) => {
                // const user = userCredential.user;
                onAuthStateChanged(authentication, (userInfo) => {
                    navigation.navigate('HomeScreen', { userUID: userInfo.uid });
                })
            })
            .catch((error) => Alert.alert(
                'Status',
                `${error}`,
                [{ text: 'Back to SignIn', onPress: navigation.navigate('Intro') }]
            ))
    }

    const q = collection(db, 'users');
    const filter = query(q, where('userName', '==', "MO"));
    getDocs(filter)
        .then((e) => console.log(e.empty()))
        .catch(() => Alert.alert(
            'Status',
            'Failed while interracting with database',
            [{ text: 'Back to SignUp', onPress: navigation.navigate('SignUp') }]
        ))
    return (
        <ImageBackground source={require('../../assets/15.jpg')} style={styles.container}>
            <View style={styles.overlay}>
                <Text style={styles.header}>Sign In</Text>
                <TextInput
                    label="Email"
                    onChangeText={text => setEmail(text)}
                    underlineColor="none"
                    activeUnderlineColor='none'
                    keyboardType='email-address'
                    style={styles.input}
                />
                <TextInput
                    underlineColor="none"
                    activeUnderlineColor='none'
                    label="Passsord"
                    secureTextEntry={word}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    right={<TextInput.Icon onPress={() => {
                        if (word === true) {
                            setWord(false)
                            setIcon("eye-off")
                        }
                        else {
                            setWord(true)
                            setIcon("eye")

                        }
                    }} icon={icon} />}
                />
                <TouchableOpacity>
                    <Text style={styles.last}>Forgotten Passsord</Text>
                </TouchableOpacity>
                <Button mode='contained' onPress={LoginAuth}>Log In</Button>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")} >
                    <Text style={styles.last}>Don't have an accout, create one</Text>
                </TouchableOpacity>
            </View>
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
    }
});
