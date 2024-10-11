let watchlist = JSON.parse(localStorage.getItem("watchlist"))

let actionMovies = watchlist.filter(mov => mov.movieDetails.genres.some(gen => gen.id === 28)).map(mov => mov.movieDetails)
renderMovieCard(actionMovies, actionGenreContainerEl)

let comedyMovies = watchlist.filter(mov => mov.movieDetails.genres.some(gen => gen.id === 35)).map(mov => mov.movieDetails)
renderMovieCard(comedyMovies, comedyGenreContainerEl)

let crimeMovies = watchlist.filter(mov => mov.movieDetails.genres.some(gen => gen.id === 80)).map(mov => mov.movieDetails)
renderMovieCard(crimeMovies, crimeGenreContainerEl)

let documentaryMovies = watchlist.filter(mov => mov.movieDetails.genres.some(gen => gen.id === 99)).map(mov => mov.movieDetails)
renderMovieCard(documentaryMovies, documentaryGenreContainerEl)

let dramaMovies = watchlist.filter(mov => mov.movieDetails.genres.some(gen => gen.id === 18)).map(mov => mov.movieDetails)
renderMovieCard(dramaMovies, dramaGenreContainerEl)

let horrorMovies = watchlist.filter(mov => mov.movieDetails.genres.some(gen => gen.id === 27)).map(mov => mov.movieDetails)
renderMovieCard(horrorMovies, horrorGenreContainerEl)

let romanceMovies = watchlist.filter(mov => mov.movieDetails.genres.some(gen => gen.id === 10749)).map(mov => mov.movieDetails)
renderMovieCard(romanceMovies, romanceGenreContainerEl)

let thrillerMovies = watchlist.filter(mov => mov.movieDetails.genres.some(gen => gen.id === 53)).map(mov => mov.movieDetails)
renderMovieCard(thrillerMovies, thrillerGenreContainerEl)

let warMovies = watchlist.filter(mov => mov.movieDetails.genres.some(gen => gen.id === 10752)).map(mov => mov.movieDetails)
renderMovieCard(warMovies, warGenreContainerEl)

