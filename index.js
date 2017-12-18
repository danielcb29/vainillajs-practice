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
        const titleText = document.createTextNode(`${element.title}  `);
        const releaseDateContainer = document.createElement('small');
        const relaseDateText = document.createTextNode(`${element.release_date}`);
        releaseDateContainer.appendChild(relaseDateText);
        divTitle.appendChild(titleText);
        divTitle.appendChild(releaseDateContainer);

        //Overview
        const pOverview = document.createElement('p');
        pOverview.className = 'movie-overview';
        const overviewText = document.createTextNode(element.overview);
        pOverview.appendChild(overviewText);

        //Trailer button
        const divTrailerButton = document.createElement('div');
        divTrailerButton.className = 'btn trailer-button';
        divTrailerButton.setAttribute('movie-id', element.id);
        const buttonText = document.createTextNode('Trailer!');
        divTrailerButton.appendChild(buttonText);

        divContent.className = 'movie-content';
        //Add elements to divContent
        divContent.appendChild(divTitle);
        divContent.appendChild(pOverview);
        divContent.appendChild(divTrailerButton);
    };

    const createVideoModal = (divModal, element) => {
        divModal.id = `trailer-${element.id}`;
        divModal.className = 'modal';
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        const close = document.createElement('span');
        close.className = 'close-modal';
        close.innerHTML = '&times;';
        close.setAttribute('movie-id', element.id)

        const videoContent = document.createElement('div')
        const videoTitle = document.createElement('h3');
        videoTitle.innerHTML = element.title;
        const video = document.createElement('img');
        video.setAttribute('src',`${imageUrl}${element.poster_path}`);
        video.className = 'video-movie';
        videoContent.appendChild(videoTitle);
        videoContent.appendChild(video);

        modalContent.appendChild(close);
        modalContent.appendChild(videoContent);

        divModal.appendChild(modalContent);
    };

    const openVideo = (button) => {
        const movieId = button.getAttribute('movie-id');
        const modal = document.getElementById(`trailer-${movieId}`);
        modal.style.display = 'block';
    };

    const closeVideo = (modal) => {
        modal.style.display = 'none';
    };

    const setMovieOrder = (newOrder) => {

    };

    const movieOrder = 'up';

    getMovies().then(response => {
        const listContainer = document.getElementById('container');
        let currentMovies = null;

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

            // Video modal
            const divModal = document.createElement('div');
            createVideoModal(divModal, element);

            // Add current div to container
            listContainer.appendChild(divMovieData);
            listContainer.appendChild(divModal);
        });
    }).then(() => {
        const trailerButtons = document.getElementsByClassName('trailer-button');
        Array.from(trailerButtons).forEach(button => {
            button.onclick = event => {
                openVideo(button);
            }
        });
    }).then(() => {
        const closeButtons = document.getElementsByClassName('close-modal');
        Array.from(closeButtons).forEach(button => {
            const movieId = button.getAttribute('movie-id');
            const modal = document.getElementById(`trailer-${movieId}`);
            button.onclick = event => {    
                closeVideo(modal);
            };
        });
    }).then(() => {
        const orderButton = document.getElementById('release-order');
        orderButton.onclick = event => {

            setMovieOrder();
        };
    });
};


const main = () => {
    loadMovies();
}

main();