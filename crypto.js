import { useState, useContext } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Button, TextInput, } from 'react-native-paper';
// import axios from 'axios';

export function Crypto() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [allData, setAllData] = useState([]);


    const getList = async () => {

        try {
            const url = "https://api.freecurrencyapi.com/v1/currencies?apikey=CX7TNxkIMLNtz5G6YQnSDLFVoRORcWyykYamZ67f";
            const response = await fetch(url);
            const data = await response.json();
            setAllData(data)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    getList();

    return (
        <ImageBackground source={require('./assets/15.jpg')} style={styles.container}>
            <View style={styles.overlay}>

                <Button mode='contained'>Log In</Button>
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
        backgroundColor: "rgba(0,0,0,0.3)"
    },
    input: {
        width: '100%',
        borderRadius: 50,
        marginTop: 20,
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
        fontSize: 40,
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
