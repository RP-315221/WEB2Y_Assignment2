import React from "react";
import { Routes, Route } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";


const App = () => {
  return (
    <>
      
    <Routes>
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
        <Route exact path="/pokemon" element={<PokemonList />} />
        <Route exact path="/" element={<PokemonList />} />
      </Routes></>

  );
};



export default App;
