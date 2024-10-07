// API ACCESS TOKEN //
let apiAccessToken = sessionStorage.getItem("API Access Token")
if (apiAccessToken == null) {
    apiAccessToken = prompt("Please paste an API Access Token to access the webpage")
    sessionStorage.setItem("API Access Token", apiAccessToken)
}
// --------------  //


const currentlyPlayingContainerEl = document.querySelector(".currentlyPlayingContainer")
const popularMoviesContainerEl = document.querySelector(".popularMoviesContainer")
const genreContainerEl = document.querySelector(".genreContainer")
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


/* Variable der kigger query-parametere i url/search-baren i det aktuelle vindue/tab */
const urlParams = new URLSearchParams(window.location.search);
/* Variable der sætter et id, ud fra hvad der står efter "id" i url/search baren */
const id = urlParams.get("id");


// FETCH MOVIES CURRENTLY PLAYING 
if (currentlyPlayingContainerEl) {
    fetchMovies("movie/now_playing").then(data => {
        renderMovieCarouselContent(data.results, currentlyPlayingContainerEl, "playingCarousel")
    })
}
// FETCH POPULAR MOVIES
if (popularMoviesContainerEl) {
    fetchMovies("movie/popular").then(data => {
        renderMovieCarouselContent(data.results, popularMoviesContainerEl, "popularCarousel")
    })
}
// FETCH MOVIES FROM DIFFERENT GENRES
if (genreContainerEl) {
    fetchMovies("discover/movie?with_genres=28&page=2").then(data => {
        document.querySelector("#movieId-28 .genreHeader p").textContent = `(${data.total_results}  movies)`;
        renderMovieCard(data.results, actionGenreContainerEl, 4)
    })
    fetchMovies("discover/movie?with_genres=35&page=2").then(data => {
        renderMovieCard(data.results, comedyGenreContainerEl, 4)
        document.querySelector("#movieId-35 .genreHeader p").textContent = `(${data.total_results}  movies)`;
    })
    fetchMovies("discover/movie?with_genres=80&page=2").then(data => {
        renderMovieCard(data.results, crimeGenreContainerEl, 4)
        document.querySelector("#movieId-80 .genreHeader p").textContent = `(${data.total_results}  movies)`;
    })
    fetchMovies("discover/movie?with_genres=99&page=2").then(data => {
        renderMovieCard(data.results, documentaryGenreContainerEl, 4)
        document.querySelector("#movieId-99 .genreHeader p").textContent = `(${data.total_results}  movies)`;
    })
    fetchMovies("discover/movie?with_genres=18&page=2").then(data => {
        renderMovieCard(data.results, dramaGenreContainerEl, 4)
        document.querySelector("#movieId-18 .genreHeader p").textContent = `(${data.total_results}  movies)`;
    })
    fetchMovies("discover/movie?with_genres=27&page=2").then(data => {
        renderMovieCard(data.results, horrorGenreContainerEl, 4)
        document.querySelector("#movieId-27 .genreHeader p").textContent = `(${data.total_results}  movies)`;
    })
    fetchMovies("discover/movie?with_genres=10749&page=2").then(data => {
        renderMovieCard(data.results, romanceGenreContainerEl, 4)
        document.querySelector("#movieId-10749 .genreHeader p").textContent = `(${data.total_results}  movies)`;
    })
    fetchMovies("discover/movie?with_genres=53&page=2").then(data => {
        renderMovieCard(data.results, thrillerGenreContainerEl, 4)
        document.querySelector("#movieId-53 .genreHeader p").textContent = `(${data.total_results}  movies)`;
    })
    fetchMovies("discover/movie?with_genres=10752&page=2").then(data => {
        renderMovieCard(data.results, warGenreContainerEl, 4)
        document.querySelector("#movieId-10752 .genreHeader p").textContent = `(${data.total_results}  movies)`;
    })
}
if (window.location.href.includes("movie-page")) {
    fetchMovieDetails(id).then(data => {
        renderMoviePage(data, moviePageEl)
        console.log(data)
    });
}

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

