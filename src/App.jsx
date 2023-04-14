import "./App.css";
import { Routes, Route }  from "react-router-dom";

import Header from './components/header/Header';
import Home from "./pages/home/Home";
import PokemonSingle from "./pages/pokemon-single/PokemonSingle";

const App = () => {
  return <main className="main-container">
    <Routes>
      <Route exact path="/" element={<Header />}>
        <Route index element={<Home />}/>
        <Route path="/:name" element={<PokemonSingle />}/>
      </Route>  
    </Routes>
  </main>;
};

export default App;
