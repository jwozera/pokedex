import "./pokemon-list.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { listPokemons, searchByType, searchByName, listDetails } from "../../features/pokemons/pokemonsAction";
import { Link, useParams } from "react-router-dom";
import { setCurrentPage } from "../../features/pokemons/pokemonsSlice"

// import { reset } from "../../features/pokemons/pokemonsAction";

const PokemonList = () => {
  const { 
    pokemonsData,
    currentPokemon,
    pokemonsDataDetails,
    loading,
    type,
    searchTerm,
    currentPage
  } = useSelector((state) => {   
      return state.pokemon
    }
  );

  const dispatch = useDispatch();
  const handleDetails = (pokemons) => {

    return pokemons.forEach(pokemon => {
          // if(!pokemonsDataDetails.some( detail => detail.name === pokemon.name)){
            dispatch(listDetails(pokemon.name))
          // }
        })
    };

  useEffect(()=> {
    try {
      if(searchTerm === "" && type === "") {
        dispatch(listPokemons())
          .unwrap()
          .then((pokemons) => handleDetails(pokemons.results))
      } else if(searchTerm !== "") {
        dispatch(searchByName(searchTerm))
      } 
    }
    catch (error) {
        console.log(error);
    }
  }, [type, searchTerm]) 

  useEffect(()=> {
    if(type !== "") {
      dispatch(searchByType({type, page: currentPage}))
        .then((response) => {
          console.log(response)
          const pokemonByType = response.payload.map( poke => { return {name: poke.pokemon.name, url: poke.pokemon.url} })
          handleDetails(pokemonByType)
        })
    }
  }, [type])

  const currentImage = currentPokemon ? currentPokemon.sprites?.other['official-artwork'].front_default : '';

  return (
   
    <section className="pokemon-container">
      { loading ?  (<h1>loading...</h1>) : 
        searchTerm && currentPokemon?.name ? (
            <Link
              to={currentPokemon?.name}
              // onClick={() => console.log( dispatch(searchByName(pokemon.name)))}
              className="pokemon-card"
            >
              <div className="pokemon-content">
              <h3 className="pokemon-name">{currentPokemon?.name}</h3>
              <img  className="pokemon-image" src={currentImage} alt={currentPokemon?.name} />
              </div>
            </Link>
        ) : (
          pokemonsData?.results?.length > 0 && pokemonsData.results.map((pokemon, i) => {
            let details = pokemonsDataDetails.filter( detail => detail.name === pokemon.name)[0];

            const detailsImage = details?.sprites?.other['official-artwork'].front_default;

            return ( 
              <Link
                key={i}
                to={pokemon.name}
                // onClick={() => console.log( dispatch(searchByName(pokemon.name)))}
                className="pokemon-card"
              >
                <div className="pokemon-content">
                  <h3 className="pokemon-name">{pokemon.name}</h3>
                  <img className="pokemon-image" src={detailsImage} alt={pokemon.name} />
                </div>
              </Link>)
          })
      ) } 
    </section>
  );
};

export default PokemonList;
