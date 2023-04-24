import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/pokemonDetails.css'

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const navigate = useNavigate();
  const getPokemonDetails = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const { name, types, sprites, height, weight, abilities } = response.data;

    const pokemonDetails = {
      name,
      types: types.map((type) => type.type.name).join(", "),
      sprites,
      height,
      weight,
      abilities: abilities.map((ability) => ability.ability.name).join(", "),
    };

    setPokemon(pokemonDetails);
  };

  useEffect(() => {
    getPokemonDetails();
  }, [id]);

  return (
    <div className="container">
    <div className="pokemon-details">
      <h1>{pokemon.name}</h1>
      <div id="image-details-container">  
        <div id="img-container">
          {pokemon.sprites && <img className="pokemon-image" src={pokemon.sprites.front_default} alt={pokemon.name} />}
        </div>
        <div id="details-container">
          <p>Types: {pokemon.types}</p>
          <p>Abilities: {pokemon.abilities}</p>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </div>
      </div>
    </div>
    <img id="button" src={require('../utils/back.png')} alt="leftArrow" onClick={() => navigate(-1)}/>
    </div>
  );
};

export default PokemonDetails;
