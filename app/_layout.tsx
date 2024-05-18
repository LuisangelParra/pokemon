import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PokemonDetailScreen from './screens/PokemonDetailScreen';

const Stack = createStackNavigator();

function Layout() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Pokémon List' }} />
        <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen} options={{ title: 'Pokémon Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Layout;
