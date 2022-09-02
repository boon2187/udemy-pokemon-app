export const getAllPlkemon = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((res) => re.json())
            .then((data) => resolve(data));
    });
};