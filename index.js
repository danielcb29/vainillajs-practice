const apiKey = '6dc0d2605088c01254ffedbd444bc2e4';
const imageUrl = 'http://image.tmdb.org/t/p/w300/';

const getMovies = () => {
    return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`).then(movies => {
        return movies.json();
    });
};


const loadMovies = () => {
    const createMovieImage = (divImage, element) => {
        const image = document.createElement('img');
        image.setAttribute('src', `${imageUrl}${element.backdrop_path}`);
        divImage.className = 'movie-image';
        divImage.appendChild(image);
    };

    const createMovieContent = (divContent, element) => {
        //Title
        const divTitle = document.createElement('h2');
        const titleText = document.createTextNode(element.title);
        divTitle.appendChild(titleText);

        //Overview
        const divOverview = document.createElement('p');
        divOverview.className = 'movie-overview';
        const overviewText = document.createTextNode(element.overview);
        divOverview.appendChild(overviewText);

        divContent.className = 'movie-content';
        //Add elements to divContent
        divContent.appendChild(divTitle);
        divContent.appendChild(divOverview);
    };

    let currentMovies = null;
    const listContainer = document.getElementById('container');
    
    getMovies().then(response => {
        listContainer.innerHTML = '';
        currentMovies = response.results;
        currentMovies.forEach(element => {
            const div = document.createElement('div');
            div.className = 'movie';
    
            const divContent = document.createElement('div');
            const divImage = document.createElement('div');
    
            createMovieImage(divImage, element);
            createMovieContent(divContent, element);
    
            //Add childs to div
            div.appendChild(divImage);
            div.appendChild(divContent);

            // Add current div to container
            listContainer.appendChild(div);
        });
    });
};


const main = () => {
    loadMovies();
}

main();