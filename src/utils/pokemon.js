// すべてのポケモンデータを取得する関数
export const getAllPokemon = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => resolve(data));
    });
};

// 取ってきたすべてのポケモンデータのひとつのポケモンデータを
// 取ってきたURLからあるひとつのポケモンのデータを取得する
export const getPokemon = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                resolve(data);
            });
    });
};
