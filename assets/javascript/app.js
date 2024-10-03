// API ACCESS TOKEN //
let apiAccessToken = sessionStorage.getItem("API Access Token")
if (apiAccessToken == null) {
    apiAccessToken = prompt("Please paste an API Access Token to access the webpage")
    sessionStorage.setItem("API Access Token", apiAccessToken)
}
// --------------  //


const currentlyPlayingContainerEl = document.querySelector(".currentlyPlayingContainer")
const popularMoviesContainerEl = document.querySelector(".popularMoviesContainer")
const actionGenreContainerEl = document.querySelector(".actionContainer")
const comedyGenreContainerEl = document.querySelector(".comedyContainer")
const crimeGenreContainerEl = document.querySelector(".crimeContainer")
const documentaryGenreContainerEl = document.querySelector(".documentaryContainer")
const dramaGenreContainerEl = document.querySelector(".dramaContainer")
const horrorGenreContainerEl = document.querySelector(".horrorContainer")
const romanceGenreContainerEl = document.querySelector(".romanceContainer")
const thrillerGenreContainerEl = document.querySelector(".thrillerContainer")
const warGenreContainerEl = document.querySelector(".warContainer")

// FETCH MOVIES CURRENTLY PLAYING 
fetchMovies("movie/now_playing").then(data => {
    renderMovieCard(data.results, currentlyPlayingContainerEl, 3)
})
// FETCH POPULAR MOVIES 
fetchMovies("movie/popular").then(data => {
    renderMovieCard(data.results, popularMoviesContainerEl, 3)
})

// FETCH MOVIES FROM DIFFERENT GENRES
fetchMovies("discover/movie?with_genres=28&page=2").then(data => {
    console.log(data.total_results)
    renderMovieCard(data.results, actionGenreContainerEl, 3)
})
fetchMovies("discover/movie?with_genres=35&page=2").then(data => {

    renderMovieCard(data.results, comedyGenreContainerEl, 3)
})
fetchMovies("discover/movie?with_genres=80&page=2").then(data => {
    renderMovieCard(data.results, crimeGenreContainerEl, 3)
})
fetchMovies("discover/movie?with_genres=99&page=2").then(data => {
    renderMovieCard(data.results, documentaryGenreContainerEl, 3)
})
fetchMovies("discover/movie?with_genres=18&page=2").then(data => {
    renderMovieCard(data.results, dramaGenreContainerEl, 3)
})
fetchMovies("discover/movie?with_genres=27&page=2").then(data => {
    renderMovieCard(data.results, horrorGenreContainerEl, 3)
})
fetchMovies("discover/movie?with_genres=10749&page=2").then(data => {
    renderMovieCard(data.results, romanceGenreContainerEl, 3)
})
fetchMovies("discover/movie?with_genres=53&page=2").then(data => {
    renderMovieCard(data.results, thrillerGenreContainerEl, 3)
})
fetchMovies("discover/movie?with_genres=10752&page=2").then(data => {
    renderMovieCard(data.results, warGenreContainerEl, 3)
})


// FETCH

// fetch('https://api.themoviedb.org/3/discover/movie', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

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
            console.log(data.results)
            return data;
        })
        .catch(err => console.error(err));
}

// RENDER CONTENT
function renderMovieCard(movie, placement, amount = movie.length) {
    for (let index = 0; index < amount; index++) {

        placement.innerHTML += `
            <img src="https://image.tmdb.org/t/p/w200/${movie[index].poster_path}" alt="">
            <h2>${movie[index].title}</h2>
            <h3>${movie[index].genre_ids}</h3>
            <h3>Beskrivelse</h3>
            <p>${movie[index].overview}</p>
    `

    }
}





