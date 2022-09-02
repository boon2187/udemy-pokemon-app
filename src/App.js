import { useEffect } from 'react';
import './App.css';

function App() {
  // ポケモンAPIのベースURL
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPlkemon();
    };
  }, []);


  return (
    <div className="App"></div>
  );
}

export default App;