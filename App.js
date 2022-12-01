import { NavigationContainer } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { AuthNaviator } from './App/Components/Navigator';
import { VTU } from './VTU';  

export default function App() {
  return (
    <KeyboardAvoidingView {...(Platform.OS === 'ios' ? { behavior: 60 } : {})} style={styles.container}>
      {/* <NavigationContainer>
        <AuthNaviator />
      </NavigationContainer> */}
      <VTU/>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop:Platform.OS === 'android' ? StatusBar.currentHeight : null
  },
});
