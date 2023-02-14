import { useState, useContext, useEffect } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Button, TextInput, } from 'react-native-paper';
import { authentication, db } from '../../services/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, onSnapshot, query, setDoc, updateDoc, where, } from 'firebase/firestore';
import { AppContext } from '../Globals/Appcontext';

export function Profile({ navigation }) {
    const [message, setMessage] = useState("Type username");
    const [color, setColor] = useState("gray");
    const [userName, setUserName] = useState("");


    function checkUserName(userN) {

        const q = collection(db, 'users');
        const filter = query(q, where('userName', '==', userN));
        onSnapshot(filter, (onSnap) => {
            const allUserName = [];
            onSnap.forEach(item => {
                const itemData = item.data();
                allUserName.push(itemData);
            })
            if (allUserName.length === 0) {
                setMessage("Username Ok. press the button to contineu")
                setColor("green")
                // navigation.navigate("Display")
            }
            else if (allUserName.length >= 1) {
                setMessage("Username already exist, try again")
                setColor("red")
            }
            else {
                setMessage("")
                setColor("gray")

            }
        })
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.overlay}>
                <KeyboardAvoidingView {...(Platform.OS === 'ios' ? { behavior: "padding" } : {})}
                    style={{
                        width: "100%"
                    }}
                >
                    <Button mode='contained' onPress={() => navigation.navigate("ChangePassword")}>Change Passsord</Button>
                    <Text style={styles.header}>Creat Username</Text>
                    <TextInput
                        label="User Name"
                        onChangeText={text => {
                            setUserName(text);
                            if (text.length > 2) {
                                checkUserName(text)
                            }
                            else {
                                setMessage('Type your username')
                                setColor("gray")
                            }
                        }}
                        underlineColor="none"
                        // onChange={checkUserName}
                        activeUnderlineColor='none'
                        style={styles.input}
                    />
                    <Text style={{ color: color, fontStyle: "italic", fontSize: 16 }}>
                        {message}
                    </Text>
                    <Button
                        mode='contained'
                        style={{ marginVertical: 10 }}
                        onPress={() => navigation.navigate("Display")}
                        icon="plus"
                    >
                        Add userName
                    </Button>
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    overlay: {
        padding: 25,
        height: "100%",
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
        marginBottom: 20,
        textAlign: "center"
    },
});
