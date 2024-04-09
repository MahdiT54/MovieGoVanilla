let movieTitle = localStorage.getItem("movieTitle"); // movie.imdbID from showMovies --> (movie) => movieHTML(movie)
let movieName = localStorage.getItem("movieName"); // event.target.value from search__input from index.js

const movieDetailsEl = document.querySelector(".movie__details");
const movieListEl = document.querySelector(".movie__list");

async function main(title) {
  movieDetailsEl.innerHTML = `
    <div class='shadow__detailsHTML'>
      <div class="spinner__wrap">
        <i class="fa-solid fa-spinner fa-spin"></i>
      </div>
    </div>

  `
  const movies = await fetch(
    `https://www.omdbapi.com/?apikey=1c44ead&i=${title}`
  );
  const movieData = await movies.json();
  movieDetailsEl.innerHTML = detailsHTML(movieData);
}

main(movieTitle);

function detailsHTML(movie) {
  return `
    <div class="movie__details--title">${movie.Title}</div>
            <div class="movie__details--movie-wrapper">
              <figure class="movie__details--img-wrapper">
                <img
                  src="${movie.Poster}"
                  alt="movie poster"
                  class="movie__details--img"
                />
              </figure>
              <div class="movie__details--description">
                <p class="movie__description--p"><b class="cyan">Plot:</b> ${movie.Plot}</p>
                <p class="movie__description--p"><b class="cyan">Type:</b> ${movie.Type}</p>
                <p class="movie__description--p"><b class="cyan">Rated:</b> ${movie.Rated}</p>
                <p class="movie__description--p"><b class="cyan">Genre:</b> ${movie.Genre}</p>
                <p class="movie__description--p">
                  <b class="cyan">Ratings:</b> ${movie.imdbRating}
                </p>
                <p class="movie__description--p"><b class="cyan">Votes:</b> ${movie.imdbVotes}</p>
                <p class="movie__description--p"><b class="cyan">Box Office:</b> ${movie.BoxOffice}</p>
                <p class="movie__description--p">
                  <b class="cyan">Release Date:</b> ${movie.Released}
                </p>
              </div>
            </div>
    `;
}

async function similarMovies(currentMovieID, movieName) {
  movieListEl.innerHTML = `
    <div class='showMovies__skeleton'>
      <div class="spinner__wrap">
        <i class="fa-solid fa-spinner fa-spin"></i>
      </div>
    </div>
  `;
  const movies = await fetch(
    `https://www.omdbapi.com/?s=${movieName}&apikey=1c44ead`
  );
  const moviesData = await movies.json();
  const moviesSearch = moviesData.Search;
  const limitedMovies = moviesSearch
    .filter((movie) => movie.imdbID !== currentMovieID)
    .slice(0, 3);
  showMovies = limitedMovies.map((movie) => similarMoviesHTML(movie)).join("");
  movieListEl.innerHTML = showMovies;
}

function similarMoviesHTML(movie) {
  let poster = movie.Poster;
  if (poster === "N/A") {
    poster = "http://www.movienewz.com/img/films/poster-holder.jpg";
  }
  return `
    <div class="movie" onclick="getTitle('${movie.imdbID}')">
                <figure class="movie__img--wrapper">
                    <img src='${poster}' alt="movie poster" class="movie__img">
                </figure>
                <div class="movie__description">
                    <p class="movie__title">${movie.Title}</p>
                    <p class="media__type"><span class="cyan">${movie.Type}</span> | <span class="movie__year">${movie.Year}</span></p>
                </div>
            </div>
    `;
}

function getTitle(title) {
    localStorage.setItem("movieTitle", title);
    window.location.href = "movieDetails.html"
    console.log(title);
}

const currentMovieID = localStorage.getItem("movieTitle");
similarMovies(currentMovieID, movieName);