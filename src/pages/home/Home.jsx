import PokemonList from "../../components/pokemon-list/PokemonList";
import Filter from "../../components/input/filter/Filter";
import Search from "../../components/input/search/Search";
import "./home.css";

const Home = () => {
  return (
    <section className="home-page-container">
      <div className="input-container">
        <Search />
        <Filter />
      </div>
      <PokemonList />
    </section>
  );
};

export default Home;
