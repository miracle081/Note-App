import { NavigationContainer } from '@react-navigation/native';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { AuthNaviator } from './App/Components/Navigator';
import { AddNote } from './App/Screens/AddNote';  

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <AuthNaviator />
      </NavigationContainer>
      {/* <AddNote/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop:Platform.OS === 'android' ? StatusBar.currentHeight : null
  },
});
