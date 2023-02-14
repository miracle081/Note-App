import React, { useContext, useEffect, useState } from 'react';
import { Alert, FlatList, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFaceSadTear, faMoneyBill, faMoneyCheckDollar, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { Button, Searchbar } from 'react-native-paper';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { AppContext } from '../Globals/Appcontext';

export function HomeScreen({ navigation }) {
    const { userUID } = useContext(AppContext);
    const [userInfo, setUserInfo] = useState({});
    const [histories, setHistories] = useState([{ name: "", date: "" }]);
    const [savedhistories, setsavedHistories] = useState([]);
    const [wordFound, setWordFound] = useState("");
    const formater = Intl.NumberFormat('en-US', {
        compactDisplay: 'long',
        minimumFractionDigits: 2
    })

    onSnapshot(doc(db, "users", userUID), (doc) => {
        setUserInfo(doc.data());
    })

    useEffect(() => {
        const limit = new Date();
        const q = collection(db, 'history');
        const filter = query(q, where('userID', '==', userUID));
        onSnapshot(filter, (onSnap) => {
            const allHistory = [];
            onSnap.forEach(item => {
                const itemData = { ...item.data(), docId: item.id };
                // itemData.docId = item.id;
                allHistory.push(itemData);
            })
            let order = allHistory.sort((a, b) => {
                return b.id - a.id
            })
            setHistories(order);
            setsavedHistories(order);
            // console.log(allHistory);
        })
    }, []);

    const now = new Date();
    let hr = now.getHours();
    let greeting = 'Morning';
    if (hr >= 12 & hr <= 15) {
        greeting = "Afternoon"
    }
    else if (hr >= 16) {
        greeting = "Evening"
    }


    // function deleteTac(tid) {
    //     let newHistory = userInfo.history.filter(t => t.id !== tid)
    //     updateDoc(doc(db, "users", userUID), {
    //         history: newHistory
    //     })
    //         .catch(() => {
    //             alert('Error', 'An unknown error occured while saving this post')
    //         })
    // }

    function handleSearch(input) {
        if (!input.trim() & input == "") {
            setHistories(savedhistories)
            setWordFound(false)

            return histories
        }
        else {
            const newHistory = histories.filter(h => {
                if (h.name.toLowerCase().includes(input.toLowerCase()) || h.date.includes(input)) {
                    return h
                }
            })
            if (newHistory.length) {
                setHistories([...newHistory]);
            }
            else {
                setWordFound(true)
                setHistories(savedhistories);
            }
        }

    }

    return (
        <SafeAreaView style={{ backgroundColor: "rgba(128,128,128,0.2)", flex: 1 }}>
            <View style={styles.container}>


                <View style={{ flexDirection: "row" }}>
                    <View style={{
                        backgroundColor: "#379237",
                        width: "70%",
                        padding: 10,
                        borderRadius: 10,
                        marginLeft: 'auto'
                    }}>
                        <Text style={{ color: 'white', fontSize: 25 }}>Account Balance:</Text>
                        <Text style={{ color: 'white', fontWeight: "bold", textAlign: 'right' }}>₦{formater.format(Number(userInfo.balance))}</Text>
                    </View>
                    <Button onPress={() => navigation.navigate("Profile")} mode='contained'>
                        <FontAwesomeIcon icon={faUserAlt} size={30} color="white" />
                        Profile
                    </Button>
                </View>

                <View>
                    <View style={{ flexDirection: "row", }}>
                        <Button mode='contained'
                            style={{ marginVertical: 10 }}
                            icon={() => <FontAwesomeIcon icon={faMoneyCheckDollar} size={30} color="white" />}
                            onPress={() => navigation.navigate('Deposit')}>
                            <Text style={{ color: 'white', fontWeight: "bold", paddingEnd: 2, }}> Deposit</Text>
                        </Button>
                        <Button mode='contained'
                            style={{ marginVertical: 10 }}
                            icon={() => <FontAwesomeIcon icon={faMoneyBill} size={30} color="white" />}
                            onPress={() => navigation.navigate('Transfer')}>
                            <Text style={{ color: 'white', fontWeight: "bold" }}> Send Money</Text>
                        </Button>
                    </View>
                    <View style={{ flexDirection: "row", }}>
                        <Button mode='contained'
                            style={{ marginVertical: 10 }}
                            icon={() => <FontAwesomeIcon icon={faMoneyCheckDollar} size={30} color="white" />}
                            onPress={() => navigation.navigate('Crypto')}>
                            <Text style={{ color: 'white', fontWeight: "bold", paddingEnd: 2, }}>Crypto Coins</Text>
                        </Button>

                        {
                            userInfo.userRole == "Admin" ?
                                <Button mode='contained' style={{ marginVertical: 10 }}
                                    icon={() => <FontAwesomeIcon icon={faMoneyCheckDollar} size={30} color="white" />}
                                    onPress={() => navigation.navigate('Admin')}>
                                    <Text style={{ color: 'white', fontWeight: "bold", paddingEnd: 2, }}> All Pendding Deposit</Text>
                                </Button>
                                : null
                        }
                    </View>
                </View>
                <Searchbar
                    placeholder="Search Note"
                    onChangeText={(text) => handleSearch(text)}
                    style={{ marginVertical: 7, borderRadius: 50, }}
                />
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text style={styles.greetingText}>Good {greeting} {userInfo.fName}</Text>
                </View>
                {wordFound ?
                    <View style={styles.wordNotFounf}>
                        <FontAwesomeIcon icon={faFaceSadTear} color="white" size={90} />
                        <Text style={{ fontSize: 20, marginTop: 20 }}>Result Not Found</Text>
                    </View> :
                    <FlatList data={histories} renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.singleNote}
                                key={item.docId}
                                onLongPress={() => Alert.alert(
                                    'Delet Note',
                                    'Are you sure you want to delete this note?',
                                    [{ text: 'Yes' }, { text: 'No' }]
                                )}
                            >
                                <Text style={styles.title}>{item.name}</Text>
                                <View style={styles.body}>
                                    <Text style={styles.content}>Transaction Type: {item.transactionType}</Text>
                                    <Text style={styles.content}>Amount: {item.amount}</Text>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.date}>Date: {item.date}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }} key={({ item }) => { item.docId }} />}
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
    },
    wordNotFounf: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        opacity: 0.5,
        zIndex: -1,
    }
})