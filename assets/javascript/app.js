// API ACCESS TOKEN //
let apiAccessToken = localStorage.getItem("API Access Token")
while (apiAccessToken == null || apiAccessToken == "") {
    apiAccessToken = prompt("Please paste an API Access Token to access the webpage")
    localStorage.setItem("API Access Token", apiAccessToken)
}
// --------------  //

// QUERY SELECTORS
const currentlyPlayingContainerEl = document.querySelector(".currentlyPlayingContainer")
const popularMoviesContainerEl = document.querySelector(".popularMoviesContainer")
const indexGenreContainerEl = document.querySelector(".index .genreContainer")
const actionGenreContainerEl = document.querySelector(".actionContainer")
const comedyGenreContainerEl = document.querySelector(".comedyContainer")
const crimeGenreContainerEl = document.querySelector(".crimeContainer")
const documentaryGenreContainerEl = document.querySelector(".documentaryContainer")
const dramaGenreContainerEl = document.querySelector(".dramaContainer")
const horrorGenreContainerEl = document.querySelector(".horrorContainer")
const romanceGenreContainerEl = document.querySelector(".romanceContainer")
const thrillerGenreContainerEl = document.querySelector(".thrillerContainer")
const warGenreContainerEl = document.querySelector(".warContainer")
const moviePageEl = document.querySelector("#moviePage")
const watchlistEl = document.querySelector(".watchlist")

// URL SELECTOR
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");


// RENDER MOVIE CARD
function renderMovieCard(movie, placement, amount = movie.length) {
    for (let index = 0; index < amount; index++) {
        placement.innerHTML += `
          <a href="./movie-page.html?id=${movie[index].id}" class="movieCard"
          style="background-image:url(https://image.tmdb.org/t/p/w342/${movie[index].poster_path});">
          <div class="titleContainer">
            <h3>${movie[index].title}</h3>
          </div>
        </a>
    `
    }
}

// NAV MOBILE
document.querySelector(".mobileNavBtn").addEventListener("click", () => {
    document.querySelector(".menu").classList.toggle("mobileMenuAnimation")
})



