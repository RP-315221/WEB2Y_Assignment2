import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/pokemonList.css";
import axios from "axios";

const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [prevPageUrl, setPrevPageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const getPokemonList = async () => {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=12");
    const { results } = response.data;
    setNextPageUrl(response.data.next);
    setPrevPageUrl(response.data.previous);
    const pokemonList = results.map((result, index) => {
      const paddedIndex = ("00" + (index + 1)).slice(-3);
      const urlSplit = result.url.split("/");
      const id = urlSplit[urlSplit.length - 2];
      const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;

      return { id, name: result.name, imageUrl };
    });
    setPokemonData(pokemonList);
  };

  const goToNextPage = () => {
    fetch(nextPageUrl)
      .then((res) => res.json())
      .then(async (data) => {
        const results = data.results;
        const pokemonList = await Promise.all(
          results.map(async (result) => {
            const id = result.url.split("/")[6];
            const response = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${id}`
            );
            const imageUrl = response.data.sprites.front_default;
            return { id, name: result.name, imageUrl };
          })
        );
        setPokemonData(pokemonList);
        setNextPageUrl(data.next);
        setPrevPageUrl(data.previous);
      });
  };
  

  const goToPrevPage = () => {
    fetch(prevPageUrl)
      .then((res) => res.json())
      .then(async (data) => {
        const results = data.results;
        const pokemonList = await Promise.all(
          results.map(async (result) => {
            const id = result.url.split("/")[6];
            const response = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${id}`
            );
            const imageUrl = response.data.sprites.front_default;
            return { id, name: result.name, imageUrl };
          })
        );
        setPokemonData(pokemonList);
        setNextPageUrl(data.next);
        setPrevPageUrl(data.previous);
      });
  };
  

  useEffect(() => {
    setLoading(true);
    getPokemonList();
    setLoading(false);
  }, [location]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <header className="pokemon-list-header">
      <img class="logo" src={require('../utils/Logo.png')} alt="logo" />
      </header>
      <div className="pokemon-list">
        {pokemonData && pokemonData.map((pokemon) => (
          <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                pokemon.id
              }.png`}
              alt={pokemon.name}
            />
            <p>{pokemon.name}</p>
          </Link>
        ))}
      </div>
      <div class="button-row">
        <img class="buttons" src={require('../utils/left.png')} alt="leftArrow" onClick={goToPrevPage}/>
        <p></p>
        <img class="buttons" src={require('../utils/right.png')} alt="rightArrow" onClick={goToNextPage}/>
      </div>
    </div>
  );
};

export default PokemonList;
