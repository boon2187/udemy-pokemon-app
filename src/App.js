import { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import './App.css';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';

function App() {
  // ポケモンAPIのベースURL
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  // ロード中の状態を保持するステート
  const [loading, setLoading] = useState(true);
  // ポケモンデータ（２０匹分入る）を取っておくステート
  const [pokemonData, setPokemonData] = useState([]);
  // 次のポケモンデータのURL
  const [nextURL, setNextURL] = useState("");
  // 前のポケモンデータのURL
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    // ページ読み込み時に発火して、ポケモンデータをapiから取ってくる関数を定義
    const fetchPokemonData = async () => {
      // まず、全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 取ってきた全ポケモンデータ（２０個）から
      // 各ポケモンの詳細なデータを取得する
      loadPokemon(res.results);
      // console.log(res.next);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    // で、発火時に↑それを読み出す
    fetchPokemonData();
  }, []);

  // 各ポケモンの詳細なデータをfetchする関数
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon);
        // 各ポケモンデータのURL（pokemon.url）を抜き取りそこから
        // 一匹のポケモンデータを取得する
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    )
    // 取ってきたポケモンデータをデータ保持用のステートに保存
    setPokemonData(_pokemonData);
  };

  // console.log(pokemonData);
  // 次の２０匹のデータを取ってくる
  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    // console.log(data);
    await loadPokemon(data.results);
    // 次の２０匹のURLをセット
    setNextURL(data.next);
    // 前の２０匹のURLをセット
    setPrevURL(data.previous);
    setLoading(false);
  };

  // 前の２０匹のポケモンデータを読み込む
  const handlePrevPage = async () => {
    setLoading(true);
    // null回避
    if (!prevURL) {
      setLoading(false);
      return;
    }
    // 前のデータの読み込み
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
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