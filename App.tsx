
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/auth/Login';
import Register from './app/auth/Register';
import Home from './app/Home';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="auth">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ title: 'Connexion' }}
        />
        <Stack.Screen name="Register" component={Register}  options={{ title: 'Créer un compte' }} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
