import { useState, useContext, useEffect } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Button, TextInput, } from 'react-native-paper';
import { db } from '../../services/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, doc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { AppContext } from '../Globals/Appcontext';

export function Deposit({ navigation }) {
    const { userUID } = useContext(AppContext);
    const [disabled, setDisabled] = useState(true);
    const [disabledBtn, setDisabledBtn] = useState(true);

    const [depositor, setDepositor] = useState("");
    const [amount, setAmount] = useState("");

    function depositMoney() {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < 30; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        const trasactionRef = result;

        addDoc(collection(db, 'deposit'), {
            UID: userUID,
            trasactionRef: trasactionRef,
            depositor: depositor,
            amount: amount,
            date: new Date().getTime(),
            status: "Pendding"
        })
            .then(() => {
                navigation.navigation("HomeScreen")
            })
            .catch(() => {
                alert(
                    'Error',
                    'Please check your network connectivity and try again.',
                    [{ text: 'Ok' }]
                )
            })
    }

    return (
        <ImageBackground style={styles.container}>
            <View style={styles.overlay}>
                <Text style={styles.header}>Send Money</Text>
                <TextInput
                    label="Depositor name"
                    onChangeText={text => {
                        setDepositor(text);
                    }}
                    underlineColor="none"
                    activeUnderlineColor='none'
                    style={styles.input}
                />
                <TextInput
                    label="Amount"
                    onChangeText={text => setAmount(Number(text))}
                    underlineColor="none"
                    activeUnderlineColor='none'
                    style={styles.input}
                    keyboardType="number-pad"
                />
                <Button mode='contained' onPress={depositMoney}>Deposit Money</Button>


                {/* <Button mode='contained' disabled={disabled} onPress={sendMoney}>Send</Button> */}
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
        backgroundColor: "rgba(0,0,0,0.6)"
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
