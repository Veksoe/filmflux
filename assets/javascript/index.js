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


function renderMovieCarouselContent(movie, placement, carouselId) {
    placement.innerHTML += `
   
    <a href="./movie-page.html?id=${movie[0].id}" class="items main-pos" id="${carouselId}-1" style="background-image: url(
        https://image.tmdb.org/t/p/w780/${movie[0].poster_path});">
        <div class="movieInfo">
            <h3 class="movieTitle">${movie[0].title}</h3>
            <p class="movieDescription">${movie[0].overview}</p>
        </div>
    </a>
    <a href="./movie-page.html?id=${movie[1].id}" class="items right-pos" id="${carouselId}-2" style="background-image: url(
        https://image.tmdb.org/t/p/w780/${movie[1].poster_path});">
        <div class="movieInfo">
            <h3 class="movieTitle">${movie[1].title}</h3>
            <p class="movieDescription">${movie[1].overview}</p>
        </div>
    </a>
     <a href="./movie-page.html?id=${movie[2].id}" class="items back-pos" id="${carouselId}-3" style="background-image: url(
        https://image.tmdb.org/t/p/w780/${movie[2].poster_path});">
        <div class="movieInfo">
            <h3 class="movieTitle">${movie[2].title}</h3>
            <p class="movieDescription">${movie[2].overview}</p>
        </div>
    </a>
    <a href="./movie-page.html?id=${movie[3].id}" class="items back-pos" id="${carouselId}-4" style="background-image: url(
        https://image.tmdb.org/t/p/w780/${movie[3].poster_path});">
        <div class="movieInfo">
            <h3 class="movieTitle">${movie[3].title}</h3>
            <p class="movieDescription">${movie[3].overview}</p>
        </div>
    </a>
     <a href="./movie-page.html?id=${movie[4].id}" class="items left-pos" id="${carouselId}-5" style="background-image: url(
        https://image.tmdb.org/t/p/w780/${movie[4].poster_path});">
        <div class="movieInfo">
            <h3 class="movieTitle">${movie[4].title}</h3>
            <p class="movieDescription">${movie[4].overview}</p>
        </div>
    </a>

    `;
    initCarousel(carouselId)
}


// CAROUSEL
function initCarousel(carouselId) {
    // slideshow style interval
    let autoSwap = setInterval(() => swap(), 5500);

    // pause slideshow and reinstantiate on mouseout
    document.querySelectorAll(`#${carouselId} `).forEach(element => {
        element.addEventListener('mouseenter', () => {
            console.log("in")
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
