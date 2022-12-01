import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook, faPlus, } from '@fortawesome/free-solid-svg-icons';
import { faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import { Button, Card, Searchbar, TextInput } from 'react-native-paper';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../services/firebase';

export function AddNote({ navigation, route }) {

    const { userUID } = route.params;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [savedate, setsavedate] = useState('');

    function add() {
        const now = new Date();
        let hr = now.getHours();
        let min = now.getMinutes();
        let day = now.getDate();
        let mon = now.getMonth() + 1;
        let yr = now.getFullYear();
        let amp = "am";

        if (min.lenght === 1) {
            min = `0${min}`;
        }

        if (hr > 12) {
            hr = hr - 12;
            amp = "pm";
        }
        const savedate = `${day}/${mon}/${yr} ~ ${hr}:${min} ${amp}`;

        addDoc(collection(db, 'notes'), {
            UID: userUID,
            title: title,
            content: content,
            date: savedate,
        })
            .then(() => {
                navigation.navigate('HomeScreen', { userUID: userUID })
            })
            .catch(() => {
                Alert.alert(
                    'Error',
                    'Please check your network connectivity and try again.',
                    [{ text: 'Ok' }]
                )
            })
    }

    return (
        <KeyboardAvoidingView
        // behavior='height'
            // {...(Platform.OS === 'ios' ? { behavior: 60 } : {})}
            style={styles.container}>
            <ScrollView style={styles.container}>
                {/* <ScrollView style={styles.scrollView}>
                    <TextInput style={styles.input} placeholder="Tap here" />
                </ScrollView>
                <Button title="Next" /> */}

                {/* <Text>{savedate}</Text> */}
                <TextInput placeholder='Title...'
                    style={{ fontSize: 20, fontWeight: '500', backgroundColor: 'white', borderRadius: 10, marginBottom: 5, }}
                    onChangeText={text => setTitle(text)}
                />
                <TextInput
                    multiline={true}
                    numberOfLines={20}
                    placeholder='Content'
                    style={{ backgroundColor: 'white', borderRadius: 10, marginBottom: 5 }}
                    onChangeText={text => setContent(text)}
                />
                <Card.Actions>
                    <Button
                        icon="file"
                        mode='elevated'
                        textColor='#fff'
                        buttonColor='#002E94'
                        onPress={add}
                    >
                        Add Note
                    </Button>
                </Card.Actions>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(128,128,128,0.2)',
        flex: 1,
        padding: 10,
    },
})