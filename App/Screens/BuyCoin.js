import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-native-paper';
import { AppContext } from '../Globals/Appcontext';
import { doc, onSnapshot, runTransaction, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from 'react-native-web';

export default function BuyCoin({ navigation }) {
    const { userUID, selectedCoin } = useContext(AppContext);
    const [coin, setCoin] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [coinValue, setCoinValue] = useState("");
    const [amount, setAmount] = useState(0);
    const getList = async () => {

        try {
            const url = `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCoin}&vs_currencies=usd&include_24hr_change=true`;
            const response = await fetch(url);
            const data = await response.json();
            const coins = Object.getOwnPropertyNames(data);
            const coinInfo = data[`${coins}`];
            setCoin({
                id: coins[0],
                usd: coinInfo.usd,
                change: coinInfo.usd_24h_change,
            })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        onSnapshot(doc(db, "users", userUID), (doc) => {
            setUserInfo(doc.data());
        })
        getList();
    }, []);

    const buyCoin = async () => {
        let feild;
        if (selectedCoin == "bitcoin") {
            feild = {
                bitcoin: Number(userInfo.bitcoin) + coinValue,
                balance: Number(userInfo.balance) - amount
            }
        }
        if (selectedCoin == "ethereum") {
            feild = {
                ethereum: Number(userInfo.ethereum) + coinValue,
                balance: Number(userInfo.balance) - amount
            }
        }
        if (selectedCoin == "cardano") {
            feild = {
                cardano: Number(userInfo.cardano) + coinValue,
                balance: Number(userInfo.balance) - amount
            }
        }
        if (selectedCoin == "tether") {
            feild = {
                tether: Number(userInfo.tether) + coinValue,
                balance: Number(userInfo.balance) - amount
            }
        }
        if (selectedCoin == "dogecoin") {
            feild = {
                dogecoin: Number(userInfo.dogecoin) + coinValue,
                balance: Number(userInfo.balance) - amount
            }
        }
        if (selectedCoin == "litecoin") {
            feild = {
                litecoin: Number(userInfo.litecoin) + coinValue,
                balance: Number(userInfo.balance) - amount
            }
        }

        if (amount > userInfo.balance) {
            alert('Insuficient found')
        }
        else {
            const sfDocRef = doc(db, "users", userUID);
            try {
                await runTransaction(db, async (transaction) => {
                    transaction.update(sfDocRef, feild);
                });
                alert("Done");
                // navigation.goBack()
                navigation.reset({ index: 0, routes: [{ name: "BuyCoin", }] })
            } catch (e) {
                // This will be a "population is too big" error.
                console.error(e);
            }
        }
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate(Crypto)}><FontAwesomeIcon
                icon={faArrowLeft}
                color={"blue"}
                size={25}
            />
            </TouchableOpacity>
            <View style={styles.overlay}>
                <Text style={styles.header}>Buy Coin</Text>
                <View>
                    <Text style={styles.last}>{selectedCoin}</Text>
                    <Text style={styles.last}>${coin.usd}</Text>
                    <Text style={styles.last}>{coin.change}</Text>
                    <Button mode='contained' onPress={() => navigation.navigate("SellCoin")}>Sell Cion</Button>
                </View>
                <TextInput
                    label="Amount"
                    // onChangeText={text => setAmount(Number(text))}
                    underlineColor="none"
                    activeUnderlineColor='none'
                    style={styles.input}
                    keyboardType="number-pad"
                    value={coinValue}
                />
                <TextInput
                    label="Amount"
                    onChangeText={text => {
                        setAmount(Number(text))
                        setCoinValue(Number(text) / Number(coin.usd))
                    }}
                    underlineColor="none"
                    activeUnderlineColor='none'
                    style={styles.input}
                    keyboardType="number-pad"
                // value={amount}
                />
                <Button mode='contained' onPress={buyCoin}>Buy</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    overlay: {
        padding: 25,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#0000005e"
    },
    header: {
        color: "white",
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        width: '100%',
        marginBottom: 20,
        backgroundColor: 'transpirent',
        backgroundColor: "rgba(2, 2, 2, 0.272)",
        color: 'white',
        fontSize: 17,
        padding: 10,
    },
    last: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 17,
    }
})