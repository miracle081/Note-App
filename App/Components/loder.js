import { useState, useContext, useEffect } from 'react';
import { StyleSheet,View, } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

export function Loader() {

    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <AnimatedLottieView source={require('../../assets/loader.json')} autoPlay loop/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
       justifyContent:'center',
       alignItems:'center',
       backgroundColor:'#0000001a',
       zIndex:2
    },
});
