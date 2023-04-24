import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

const getPokemonList = async (limit = 20, offset = 0) => {
  const response = await axios.get(`${API_URL}/pokemon`, {
    params: {
      limit,
      offset,
    },
  });

  return response.data;
};

export default getPokemonList;
