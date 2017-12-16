const apiKey = '6dc0d2605088c01254ffedbd444bc2e4';

const getMovies = () => {
    return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`).then(movies => {
        return movies.json();
    });
};

let currentMovies = null;
const listContainer = document.getElementById('movies-list');

getMovies().then(response => {
    currentMovies = response.results;
    currentMovies.map(element => element.title).forEach(element => {
        const currentLi = document.createElement('li');
        currentLi.className = 'movie-title';
        const currentLiText = document.createTextNode(element);
        currentLi.appendChild(currentLiText);
        listContainer.appendChild(currentLi);
    });
})


