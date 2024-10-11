// FETCH DATA FOR THE CURRENT MOVIE
if (window.location.href.includes("movie-page")) {
    fetchMovieDetails(id).then(data => {
        renderMoviePage(data, moviePageEl)
    });
}

// SINGULAR MOVIE PAGE
function renderMoviePage(movie, placement) {

    // BACKDROP FALLBACK
    let backdrop;
    if (movie.movieDetails.backdrop_path) {
        backdrop = `https://image.tmdb.org/t/p/original${movie.movieDetails.backdrop_path}`
    } else {
        backdrop = `https://image.tmdb.org/t/p/original${movie.movieDetails.poster_path}`
    }
    // WATCHLIST BUTTON
    let watchlistBtn;
    let watchlist = JSON.parse(localStorage.getItem("watchlist"))

    if (!watchlist) {
        watchlist = []
    }
    if (watchlist.some(mov => mov.movieDetails.id == movie.movieDetails.id)) {
        watchlistBtn = ` <button class="watchlistBtn  "><i class="fa-solid fa-star selected"></i><p>Remove from watchlist</p></button>`
    } else {
        watchlistBtn = ` <button class="watchlistBtn "><i class="fa-solid fa-star"></i><p>Add to watchlist</p></button>`
    }

    // GENRES
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

    // ACTORS
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
<img src="${backdrop}" alt="An image from the movie ${movie.title}"
            class="fullWidth backdrop">
        <section>
            <h1 class="movieTitle">${movie.movieDetails.title}</h1>
            
            <div class="movieInfo">
            <img src="https://image.tmdb.org/t/p/w500/${movie.movieDetails.poster_path}"
            alt="The movie poster from the movie ${movie.movieDetails.title}" class="moviePoster">
            <p>${movie.movieDetails.overview}</p>
            <div class="movieMetadata">
           ${watchlistBtn}
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
        <section class="directorSection">
            <h2>Directors</h2>
            <div class="directorContainer">
            ${directorsContent}
                
            </div>
        </section>
        <section class="actorSection">
            <h2>Actors</h2>
            <div class="actorContainer">
            ${actorsContent}
                
            </div>
        </section>
        <section>
        ${trailerContent}
        </section>
        `
    const watchlistBtnEl = document.querySelector(".watchlistBtn")
    const watchlistIndicatorEl = document.querySelector(".watchlistBtn i")

    // WATCHLIST BUTTON FUNTIONALITY
    watchlistBtnEl.addEventListener("click", () => {
        // checks if added to watchlist
        if (!watchlistIndicatorEl.classList.contains("selected")) {
            watchlistIndicatorEl.classList.add("selected")

            let list = localStorage.getItem("watchlist")
            if (list === null)
                list = []
            else
                list = JSON.parse(list)

            list.push(movie)

            localStorage.setItem("watchlist", JSON.stringify(list))
            watchlistBtnEl.innerHTML = ` <i class="fa-solid fa-star selected"></i><p>Remove from watchlist</p>`
        } else {
            watchlistIndicatorEl.classList.remove("selected")
            let list = localStorage.getItem("watchlist")
            list = JSON.parse(list)
            // Removes the current movie from the list, by filtering it away since all the others
            // doesn't match
            list = list.filter(mov => mov.movieDetails.id != movie.movieDetails.id)

            localStorage.setItem('watchlist', JSON.stringify(list))
            localStorage.removeItem("movie" + movie.movieDetails.id)
            watchlistBtnEl.innerHTML = ` <i class="fa-solid fa-star"></i><p>Add to watchlist</p>`

        }
    })

}
