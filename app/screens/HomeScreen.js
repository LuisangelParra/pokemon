import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, Button } from 'react-native';
import { getPokemons, getAllPokemons, getPokemonDetails } from '../services/api';
import PokemonItem from '../components/PokemonItem';

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [loadedPokemons, setLoadedPokemons] = useState([]);
  const [visiblePokemons, setVisiblePokemons] = useState(20); // Número inicial de pokémones visibles

  useEffect(() => {
    getAllPokemons().then(data => {
      console.log(data);
      setPokemons(data);
      loadPokemonDetails(data);
    });
  }, []);

  const loadPokemonDetails = (pokemons) => {
    Promise.all(pokemons.map(pokemon => getPokemonDetails(pokemon.url)))
      .then(details => setLoadedPokemons(details));
  };

  const loadMorePokemons = () => {
    setVisiblePokemons(prevVisiblePokemons => prevVisiblePokemons + 20); // Cargar 20 pokémones más
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
        data={filteredPokemons.slice(0, visiblePokemons)} // Mostrar solo los pokémones visibles
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PokemonItem
            pokemon={item}
            onPress={() => navigation.navigate('PokemonDetail', { item })}
          />
        )}
      />
      <Button title="Load More" onPress={loadMorePokemons} />
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
