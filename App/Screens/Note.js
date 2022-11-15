import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook, faFileEdit, faPlus, } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, Searchbar, TextInput } from 'react-native-paper';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

export function Note({ navigation, route }) {

    const { noteId } = route.params;
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [noteInfo, setNoteInfo] = useState('');
    const [status, setStatus] = useState(true);

    useEffect(() => {
        onSnapshot(doc(db, "notes", noteId), (doc) => {
            const noteInfo = doc.data()
            setTitle(noteInfo.title)
            setContent(noteInfo.content)
        })
    }, []);

    function updateNote() {
        updateDoc(doc(db, "notes", noteId), {
            title: title,
            content: content
        })
            .then(() => setStatus(true))
            .catch(() => {
                Alert.alert('Error', 'An unknown error occured while saving this post')
            })
    }

    function deletePost(par) {
        deleteDoc(doc(db, "notes", par))
            .then(navigation.navigate("HomeScreen"))
            .catch(() => {
                Alert.alert('Error', 'An unknown error occured while deleting this post')
            })
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: "center", marginBottom: 10 }}>
                <FontAwesomeIcon icon={faFileEdit} size={30} color="#002E94" />
                <Text style={styles.header}>Edit note</Text>
            </View>
            <TextInput placeholder='Title...'
                style={{ fontSize: 20, fontWeight: '500', backgroundColor: 'white', borderRadius: 10, marginBottom: 5, }}
                value={title}
                onChangeText={text => { setTitle(text); setStatus(false) }}
            />
            <TextInput
                multiline={true}
                numberOfLines={20}
                placeholder='Content'
                style={{ backgroundColor: 'white', borderRadius: 10, marginBottom: 5 }}
                value={content}
                onChangeText={text => { setContent(text); setStatus(false) }}
            />
            <Card.Actions>
                <Button
                    icon="delete"
                    mode='elevated'
                    textColor='#fff'
                    buttonColor='red'
                    onPress={() => deletePost(noteId)}
                >
                    delete note
                </Button>
                <Button
                    disabled={status}
                    mode='elevated'
                    textColor='#fff'
                    buttonColor='#002E94'
                    onPress={updateNote}
                >
                    Save
                </Button>
            </Card.Actions>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(128,128,128,0.2)',
        flex: 1,
        padding: 10,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#002E94',
    }
})