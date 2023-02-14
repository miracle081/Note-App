import { useState, useContext, useEffect } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import * as ImagePicer from "expo-image-picker";
import { Button, TextInput, } from 'react-native-paper';
import { authentication, db, storage } from '../../services/firebase';
import { addDoc, collection, doc, onSnapshot, query, runTransaction, setDoc, updateDoc, where, } from 'firebase/firestore';
import { AppContext } from '../Globals/Appcontext';
import * as FileSystem from 'expo-file-system';


export const getFileInfo = async (fileURI) => {
    const fileInfo = await FileSystem.getInfoAsync(fileURI)
    return fileInfo
}

export const isLessThanTheMB = (fileSize, smallerThanSizeMB) => {
    const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB
    return isOk
}

export function Display({ navigation }) {
    const { userUID } = useContext(AppContext);
    const [userInfo, setUserInfo] = useState({});
    const [image, setImage] = useState(null);

    const [fName, setFname] = useState("");
    const [lName, setLName] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        onSnapshot(doc(db, "users", userUID), (doc) => {
            setUserInfo(doc.data());
        })
    }, []);

    const pickImage = async () => {
        let result = await ImagePicer.launchImageLibraryAsync ({
            mediaType: ImagePicer.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
        // console.log(result.type);
        if (!result.cancelled) {
            const { uri, type } = result
            console.log(uri);
            setImage(uri)

            // const fileInfo = await getFileInfo(result.uri)
            // if (!fileInfo?.size) {
            //     alert("Can't select this file as the size is unknown.")
            //     return
            // }

            // if (type === 'image') {
            //     const isLt15MB = isLessThanTheMB(fileInfo.size, 1)
            //     if (!isLt15MB) {
            //         alert(`Image size must be smaller than 15MB!`)
            //         return
            //     }
            // }
        }
    }

    // const uploadImage = async () => {
    //     // const uploadUri = image;
    //     // let fileName = image.substring(image.lastIndexOf("/") + 1);
    //     const response = await fetch(image)
    //     const blob = await response.blob();
    //     console.log(blob);
    //     const fileName = image.substring(image.lastIndexOf('/') + 1);
    //     let ref = storage().ref(`profile`).child(userUID).put(blob);

    //     try {
    //         await ref;
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     Alert.alert(
    //         "Photo uploaded!"
    //     );
    //     setImage(null)
    // }

    const addHistory = async () => {
        const sfDocRef = doc(db, "users", userUID);
        try {
            await runTransaction(db, async (transaction) => {
                const q = transaction.update(sfDocRef, { profilePic: image });
                alert("Done");
            });
            // navigation.reset({ index: 0, routes: [{ name: "Transfer", }] })
            // navigation.navigate("HomeScreen")
        } catch (e) {
            // This will be a "population is too big" error.
            console.error(e);
        }
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.overlay}>
                <KeyboardAvoidingView {...(Platform.OS === 'ios' ? { behavior: "padding" } : {})}
                    style={{
                        width: "100%"
                    }}
                >
                    <Text style={styles.header}>Updated Profile</Text>

                    <View style={styles.bio}>
                        <View>
                            <Image style={styles.profilePic} source={
                                userInfo.profilePic == "" ? require('../../assets/user.png') : { uri: userInfo.profilePic }

                            } />
                        </View>

                        <Button mode='contained' onPress={pickImage}>Select Image</Button>
                        <Button mode='contained' onPress={addHistory} >Upload Image</Button>

                        <Text style={styles.userName} >Miracle Obafemi</Text>
                        <Text style={{ marginTop: 5, color: 'white', fontSize: 17, }}>miracleobafemi@gmail.com</Text>

                    </View>
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
                    <Button mode='contained' >Update</Button>

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
