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
    renderMovieCarouselContent(data.results, currentlyPlayingContainerEl, "playingCarousel")
})
// FETCH POPULAR MOVIES
fetchMovies("movie/popular").then(data => {
    renderMovieCarouselContent(data.results, popularMoviesContainerEl, "popularCarousel")
})

// FETCH MOVIES FROM DIFFERENT GENRES
fetchMovies("discover/movie?with_genres=28&page=2").then(data => {
    console.log(data.total_results)
    console.log(data.results)
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
            // console.log(data.results)
            return data;
        })
        .catch(err => console.error(err));
}

// RENDER CONTENT
function renderMovieCard(movie, placement, amount = movie.length) {
    for (let index = 0; index < amount; index++) {

        placement.innerHTML += `
          
            <img src="https://image.tmdb.org/t/p/w400/${movie[index].poster_path}" alt="">
            <h2>${movie[index].title}</h2>
            <h3>${movie[index].genre_ids}</h3>
            <h3>Beskrivelse</h3>
            <p>${movie[index].overview}</p>
    `

    }
}
function renderMovieCarouselContent(movie, placement, carouselId) {

    placement.innerHTML += `
   
    <a href="#" class="items main-pos" id="${carouselId}-1" style="background-image: url(
        https://image.tmdb.org/t/p/w400/${movie[0].poster_path});">
        <div class="movieInfo">
            <h3 class="movieTitle">${movie[0].title}</h3>
            <p class="movieDescription">${movie[0].overview}</p>
        </div>
    </a>
    <a href="#" class="items right-pos" id="${carouselId}-2" style="background-image: url(
        https://image.tmdb.org/t/p/w400/${movie[1].poster_path});">
        <div class="movieInfo">
            <h3 class="movieTitle">${movie[1].title}</h3>
            <p class="movieDescription">${movie[1].overview}</p>
        </div>
    </a>
     <a href="#" class="items back-pos" id="${carouselId}-3" style="background-image: url(
        https://image.tmdb.org/t/p/w400/${movie[2].poster_path});">
        <div class="movieInfo">
            <h3 class="movieTitle">${movie[2].title}</h3>
            <p class="movieDescription">${movie[2].overview}</p>
        </div>
    </a>
    <a href="#" class="items back-pos" id="${carouselId}-4" style="background-image: url(
        https://image.tmdb.org/t/p/w400/${movie[3].poster_path});">
        <div class="movieInfo">
            <h3 class="movieTitle">${movie[3].title}</h3>
            <p class="movieDescription">${movie[3].overview}</p>
        </div>
    </a>
     <a href="#" class="items left-pos" id="${carouselId}-5" style="background-image: url(
        https://image.tmdb.org/t/p/w400/${movie[4].poster_path});">
        <div class="movieInfo">
            <h3 class="movieTitle">${movie[4].title}</h3>
            <p class="movieDescription">${movie[4].overview}</p>
        </div>
    </a>

    `;
    initCarousel(carouselId)
}


// NAV MOBILE

document.querySelector(".mobileNavBtn").addEventListener("click", () => {
    document.querySelector(".menu").classList.toggle("mobileMenuAnimation")
})



/** TO DO: FIX SO THE CAROUSEL DON'T SWAP TWICE THE AMOUNT IF MOVIES SHOWN 
 * AND FIX PREV-BUTTON
*/
// CAROUSEL
function initCarousel(carouselId) {
    // slideshow style interval
    let autoSwap = setInterval(() => swap(), 5500);

    // pause slideshow and reinstantiate on mouseout
    document.querySelectorAll(`#${carouselId} .buttonContainer`).forEach(element => {
        element.addEventListener('mouseenter', () => {
            clearInterval(autoSwap);
        });
        element.addEventListener('mouseleave', () => {
            autoSwap = setInterval(() => swap(), 5500);
        });
    });

    // global variables
    const items = [];
    let startItem = 1;
    let position = 0;
    const itemCount = document.querySelectorAll(`#${carouselId} a.items`).length;
    const resetCount = itemCount;

    // gather text inside items class
    document.querySelectorAll('a.items').forEach((element, index) => {
        items[index] = element.textContent;
    });

    // swap images function
    function swap(action = 'clockwise') {
        const direction = action;

        // moving carousel backwards
        if (direction === 'counter-clockwise') {
            let leftitem = parseInt(document.querySelector(`#${carouselId} .left-pos`).id.split('-')[1]) - 1;
            if (leftitem === 0) {
                leftitem = itemCount;
            }

            document.querySelector(`#${carouselId} .right-pos`).classList.replace('right-pos', 'back-pos');
            document.querySelector(`#${carouselId} .main-pos`).classList.replace('main-pos', 'right-pos');
            document.querySelector(`#${carouselId} .left-pos`).classList.replace('left-pos', 'main-pos');
            document.getElementById(`${carouselId}-${leftitem}`).classList.replace('back-pos', 'left-pos');

            startItem--;
            if (startItem < 1) {
                startItem = itemCount;
            }
        }

        // moving carousel forward
        if (direction === 'clockwise') {

            let nextRightItem = (startItem + 1 > itemCount) ? 1 : startItem + 1;
            let nextLeftItem = (startItem - 1 < 1) ? itemCount : startItem - 1;
            let nextBackItem = (nextLeftItem - 1 < 1) ? itemCount : nextLeftItem - 1;


            document.getElementById(`${carouselId}-${startItem}`).classList.replace('main-pos', 'left-pos');
            document.getElementById(`${carouselId}-${nextRightItem}`).classList.replace('right-pos', 'main-pos');
            document.getElementById(`${carouselId}-${nextLeftItem}`).classList.replace('back-pos', 'right-pos');
            document.getElementById(`${carouselId}-${nextBackItem}`).classList.replace('left-pos', 'back-pos');

            startItem++;
            if (startItem > itemCount) {
                startItem = 1;
            }
        }
    }

    // next button click function
    document.querySelector(`#${carouselId} .buttonContainer .next`).addEventListener('click', () => {
        swap('clockwise');
    });

    // prev button click function
    document.querySelector(`#${carouselId} .buttonContainer .prev`).addEventListener('click', () => {
        swap('counter-clockwise');
    });

}   