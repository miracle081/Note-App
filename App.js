import { LogBox, StatusBar, } from 'react-native';
import { Index } from './index';
import { AppProvider } from './App/Globals/Appcontext';
import { Active } from './App/Screens/Active';
import { Crypto } from './crypto';


LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage"]);

export default function App() {
  return (
    <AppProvider>
      {/* <Crypto /> */}
      <Index />
      <StatusBar barStyle={'light-content'} backgroundColor="black" />
    </AppProvider>
  );
}

