import "./search.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../../features/pokemons/pokemonsSlice"

const Search = () => {

  const { searchTerm }  = useSelector(state=> state.pokemon ) 
  const dispatch = useDispatch();

  const handleInputValueChange =  (e) => {
    dispatch(setSearchTerm(e.target.value.toLowerCase()))
  }

  return (
    <section className="search-container">
      <div className="search-icon">
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>

      <input
        type="text"
        placeholder="Search for a pokemon"
        className="search-input"
        onChange={handleInputValueChange}
        value={searchTerm}
      />
    </section>
  );
};

export default Search;