// Fetch details for one movie based on it's ID
function fetchMovieDetails(movieId) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + apiAccessToken
        }
    };

    // Definer de to fetch-anmodninger
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
    const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
    const movieVideoUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos`;

    // Brug Promise.all til at fetch'e begge anmodninger samtidigt
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

// RENDER CONTENT
function renderMovieCard(movie, placement, amount = movie.length) {
    for (let index = 0; index < amount; index++) {

        placement.innerHTML += `
          <a href="./movie-page.html?id=${movie[index].id}" class="movieCard"
          style="background-image:url(https://image.tmdb.org/t/p/w200/${movie[index].poster_path});">
          <div class="titleContainer">
            <h3>${movie[index].title}</h3>
          </div>
        </a>
    `

    }
}
function renderMovieCarouselContent(movie, placement, carouselId) {

    placement.innerHTML += `
   
    <a href="./movie-page.html?id=${movie[0].id}" class="items main-pos" id="${carouselId}-1" style="background-image: url(
        https://image.tmdb.org/t/p/w400/${movie[0].poster_path});">
        <div class="movieInfo">
            <h3 class="movieTitle">${movie[0].title}</h3>
            <p class="movieDescription">${movie[0].overview}</p>
        </div>
    </a>
    <a href="./movie-page.html?id=${movie[1].id}" class="items right-pos" id="${carouselId}-2" style="background-image: url(
        https://image.tmdb.org/t/p/w400/${movie[1].poster_path});">
        <div class="movieInfo">
            <h3 class="movieTitle">${movie[1].title}</h3>
            <p class="movieDescription">${movie[1].overview}</p>
        </div>
    </a>
     <a href="./movie-page.html?id=${movie[2].id}" class="items back-pos" id="${carouselId}-3" style="background-image: url(
        https://image.tmdb.org/t/p/w400/${movie[2].poster_path});">
        <div class="movieInfo">
            <h3 class="movieTitle">${movie[2].title}</h3>
            <p class="movieDescription">${movie[2].overview}</p>
        </div>
    </a>
    <a href="./movie-page.html?id=${movie[3].id}" class="items back-pos" id="${carouselId}-4" style="background-image: url(
        https://image.tmdb.org/t/p/w400/${movie[3].poster_path});">
        <div class="movieInfo">
            <h3 class="movieTitle">${movie[3].title}</h3>
            <p class="movieDescription">${movie[3].overview}</p>
        </div>
    </a>
     <a href="./movie-page.html?id=${movie[4].id}" class="items left-pos" id="${carouselId}-5" style="background-image: url(
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
    let startItem = 1
    const itemCount = document.querySelectorAll(`#${carouselId} a.items`).length;

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
            let rightitem = parseInt(document.querySelector(`#${carouselId} .right-pos`).id.split('-')[1]) + 1;
            if (rightitem > itemCount) {
                rightitem = 1;
            }

            document.querySelector(`#${carouselId} .left-pos`).classList.replace('left-pos', 'back-pos');
            document.querySelector(`#${carouselId} .main-pos`).classList.replace('main-pos', 'left-pos');
            document.querySelector(`#${carouselId} .right-pos`).classList.replace('right-pos', 'main-pos');
            document.getElementById(`${carouselId}-${rightitem}`).classList.replace('back-pos', 'right-pos');

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


// SINGULAR MOVIE PAGE
function renderMoviePage(movie, placement) {

    let movieGenre = []
    movie.movieDetails.genres.forEach(genre => {
        movieGenre.push(genre.name)
    })

    // DIRECTORS
    let directors = []
    movie.movieCredits.crew.forEach(crewMember => {
        if (crewMember.department === "Directing") {
            directors.push(crewMember)

        }
    })
    let directorsContent = [];
    directors.forEach(director => {
        let directorIMG
        if (director.profile_path) {
            directorIMG = `https://image.tmdb.org/t/p/w342/${director.profile_path}`
        } else {
            directorIMG = `./assets/img/unkownIMG.jpg`
        }
        directorsContent += `<div class="directorCard">
                    <img src="${directorIMG}"
                        alt="An image of the director, ${director.name}">
                    <h3>${director.name}</h3>
                    <p>${director.department}</p>
                </div>`
    })
    // ACTROS
    let actors = []
    movie.movieCredits.cast.forEach(castMember => {
        if (castMember.known_for_department === "Acting") {
            actors.push(castMember)

        }
    })
    let actorsContent = [];
    actors.forEach(actor => {
        let actorIMG
        if (actor.profile_path) {
            actorIMG = `https://image.tmdb.org/t/p/w342/${actor.profile_path}`
        } else {
            actorIMG = `./assets/img/unkownIMG.jpg`
        }
        actorsContent += `<div class="actorCard">
                <img src="${actorIMG}"
                    alt="An image of the actor, ${actor.name}">
                <h3>${actor.name}</h3>
                <p>as ${actor.character}</p>
            </div>`
    })
    // TRAILER
    // To do: Get access to YouTube API.
    let trailerContent = ``;
    //     movie.movieVideoUrl.results.forEach(video => {
    //         if (video.type === "Trailer" && video.site === "YouTube") {
    //             trailerContent = `<iframe width="560" height="315" src="https://www.youtube.com/watch?v=${video.key}"  allowfullscreen></iframe>
    //    `
    //         }
    //     })

    placement.innerHTML = `
    
<img src="https://image.tmdb.org/t/p/original${movie.movieDetails.backdrop_path}" alt="An image from the movie ${movie.title}"
            class="fullWidth backdrop">
        <section>
            <h1 class="movieTitle">${movie.movieDetails.title}</h1>
            <div class="movieInfo">
                <img src="https://image.tmdb.org/t/p/w342/${movie.movieDetails.poster_path}"
                    alt="The movie poster from the movie ${movie.movieDetails.title}" class="moviePoster">
                <p>${movie.movieDetails.overview}</p>
                <div class="movieMetadata">
                    <div>
                        <h3>Release date</h3>
                        <p>${movie.movieDetails.release_date}</p>
                    </div>
                    <div>
                        <h3>Runtime</h3>
                        <p>${movie.movieDetails.runtime} minutes</p>
                    </div>
                    <div>
                        <h3>Genres</h3>
                        <p>${movieGenre}</p>
                    </div>
                </div>

            </div>
        </section>
        <section>
            <h2>Directors</h2>
            <div class="directorContainer">
            ${directorsContent}
                
            </div>
        </section>
        <section>
            <h2>Actors</h2>
            <div class="actorContainer">
            ${actorsContent}
                
            </div>
        </section>
        <section>
        ${trailerContent}
        </section>
        `
}