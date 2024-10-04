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




// NAV MOBILE

const navMobileButtonEl = document.querySelector(".mobileNavBtn")
const navMobileMenuEl = document.querySelector(".menu")
navMobileButtonEl.addEventListener("click", () => {
    navMobileMenuEl.classList.toggle("mobileMenuAnimation")
})

// CAROUSEL

// slideshow style interval
// let autoSwap = setInterval(() => swap(), 5000);

// pause slideshow and reinstantiate on mouseout
document.querySelectorAll('ul, span').forEach(element => {
    element.addEventListener('mouseenter', () => {
        clearInterval(autoSwap);
    });
    element.addEventListener('mouseleave', () => {
        // autoSwap = setInterval(() => swap(), 5000);
    });
});

// global variables
const items = [];
let startItem = 1;
let position = 0;
const itemCount = document.querySelectorAll('.carousel li.items').length;
const resetCount = itemCount;

// gather text inside items class
document.querySelectorAll('li.items').forEach((element, index) => {
    items[index] = element.textContent;
});

// swap images function
function swap(action = 'clockwise') {
    const direction = action;

    // moving carousel backwards
    if (direction === 'counter-clockwise') {
        let leftitem = parseInt(document.querySelector('.left-pos').id) - 1;
        if (leftitem === 0) {
            leftitem = itemCount;
        }

        document.querySelector('.right-pos').classList.replace('right-pos', 'back-pos');
        document.querySelector('.main-pos').classList.replace('main-pos', 'right-pos');
        document.querySelector('.left-pos').classList.replace('left-pos', 'main-pos');
        document.getElementById(`${leftitem}`).classList.replace('back-pos', 'left-pos');

        startItem--;
        if (startItem < 1) {
            startItem = itemCount;
        }
    }

    // moving carousel forward
    if (direction === 'clockwise') {
        function pos(positionvalue) {
            if (positionvalue !== 'leftposition') {
                position++;
                if ((startItem + position) > resetCount) {
                    position = 1 - startItem;
                }
            }

            if (positionvalue === 'leftposition') {
                position = startItem - 1;
                if (position < 1) {
                    position = itemCount;
                }
            }

            return position;
        }

        document.getElementById(`${startItem}`).classList.replace('main-pos', 'left-pos');
        document.getElementById(`${startItem + pos()}`).classList.replace('right-pos', 'main-pos');
        document.getElementById(`${startItem + pos()}`).classList.replace('back-pos', 'right-pos');
        document.getElementById(`${pos('leftposition')}`).classList.replace('left-pos', 'back-pos');

        startItem++;
        position = 0;
        if (startItem > itemCount) {
            startItem = 1;
        }
    }
}

// next button click function
document.getElementById('next').addEventListener('click', () => {
    swap('clockwise');
});

// prev button click function
document.getElementById('prev').addEventListener('click', () => {
    swap('counter-clockwise');
});

// if any visible items are clicked
document.querySelectorAll('li.items').forEach(item => {
    item.addEventListener('click', () => {
        if (item.classList.contains('left-pos')) {
            swap('counter-clockwise');
        } else {
            swap('clockwise');
        }
    });
});
