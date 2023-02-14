import { useState, useContext, useEffect } from 'react';
import { ActivityIndicator, Alert, ImageBackground, StyleSheet, Text, View, } from 'react-native';
import { Button, TextInput, } from 'react-native-paper';
import { AppContext } from '../Globals/Appcontext';

export function Active({ navigation, route }) {

    const { setUserUID } = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [word, setWord] = useState(false);
    const [icon, setIcon] = useState("eye");
    const [state, setState] = useState("Submit");


    return (
        <ImageBackground source={require('../../assets/15.jpg')} style={styles.container}>
            <View style={styles.overlay}>
                <Text style={styles.header}>Sign In</Text>
                <TextInput
                    label="Email"
                    onChangeText={text => setEmail(text)}
                    underlineColor="none"
                    activeUnderlineColor='none'
                    keyboardType='email-address'
                    style={styles.input}
                />
                <Button mode='contained' icon={''} loading={word} 
                    onPress={() => {
                        if (word === false) {
                            setWord(true);
                            setState("Processing")
                        } else {
                            setWord(false)
                            setState("Submit")
                        }
                    }}
                >
                    {state}
                    {/* <ActivityIndicator size={20} /> */}
                </Button>
                
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
