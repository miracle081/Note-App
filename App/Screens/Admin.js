import React, { useContext, useEffect, useState } from 'react';
import { Alert, FlatList, Image, Platform, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View, } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMoneyBill, faMoneyCheckDollar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Searchbar } from 'react-native-paper';
import { collection, deleteDoc, doc, doc as document, getDoc, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { AppContext } from '../Globals/Appcontext';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';

export function Admin({ navigation }) {
    const { userUID } = useContext(AppContext);
    const [deposit, setDeposits] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = React.useState(false);
    const [userInfo, setUserInfo] = useState({});

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };

    const q = collection(db, 'deposit');
    const filter = query(q, where('status', '==', "Pendding", orderBy("date","desc")));

    useEffect(() => {
        onSnapshot(filter, (onSnap) => {
            const allDeposit = [];
            onSnap.forEach(item => {
                const itemData = item.data();
                itemData.docId = item.id;
                allDeposit.push(itemData);
            })
            setDeposits(allDeposit);
        })
    }, []);



    function getUser(user) {
        onSnapshot(doc(db, "users", user), (doc) => {
            setUserInfo(doc.data())
        })
        console.log("Done!"); 
    }
    function approveDeposite(docid, tracAmout) {
        updateDoc(document(db, "users", userInfo.uid), {
            balance: Number(userInfo.balance + tracAmout)
        }).then(() => {
            updateDoc(document(db, "deposit", docid), {
                status: "Approved",
            }).then(() => alert('Successful'))
        })
    }

    return (
        <SafeAreaView style={{ backgroundColor: "rgba(128,128,128,0.2)", flex: 1 }}>
            <View style={styles.container}>
                <Searchbar
                    placeholder="Search Note"
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                    style={{ marginVertical: 7, borderRadius: 50, }}
                />
                <FlatList data={deposit} renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.singleNote} onPress={() => { deleteTac(item.id) }}

                        >
                            <Text style={styles.title}>name: {item.depositor}</Text>
                            <View style={styles.body}>
                                <View>
                                    <Text style={styles.content}>Amount: {item.amount}</Text>
                                    <Text style={styles.content}>Status: {item.status}</Text>

                                    <View style={{ justifyContent: 'space-between' }}>
                                        <Text style={styles.date}>Date: {item.date}</Text>
                                        <Text style={styles.date}>Ref ID: {item.trasactionRef}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Button mode='contained' onPress={() => { getUser(item.UID) }}>comfirm</Button>
                                    <Button mode='contained' style={{marginTop:5}} onPress={() => { approveDeposite(item.docId, item.amount) }}>Approve</Button>
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
        color: '#379237',
    },
    singleNote: {
        borderRadius: 10,
        backgroundColor: 'white',
        marginVertical: 4,
    },
    title: {
        fontSize: 22,
        fontWeight: '400',
        backgroundColor: '#379237',
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
        borderColor: "#379237",
        borderWidth: 2,
        paddingTop: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        flexDirection: 'row',
        backgroundColor: '#379237',
        padding: 0,
        paddingHorizontal: 10,
        borderRadius: 50,
        borderColor: "#fff",
        borderWidth: 3,
        justifyContent: 'center'
    }
})