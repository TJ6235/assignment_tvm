
import { StyleSheet} from 'react-native';
import LandingScreen from './components/LandingScreen';
import ServiceListpage from './components/ServiceListpage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="servicespage" screenOptions={{ headerShown: false}}>
      <Stack.Screen name="landingscreen" component={LandingScreen} /> 
      <Stack.Screen name="servicespage" component={ServiceListpage} /> 
    </Stack.Navigator>
  </NavigationContainer>
  )
}

const styles = StyleSheet.create({
 
});
