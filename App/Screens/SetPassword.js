import { useState, useContext, useEffect } from 'react';
import { Alert, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import * as ImagePicer from "expo-image-picker";
import { Button, TextInput, } from 'react-native-paper';
import { authentication, db, storage } from '../../services/firebase';
import { AuthCredential, reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth';
import { AppContext } from '../Globals/Appcontext';
import { doc, updateDoc } from 'firebase/firestore';

export function SetPassword({ navigation }) {
    const { userUID, oldSignIn } = useContext(AppContext);
    const [userInfo, setUserInfo] = useState({});
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function changePassword() {
        let user = authentication.currentUser
        updatePassword(user, newPassword)
            .then(() => {
                navigation.replace('SetPassword')
                navigation.navigate("HomeScreen")
                alert("Password Updated successfully")
            })
            .catch((error) => alert(error.message + "From updatePassword"));
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.overlay}>
                <KeyboardAvoidingView {...(Platform.OS === 'ios' ? { behavior: "padding" } : {})}
                    style={{
                        width: "100%"
                    }}
                >
                    <Text style={styles.header}>Change password</Text>

                    <TextInput
                        label="new password"
                        onChangeText={text => setNewPassword(text)}
                        underlineColor="none"
                        activeUnderlineColor='none'
                        autoCapitalize='none'
                        style={styles.input}
                    // secureTextEntry
                    />

                    <TextInput
                        label="Confirm password"
                        onChangeText={text => setConfirmPassword(text)}
                        underlineColor="none"
                        activeUnderlineColor='none'
                        autoCapitalize='none'
                        style={styles.input}
                    // secureTextEntry
                    />

                    <Button mode='contained' onPress={changePassword}>Set Password</Button>

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
    bio: {
        alignItems: 'center',
        padding: 20,
        borderRadius: 20
    },
    profilePic: {
        width: 160,
        height: 160,
        borderWidth: 4,
        borderColor: 'white',
        borderRadius: 80,
    },
    userName: {
        fontSize: 26,
        letterSpacing: 2,
        color: 'white',
    },
    Editcam: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 50,
        padding: 5,
        backgroundColor: 'blue'
    },
    editText: {
        fontWeight: "bold",

    },
    cam: {
        color: 'white',
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
