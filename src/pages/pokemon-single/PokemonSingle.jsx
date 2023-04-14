import "./pokemon-single.css";
import { useEffect } from "react";
import {  Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchByName } from "../../features/pokemons/pokemonsAction";

const PokemonDetail = () => {
  const { error, currentPokemon }  = useSelector(
    (state) => state.pokemon
  );
  const dispatch = useDispatch();
  const params = useParams();
  const { name } = params;

  useEffect(() => {
    dispatch(searchByName(name))

    if(error) {
      console.log(error)
    }
  }, [])

  

  const { sprites, height, weight, types, abilities, stats } = currentPokemon;
  <img src={sprites?.other['dream_world'].front_default} alt={name} />
  
  console.log(types);

  return (
    <section className="pokemon-detail-container">
      <Link className="back-button" to="/">
        <i className="fa-solid fa-arrow-left"></i> Back
      </Link>

      <div className="pokemon-detail-content">
        <img src={sprites?.other?.['official-artwork'].front_default} alt={name} />

          <div className="pokemon-detail-right">
            <h1>{name}</h1>
            
            <div className="details">
              <div className="detail-left">
                <p>Height: {height}</p>
                <p>Weight: {weight}</p>
                <h2>Types:</h2>
                <ul>
                  {types?.map((type) => (
                    <li key={type?.slot}>{type?.type.name}</li>
                  ))}
                </ul>
                <h2>Stats:</h2>
                <ul>
                  {stats?.map((stat) => (
                    <li key={stat?.stat.name}>
                      <p>{stat?.stat.name}: {stat?.base_stat}</p>
                    </li>
                  ))}
                </ul> 
              </div>

              <div className="detail-right">

            
              </div>
            </div>
            <div className="abilities">
              <h2>Abilities:</h2>
                  <ul>
                    {abilities?.map((ability) => (
                      <li key={ability?.slot}>{ability?.ability.name}</li>
                    ))}
                  </ul>
              </div>
          </div>
        
      </div>

    </section>
  )
};

export default PokemonDetail;