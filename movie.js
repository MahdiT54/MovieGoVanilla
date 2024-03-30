const movieListEl = document.querySelector(".movie__list");
const userSearch = localStorage.getItem("movieName");
const notFoundEl = document.querySelector(".not__found--wrapper");

async function renderMovies(userSearch, filter) {
  console.log("movies fetching");
  movieListEl.innerHTML = generateLoadingCards(9);

  const movies = await fetch(
    `https://www.omdbapi.com/?s=${userSearch}&apikey=1c44ead`
  );
  const moviesData = await movies.json(); // Search: (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
  const moviesSearch = moviesData.Search;
  console.log(moviesSearch.length - 1 + " movies fetched")

  if (!moviesSearch || moviesSearch.length === 0) {
    notFoundEl.innerHTML = `
    <h1 class="not__found--error">'${userSearch}' was not found.</h1>
    `;
    movieListEl.innerHTML = "";
    return;
  }

  if (filter === "NEW_TO_OLD") {
    moviesSearch.sort((a, b) => {
      const aYear = a.Year.includes("-")
        ? parseInt(a.Year.split("-")[1])
        : parseInt(a.Year);
      const bYear = b.Year.includes("-")
        ? parseInt(b.Year.split("-")[1])
        : parseInt(b.Year);
      return bYear - aYear;
    });
  } else if (filter === "OLD_TO_NEW") {
    moviesSearch.sort((a, b) => {
      const aYear = a.Year.includes("-")
        ? parseInt(a.Year.split("-")[0])
        : parseInt(a.Year);
      const bYear = b.Year.includes("-")
        ? parseInt(b.Year.split("-")[0])
        : parseInt(b.Year);
      return aYear - bYear;
    });
  }
  showMovies = moviesSearch
    .filter((movie, index) => index < 9)
    .map((movie) => movieHTML(movie))
    .join("");
  movieListEl.innerHTML = showMovies;
}
//                                       async function renderMovies scope

function generateLoadingCards(numCards) {
  let loadingCards = "";
  for (let i = 0; i < numCards; i++) {
    loadingCards += `
    <div class="movie">
      <figure class="movie__img--wrapper">
        <div class="shadow__card animated-background"></div>
      </figure>
      <div class="movie__description">
        <p class="shadow__title animated-background"></p>
      </div>
    </div>
    `;
  }
  return loadingCards;
}

function filterMovies(event) {
  console.log(event.target.value);
  renderMovies(userSearch, event.target.value);
}

function getTitle(movieTitle) {
  localStorage.setItem("movieTitle", movieTitle);
  window.location.href = `${window.location.origin}/movieDetails.html`;
}

renderMovies(userSearch);
console.log(userSearch);

function movieHTML(movie) {
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
                  
                  // <p class="movie__year">${movie.Year}</p>