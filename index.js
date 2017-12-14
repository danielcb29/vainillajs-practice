const apiKey = '6dc0d2605088c01254ffedbd444bc2e4';

const getMovies = () => {
    return fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${apiKey}&language=en-US
    `).then(movies => {
        return movies.json();
    });
};

let currentMovies = null;
getMovies().then(response => {
    console.log(response);
    currentMovies = response;
})


let container = document.getElementById('container');