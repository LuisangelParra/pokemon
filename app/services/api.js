const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const getPokemons = async () => {
  try {
    const response = await fetch(`${API_URL}?limit=100`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching pokemons:', error);
  }
};

export const getPokemonDetails = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error fetching pokemon details:', error);
  }
};

export const getAllPokemons = async () => {
  try {
    let allPokemons = [];
    let nextUrl = 'https://pokeapi.co/api/v2/pokemon';
    
    while (nextUrl) {
      const response = await fetch(nextUrl);
      const data = await response.json();
      allPokemons = [...allPokemons, ...data.results];
      nextUrl = data.next;
    }
    
    return allPokemons;
  } catch (error) {
    console.error('Error fetching pokemons:', error);
  }
};
