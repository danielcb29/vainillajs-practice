const apiKey = '6dc0d2605088c01254ffedbd444bc2e4';
const imageUrl = 'http://image.tmdb.org/t/p/w300/';
let isVideoOpen = false;

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
        const pOverview = document.createElement('p');
        pOverview.className = 'movie-overview';
        const overviewText = document.createTextNode(element.overview);
        pOverview.appendChild(overviewText);

        //Trailer button
        const divTrailerButton = document.createElement('div');
        divTrailerButton.className = 'trailer-button';
        const buttonText = document.createTextNode('Trailer!');
        divTrailerButton.appendChild(buttonText);

        divContent.className = 'movie-content';
        //Add elements to divContent
        divContent.appendChild(divTitle);
        divContent.appendChild(pOverview);
        divContent.appendChild(divTrailerButton);
    };

    let currentMovies = null;
    const listContainer = document.getElementById('container');
    
    getMovies().then(response => {
        listContainer.innerHTML = '';
        currentMovies = response.results;
        currentMovies.forEach(element => {
            const divMovieData = document.createElement('div');
            divMovieData.className = 'movie';
    
            const divContent = document.createElement('div');
            const divImage = document.createElement('div');
    
            createMovieImage(divImage, element);
            createMovieContent(divContent, element);
    
            //Add childs to div
            divMovieData.appendChild(divImage);
            divMovieData.appendChild(divContent);


            // // Trailer
            // const divTrailer = document.createElement('div');
            // divTrailer.className = 'movie-trailer';

            // Add current div to container
            listContainer.appendChild(divMovieData);
        });
    });
};

const openVideo = () => {
    if (!isVideoOpen) {

    } else {

    }
}


const main = () => {
    loadMovies();
}

main();