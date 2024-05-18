import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getPokemonDetails } from '../services/api';

export default function PokemonDetailScreen({ route }) {
  const { pokemon } = route.params;




  if (!pokemon) {
    return <Text>Loading...</Text>;
  }
  else{
    console.log(pokemon);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pokemon.name}</Text>
      <Image
        style={styles.image}
        source={{ uri: pokemon.sprites.front_default }}
      />
      <Text>Height: {pokemon.height}</Text>
      <Text>Weight: {pokemon.weight}</Text>
      <Text>Base Experience: {pokemon.base_experience}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});
