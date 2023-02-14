import { useState, useContext, useEffect } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Button, Modal, Portal, Provider, TextInput, } from 'react-native-paper';
import { db } from '../../services/firebase';
import { addDoc, collection, doc, onSnapshot, query, runTransaction, updateDoc, where } from 'firebase/firestore';
import { updateDoc as userUpdate, doc as userDoc } from 'firebase/firestore';
import { AppContext } from '../Globals/Appcontext';
import { async } from '@firebase/util';

export function Transfer({ navigation }) {
    const { userUID } = useContext(AppContext);
    const [userInfo, setUserInfo] = useState("");
    const [message, setMessage] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [load, setLoad] = useState(false);
    const [moneySend, setMoneySend] = useState(false);
    const [userName, setUserName] = useState("");
    const [amount, setAmount] = useState("");
    const [reciever, setReciever] = useState({ fName: '', lName: '', balance: '' });


    onSnapshot(doc(db, "users", userUID), (doc) => {
        setUserInfo(doc.data());
    })


    function checkReciever() {
        const q = collection(db, 'users');
        const filter = query(q, where('userName', '==', userName));

        onSnapshot(filter, (onSnap) => {
            const allUser = [];
            onSnap.forEach(item => {
                const itemData = item.data();
                allUser.push(itemData);
            })
            if (allUser.length === 1) {
                setReciever(allUser[0]);
                setMessage("")
                setDisabled(false)
                setMoneySend(false)
            } else {
                setMessage("username does not exist")
                setReciever('');
                setMoneySend(false)
                setDisabled(true)
            }
        }, []);

    }




    const userDiduction = async () => {
        const sfDocRef = doc(db, "users", userUID);
        try {
            const newPopulation = await runTransaction(db, async (transaction) => {
                const sfDoc = await transaction.get(sfDocRef);
                if (!sfDoc.exists()) {
                    throw "Document does not exist!";
                }

                const newPop = sfDoc.data().balance - amount;
                const q = transaction.update(sfDocRef, { balance: newPop });
                alert("Done");
                navigation.reset({ index: 0, routes: [{ name: "Transfer", }] })
                navigation.navigate("HomeScreen")
            });

            console.log("Population increased to ", newPopulation);
        } catch (e) {
            // This will be a "population is too big" error.
            console.error(e);
        }
    }
    const sendMoney = async () => {
        const newRecieverBalance = Number(reciever.balance) + amount
        setLoad(true)
        if (reciever.userName == userInfo.userName) {
            alert('You cant transfar money to yourself')
        }
        else {
            if (amount > userInfo.balance) {
                alert('Insuficient found')
            }
            else {
                updateDoc(doc(db, "users", reciever.uid), {
                    balance: newRecieverBalance,
                })
                    .then(() => {
                        addDoc(collection(db, "history"), {
                            userID: reciever.uid,
                            id: new Date().getTime(),
                            status: "Successful",
                            transactionType: 'Credit',
                            name: `${userInfo.fName} ${userInfo.lName}`,
                            amount: amount,
                            date: new Date().toLocaleString()
                        })
                            .then(() => {
                                addDoc(collection(db, "history"), {
                                    userID: userInfo.uid,
                                    id: new Date().getTime(),
                                    status: "Successful",
                                    transactionType: 'Debit',
                                    name: `${reciever.fName} ${reciever.lName}`,
                                    amount: amount,
                                    date: new Date().toLocaleString()
                                })
                                    .then(() => {
                                        userDiduction()
                                    })
                            })
                            .catch(e => {
                                alert(e)
                            })
                    })
                    .catch(() => {
                        Alert.alert('Error', 'An unknown error occured while saving this post')
                    })

            }
        }
    }

    // if (moneySend) {
    //     setMoneySend(false)
    //     checkReciever()
    // }

    return (
        <ImageBackground style={styles.container}>
            <View style={styles.overlay}>
                <Text style={styles.header}>Send Money</Text>
                <TextInput
                    label="Reciever's username"
                    onChangeText={text => {
                        setUserName(text);
                        text == "" ? setDisabledBtn(true) : setDisabledBtn(false)
                    }}
                    underlineColor="none"
                    activeUnderlineColor='none'
                    style={styles.input}
                />
                <Button mode='contained' disabled={disabledBtn} onPress={checkReciever}>Comfirm Reciever</Button>

                {!message == "" ?
                    <Text style={{ color: 'red', fontSize: 20, fontStyle: 'italic' }}>{message}</Text> : null
                }
                {!reciever.fName == "" ?
                    <Text style={{ color: 'white', fontSize: 25, }}>{!reciever.fName == "" ? reciever.fName : null} {!reciever.lName == "" ? reciever.lName : null}</Text>
                    : null
                }

                <TextInput
                    label="Amount"
                    onChangeText={text => setAmount(Number(text))}
                    underlineColor="none"
                    activeUnderlineColor='none'
                    style={[styles.input, { marginTop: 10 }]}
                    keyboardType="number-pad"
                    disabled={disabled}
                />
                <Button loading={load} mode='contained'
                    disabled={disabled} onPress={sendMoney}
                >Send</Button>

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
