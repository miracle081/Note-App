import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button } from 'react-native-paper';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { AppContext } from '../Globals/Appcontext';

export function TransactionSummary({ navigation, route }) {
  const { saveHistory, balance } = route.params
  const { userUID } = useContext(AppContext);
  const [moneySend, setMoneySend] = useState(true);
  const [load, setLoad] = useState(false);


  const addHistory = async () => {
    setLoad(true)
    await updateDoc(doc(db, "users", userUID), {
      balance: balance - saveHistory.amount,
    })
    await addDoc(collection(db, "history"), saveHistory)
      .then(() => {
        setLoad(false)
        navigation.reset({ index: 0, routes: [{ name: "TransactionSummary",}] })
      })
      .catch(e => {
        alert(e)
      })
  }
  // if (moneySend) {
  //   addHistory()
  //   setMoneySend(false);
  // }

  return (
    <View>
      <Text>Save Transaction history</Text>
      <Button mode='contained'
        loading={load}
        onPress={addHistory}
        icon={'plus'}
      >
        Save
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({})