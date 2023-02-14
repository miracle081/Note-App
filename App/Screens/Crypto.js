import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { faDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { AppContext } from '../Globals/Appcontext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Button } from 'react-native-paper';

export default function Crypto({ navigation }) {
  const { userUID, setSelectedCoin } = useContext(AppContext);
  const [allData, setAllData] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [cryptoWallet, setCryptoWallet] = useState([]);



  setInterval(() => {
    setRefresh(Math.random())
  }, 5000);

  onSnapshot(doc(db, "users", userUID), (doc) => {
    let info = doc.data()
    setUserInfo(doc.data());
    // setCryptoWallet(Number(info.ethereum) + Number(info.bitcoin) + Number(info.litecoin) + Number(info.dogecoin) + Number(info.tether) + Number(info.cardano))
  })
  useEffect(() => {
    const getList = async () => {

      try {
        const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Clitecoin%2Ctether%2Ccardano%2Cdogecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false";
        const response = await fetch(url);
        const data = await response.json();
        const coins = Object.getOwnPropertyNames(data);
        setAllData(data)
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
      console.log(refresh);
    }
     getList();
  }, []);

  function wallet(singleCoin, coinValue) {
    let dbCoin, dbUsd;
    if (singleCoin == "bitcoin") {
      dbCoin = userInfo.bitcoin
      dbUsd = dbCoin * coinValue
      setCryptoWallet(dbUsd)
      if (userInfo.bitcoin <= !0) {
        return (
          <View style={styles.container3}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ fontSize: 13 }}>{dbCoin}</Text>
            </View>
            <Text style={styles.date}>${dbUsd}</Text>
          </View>
        )
      }
    }
    else if (singleCoin == "ethereum") {
      dbCoin = userInfo.ethereum
      dbUsd = dbCoin * coinValue
      setCryptoWallet(dbUsd)
      if (userInfo.ethereum <= !0) {
        return (
          <View style={styles.container3}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ fontSize: 13 }}>{dbCoin}</Text>
            </View>
            <Text style={styles.date}>${dbUsd}</Text>
          </View>
        )
      }
    }
    else if (singleCoin == "cardano") {
      dbCoin = userInfo.cardano
      dbUsd = dbCoin * coinValue
      setCryptoWallet(dbUsd)
      if (userInfo.cardano <= !0) {
        return (
          <View style={styles.container3}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ fontSize: 13 }}>{dbCoin}</Text>
            </View>
            <Text style={styles.date}>${dbUsd}</Text>
          </View>
        )
      }
    }
    else if (singleCoin == "tether") {
      dbCoin = userInfo.tether
      dbUsd = dbCoin * coinValue
      setCryptoWallet(dbUsd)
      if (userInfo.tether <= !0) {
        return (
          <View style={styles.container3}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ fontSize: 13 }}>{dbCoin}</Text>
            </View>
            <Text style={styles.date}>${dbUsd}</Text>
          </View>
        )
      }
    }
    else if (singleCoin == "dogecoin") {
      dbCoin = userInfo.dogecoin
      dbUsd = dbCoin * coinValue
      setCryptoWallet(dbUsd)
      if (userInfo.dogecoin <= !0) {
        return (
          <View style={styles.container3}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ fontSize: 13 }}>{dbCoin}</Text>
            </View>
            <Text style={styles.date}>${dbUsd}</Text>
          </View>
        )
      }
    }
    else if (singleCoin == "litecoin") {
      dbCoin = userInfo.litecoin
      dbUsd = dbCoin * coinValue
      setCryptoWallet(dbUsd)
      if (userInfo.litecoin <= !0) {
        return (
          <View style={styles.container3}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ fontSize: 13 }}>{dbCoin}</Text>
            </View>
            <Text style={styles.date}>${dbUsd}</Text>
          </View>
        )
      }
    }
    else {
      return null
    }
  }


  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: "row", backgroundColor: 'white', padding: 20, margin: 10,
        borderWidth: 2, borderColor: 'gray', borderRadius: 10,
      }}>
        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Wallet: </Text>
        <Text style={[styles.price, { fontSize: 20, fontWeight: 'bold', }]}>${cryptoWallet}</Text>
      </View>
      <FlatList data={allData} renderItem={({ item }) => {
        let coinName = item.id
        return (
          <TouchableOpacity
            onPress={() => {
              setSelectedCoin(coinName)
              navigation.navigate("BuyCoin");
            }}
            style={styles.container2}>
            <View style={styles.holder}>
              <Image style={styles.img} source={{ uri: item.image }} />
              <View style={styles.pdetails}>
                <Text style={styles.pName}>{item.id}</Text>
                <View style={styles}>
                  <Text style={styles.price}>${item.current_price}</Text>
                  <Text style={{ fontSize: 17, color: item.price_change_percentage_24h >= 0 ? "green" : "red" }}>
                    {item.price_change_percentage_24h.toFixed(2)}%
                  </Text>
                </View>
              </View>
            </View>
            {/* <Button mode='contained' onPress={() => {
              setSelectedCoin(coinName)
              navigation.navigate("SellCoin");
            }}>s</Button> */}
            {wallet(item.id, item.current_price)}
          </TouchableOpacity>
        );
      }} key={({ item }) => { item.id }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    justifyContent: 'center',
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 4,
    marginHorizontal: 7
  },
  holder: {
    flexDirection: 'row',
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(128, 128, 128, 0.590)',
    borderRadius: 10,
    marginTop: 5,
  },
  pdetails: {
    justifyContent: 'center',
    paddingStart: 5
  },
  pName: {
    fontSize: 25,
    textTransform: 'capitalize',
  },
  price: {
    fontSize: 18,
    fontFamily: 'RozhaOne_400Regular'
  },
  container3: {
    marginTop: 2,
    justifyContent: 'center',
    textAlign: 'center'
  },
  xmark: {
    borderWidth: 1,
    borderColor: 'rgba(150, 0, 0, 0.590)',
    paddingHorizontal: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(128, 128, 128, 0.499)'
  },
  data: {
    fontSize: 10
  }
})