import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignupScreen from './screens/SignupScreen';
import DrawerNavigator from './components/DrawerNavigator';
import InscriptionScreen from './screens/InscriptionScreen';
import CompetitionDetails from './screens/CompetitionDetails';
import EquipeDetails from './screens/EquipeDetails'; // Importez EquipeDetails

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignupScreen">
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="InscriptionScreen" component={InscriptionScreen} />
        <Stack.Screen 
          name="DrawerNavigator" 
          component={DrawerNavigator} 
          options={{ 
            headerShown: false,
          }}
        />
        <Stack.Screen name="CompetitionDetails" component={CompetitionDetails} />
        <Stack.Screen name="EquipeDetails" component={EquipeDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
