import { useState,useContext} from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { Button, TextInput, } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

export function Intro({ navigation }) {
    const [text2, setText] = useState("kjbkdjfnkjnkjdfnj f dkjfkjdnfkk fkjdfkj d fdkj");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <View style={styles.container}>
            <TextInput
                label="Email"
                multiline={true}
                // numberOfLines={}
                value={text2}
                onChangeText={text => text + text2}
            />
            <TextInput
                label="Passsord"
                onChangeText={text => setText(text)}
                style={{width:399,}}
            />
        

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#372948',
    },
});
