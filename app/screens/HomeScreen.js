import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { getPokemons, getPokemonDetails } from '../services/api';
import PokemonItem from '../components/PokemonItem';

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [loadedPokemons, setLoadedPokemons] = useState([]);

  useEffect(() => {
    getPokemons().then(data => {
      setPokemons(data.results);
      loadPokemonDetails(data.results);
    });
  }, []);

  const loadPokemonDetails = (pokemons) => {
    Promise.all(pokemons.map(pokemon => getPokemonDetails(pokemon.url)))
      .then(details => setLoadedPokemons(details));
  };

  const filteredPokemons = loadedPokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Pokémon"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredPokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PokemonItem
            pokemon={item}
            onPress={() => navigation.navigate('PokemonDetail', { pokemon: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});
