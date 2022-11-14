import { useState, useContext } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Button, TextInput, } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { authentication, db } from '../../services/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export function SignUp({ navigation }) {

    const [fName, setFname] = useState("");
    const [lName, setLName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [word, setWord] = useState(true);
    const [icon, setIcon] = useState("eye");

    const userRecords = {
        fName:fName,
        lName:lName,
        phoneNumber:phone,
        email:email,
        password:password,
        
    }

    function CreateUserAuth () { 
        createUserWithEmailAndPassword(authentication,email,password)
        .then(() => onAuthStateChanged(authentication,(user)=>{
            const userUID = user.uid;

            //insert other records to firestore
            setDoc(doc(db,'users',userUID),userRecords)
            .then(()=> {navigation.navigate('HomeScreen',{userUID:userUID})})
            .catch(() => Alert.alert(
                'Status',
                'Failed while interracting with database',
                [{text:'Back to SignUp',onPress:navigation.navigate('SignUp')}]
            ))
        }))
        .catch((error) => Alert.alert(
            'Status',
            `${error}`,
            [{text:'Back to SignUp',onPress:navigation.navigate('SignUp')}]
        ))
    }


    return (
        <ImageBackground source={require('../../assets/15.jpg')} style={styles.container}>
            <View style={styles.overlay}>
                <Text style={styles.header}>Create An Account</Text>
                <TextInput
                    label="First Name"
                    onChangeText={text => setFname(text)}
                    underlineColor="none"
                    activeUnderlineColor='none'
                    style={styles.input}
                />
                <TextInput
                    label="Last Name"
                    onChangeText={text => setLName(text)}
                    underlineColor="none"
                    activeUnderlineColor='none'
                    style={styles.input}
                />
                <TextInput
                    label="Phone number"
                    onChangeText={text => setPhone(text)}
                    underlineColor="none"
                    activeUnderlineColor='none'
                    style={styles.input}
                    keyboardType='phone-pad'
                />
                <TextInput
                    label="Email"
                    onChangeText={text => setEmail(text)}
                    underlineColor="none"
                    activeUnderlineColor='none'
                    style={styles.input}
                    keyboardType='email-address'
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
                <Button mode='contained' onPress={CreateUserAuth}>Log In</Button>
                
                <TouchableOpacity onPress={() => navigation.navigate("Intro")}>
                    <Text style={styles.last}>Already have an accout, Log in</Text>
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
        marginBottom: 20,
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
        fontSize: 30,
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
