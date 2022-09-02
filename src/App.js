import { useEffect } from 'react';
import { getAllPokemon } from './utils/pokemon';
import './App.css';

function App() {
  // ポケモンAPIのベースURL
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      console.log(res);
    };
    fetchPokemonData();
  }, []);


  return (
    <div className="App"></div>
  );
}

export default App;