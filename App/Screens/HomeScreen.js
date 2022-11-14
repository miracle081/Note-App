import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook, faPlus, } from '@fortawesome/free-solid-svg-icons';
import { faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import { Searchbar } from 'react-native-paper';
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase';

export function HomeScreen({ navigation, route }) {
    const { userUID } = route.params;
    const [userInfo, setUserInfo] = useState("");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        onSnapshot(doc(db, "users", userUID), (doc) => {
            setUserInfo(doc.data());
        })
    }, []);

    const q = collection(db, 'notes');
    const filter = query(q, where('UID', '==', userUID));

    useEffect(() => {
        onSnapshot(filter, (onSnap) => {
            const allNote = [];
            onSnap.forEach(item => {
                const itemData = item.data();
                itemData.noteId = item.id;
                allNote.push(itemData);
            })
            setNotes(allNote);
        })
    }, []);

    function deletePost(par) {
        deleteDoc(doc(db, "notes", par))
            .then()
            .catch(() => {
                Alert.alert('Error', 'An unknown error occured while deleting this post')
            })
    }
    const [searchQuery, setSearchQuery] = useState('');

    const now = new Date();
    let hr = now.getHours();
    let greeting = 'Morning';
    if (hr >= 12 & hr <= 15 ) {
        greeting="Afternoon"
    }
    else if (hr >= 16) {
        greeting="Evening"
    }

    return (
        <SafeAreaView style={{ backgroundColor: "rgba(128,128,128,0.2)", flex: 1 }}>
            <View style={styles.container}>


                <Text style={styles.greetingText}>Good {greeting} {userInfo.fName}</Text>
                <Searchbar
                    placeholder="Search Note"
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                    style={{ marginVertical: 7, borderRadius: 50, }}
                />
                <TouchableOpacity style={styles.addBtn}
                    onPress={() => navigation.navigate('AddNote', { userUID: userUID })}>
                    <FontAwesomeIcon icon={faPlus} size={30} color="white" />
                </TouchableOpacity>
                <FlatList showsVerticalScrollIndicator data={notes} renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.singleNote} onPress={() => navigation.navigate("Note", { noteId: item.noteId })}
                            onLongPress={() => Alert.alert(
                                'Delet Note',
                                'Are you sure you want to delete this note?',
                                [{ text: 'Yes', onPress: () => deletePost(item.noteId) }, { text: 'No' }]
                            )}
                        >
                            <Text style={styles.title}>
                                {item.title.length > 30 ? item.title.slice(0, 27) + "..." : item.title}
                            </Text>
                            <View style={styles.body}>
                                <Text style={styles.content}>
                                    {item.content.length > 183 ? item.content.slice(0, 178) + "..." : item.content}
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.date}>Created: {item.date}</Text>
                                    <Text style={styles.date}>Updated: 22/09/2022</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }} key={({ item }) => { item.id }} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'rgba(128,128,128,0.2)',
        flex: 1,
        padding: 10,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : null
    },
    greetingText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#002E94',
    },
    singleNote: {
        borderRadius: 10,
        backgroundColor: 'white',
        marginVertical: 4,
    },
    title: {
        fontSize: 22,
        fontWeight: '400',
        backgroundColor: '#002E94',
        padding: 3,
        paddingHorizontal: 16,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        color: 'white',
    },
    body: {
        padding: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderColor: "#002E94",
        borderWidth: 2,
        paddingTop: 0,
    },
    content: {
        fontSize: 18,
    },
    date: {
        color: 'gray',
        marginTop: 5,
        fontSize: 12
    },
    addBtn: {
        backgroundColor: '#002E94',
        padding: 10,
        borderRadius: 50,
        position: 'absolute',
        right: 30,
        bottom: '8%',
        zIndex: 222,
        borderColor: "#fff",
        borderWidth: 3
    }
})