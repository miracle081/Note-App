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
            // const url = "https://api.coingecko.com/api/v3/coins/list";
            const url = "https://api.dictionaryapi.dev/api/v2/entries/en/miracle";
            const response = await fetch(url);
            const data = await response.json();
            // const { data } = await axios.get(url)
            // console.log(data[0].meanings[0].definitions);

            let newdata =data[0].meanings[0].definitions
            newdata.forEach(element => {
                // console.log(element);
                setAllData((pre) => [...pre, element])

            });

            // display.innerHTML += list.map(coin => (`
            //     <option value="${coin.id}">`))
            // const req = await axios.get('https://api.coingecko.com/api/v3/simple/supported_vs_currencies');
            // const cur = req.data;
            // curDis.innerHTML = cur.map(curr => (`<option>${curr}</option>`))
        } catch (error) {
            console.log(error);
        }
    }

    getList();

    return (
        <ImageBackground source={require('./assets/15.jpg')} style={styles.container}>
            <View style={styles.overlay}>
                {/* {
                    allData.map(item => {
                        return (
                            <>
                                <Text key={item.id}>keyboardType</Text>
                            </>
                        )
                    })
                } */}
                {/* <TextInput
                    label="Email"
                    onChangeText={text => setEmail(text)}
                    underlineColor="none"
                    activeUnderlineColor='none'
                    keyboardType='email-address'
                    style={styles.input}
                />
                <TextInput
                    underlineColor="none"
                    activeUnderlineColor='none'
                    label="Passsord"
                    secureTextEntry={word}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    right={<TextInput.Icon onPress={() => {
                        if (word === true) {
                            setWord(false)
                            setIcon("eye-off")
                        }
                        else {
                            setWord(true)
                            setIcon("eye")

                        }
                    }} icon={icon} />}
                /> */}

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
