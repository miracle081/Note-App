import { NavigationContainer } from '@react-navigation/native';
import { AuthNaviator } from './App/Components/Navigator';

export function Index() {
  return (
      <NavigationContainer>
        <AuthNaviator />
      </NavigationContainer>
  );
}

