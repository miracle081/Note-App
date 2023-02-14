import { useState, useContext } from 'react';
import { Alert, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Button, TextInput, } from 'react-native-paper';
import { AppContext } from '../Globals/Appcontext';
import { sendGridEmail } from 'react-native-sendgrid';
import axios from 'axios';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { authentication, db } from '../../services/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

export function ResetPassword({ navigation, route }) {
    const {setUserUID, setOldSignedIn} = useContext(AppContext);
    const [userInfo, setUserInfo] = useState({password:''});
    const [message, setMessage] = useState("Type username");
    const [color, setColor] = useState("gray");
    const [email, setEmail] = useState("");
    const [load, setLoad] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [sentPin, setSentPin] = useState(0);
    const [usertPin, setusertPin] = useState(0);


    // function sendMail() {
    //     const SENDGRIDAPIKEY = "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";
    //     const FROMEMAIL = "miracleobafemi09@gmail.com";
    //     const TOMEMAIL = email;
    //     const SUBJECT = "Reset password pin: 808398";

    //     const ContactDetails = "Contact Data: " + new Date().toDateString() + " Mail: " + email;
    //     const sendRequest = sendGridEmail(SENDGRIDAPIKEY, TOMEMAIL, FROMEMAIL, SUBJECT, ContactDetails)
    //     sendRequest.then((response) => {
    //         alert(response)
    //     }).catch((error) => {
    //         console.log(error)
    //     });
    // }

    async function sendMail() {
        const sub = "[App] Please verify your device"
        const pin = Math.round(Math.random() * 1000000)
        const msg = `Your reset pin is: <h2>${pin}</h2>`

        try {
            await axios.get(`https://apexassets.online/sendemail.php?email=${email}&subject=${sub}&message=${msg}`)
                .then(function (response) {
                    if (response.data.status === true) {
                        setSentPin(pin)
                        setLoad(false)
                        // console.log(response.data.status);
                        setVisibility(true)
                    } else {
                        alert(`Fail to send email to ${email}. please try again`)
                    }
                })
                .catch(function (error) {
                    setLoad(false)
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }

    function checkEmail() {
        setLoad(true)
        const q = collection(db, 'users');
        const filter = query(q, where('email', '==', email));
        onSnapshot(filter, (onSnap) => {
            const allUserName = [];
            onSnap.forEach(item => {
                const itemData = item.data();
                allUserName.push(itemData);
            })
            if (allUserName.length === 0) {
                setMessage("Email does not exist, please try again")
                setLoad(false)
                setColor("red")
            }
            else if (allUserName.length === 1) {
                setMessage("email confirmed. press the button to contineu")
                setColor("green")
                sendMail()
                setUserInfo(allUserName[0])
            }
            else {
                setMessage("")
                setColor("gray")

            }
        })
    }


    function confirmPin() {
        if (usertPin == sentPin) {
            signInWithEmailAndPassword(authentication, email, userInfo.password)
                .then(() => {
                    onAuthStateChanged(authentication, (userInfo) => {
                        setUserUID(userInfo.uid);
                        setLoad(false)
                        alert("Pin verification successfull")
                        setVisibility(false)
                        navigation.replace('ResetPassword')
                        navigation.navigate('SetPassword');
                    })
                })
                .catch((error) => {
                    // alert(error.message)
                    if (error.code === 'auth/network-request-failed') {
                        alert("You are currently offline!")
                    }
                    console.log(error.code, '|', error.message);
                })
        }
        else {
            alert("Wrong Pin")

        }

    }


    return (
        <ImageBackground source={require('../../assets/15.jpg')} style={styles.container}>
            <View style={styles.overlay}>
                <Text style={styles.header}>Forgotten Passsord</Text>
                <TextInput
                    label="Email"
                    onChangeText={text => setEmail(text)}
                    underlineColor="none"
                    activeUnderlineColor='none'
                    keyboardType='email-address'
                    style={styles.input}
                />
                <Text style={{ color: color, fontStyle: "italic", fontSize: 16, marginVertical: 10, }}>
                    {message}
                </Text>

                <Button
                    loading={load}
                    mode='contained'
                    onPress={checkEmail}
                >
                    Send Mail
                </Button>
                <TouchableOpacity onPress={() => navigation.navigate("Intro")} >
                    <Text style={styles.last}>Remeber password, Sing in</Text>
                </TouchableOpacity>
                {/* ============== MODAL ============ */}

            </View>
            <Modal
                visible={visibility}
                animationType="slide"
                style={{ backgroundColor: "white" }}
            >
                <View style={styles.overlay}>
                    <Text style={styles.header}>Pin Verification</Text>
                    <Text style={{}}>Enter the pin that was sent to your email</Text>
                    <TextInput
                        label="Pin"
                        onChangeText={text => setusertPin(text)}
                        underlineColor="none"
                        activeUnderlineColor='none'
                        keyboardType='number-pad'
                        style={[styles.input, { marginVertical: 10 }]}
                    />
                    <Button
                        loading={load}
                        mode='contained'
                        onPress={confirmPin}
                    >
                        verify pin
                    </Button>
                    {/* ============== MODAL ============ */}

                </View>
            </Modal>
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
