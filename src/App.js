import { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import './App.css';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';

function App() {
  // ポケモンAPIのベースURL
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  // 次のポケモンデータのURL
  const [nextURL, setNextURL] = useState("");
  // 前のポケモンデータのURL
  const [prevURL, setPrevURL] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細なデータを取得する
      loadPokemon(res.results);
      // console.log(res.next);
      setNextURL(res.next);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  // 各ポケモンの詳細なデータをfetchする関数
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    )
    setPokemonData(_pokemonData);
  };

  // console.log(pokemonData);

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    // console.log(data);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };
  const handlePrevPage = async () => {
    setLoading(true);
    if (prevURL !== null) {
      let data = await getAllPokemon(prevURL);
      await loadPokemon(data.results);
      setNextURL(data.next);
      setPrevURL(data.previous);
      setLoading(false);
    }
  };
 
  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中...</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage} >前へ</button>
              <button onClick={handleNextPage} >次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;