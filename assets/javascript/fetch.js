
// Fetch movies with queries
function fetchMovies(query) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + apiAccessToken
        }
    };

    return fetch('https://api.themoviedb.org/3/' + query, options)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(err => console.error(err));
}

// Fetch details for one movie based on it's ID
function fetchMovieDetails(movieId) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + apiAccessToken
        }
    };

    // The different fetch requests
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
    const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
    const movieVideoUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos`;

    // Fetch all requests at the same time
    return Promise.all([
        fetch(movieDetailsUrl, options).then(response => response.json()),
        fetch(movieCreditsUrl, options).then(response => response.json()),
        fetch(movieVideoUrl, options).then(response => response.json()),
    ])
        .then(([movieDetails, movieCredits, movieVideoUrl]) => {
            return {
                movieDetails,
                movieCredits,
                movieVideoUrl
            };
        })
        .catch(err => console.error(err));
}