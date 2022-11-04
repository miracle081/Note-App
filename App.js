import { NavigationContainer } from '@react-navigation/native';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { AuthNaviator } from './App/Components/Navigator';
import { Intro } from './App/Screens/Intro';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      
      <NavigationContainer>
        <AuthNaviator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:Platform.OS === 'android' ? StatusBar.currentHeight : null
  },
});
