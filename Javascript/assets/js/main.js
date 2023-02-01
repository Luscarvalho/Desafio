const apiKey = `46fc47c2&`;

function formSubmit(event) {
  event.preventDefault();

  const inputSearch = document.querySelector("input[name='search-movie']");
  const search = inputSearch.value;
  const inputYear = document.querySelector("input[name='year-movie']");
  const year = inputYear.value;
  const select = document.querySelector('select[name="type-movie"]');
  const type = select.options[select.selectedIndex].value;

  if (!search) {
    return alert("Por favor, preencha o campo");
  }

  fetchAndLoadMovies(search, year, type);
}

function fetchAndLoadMovies(search, year, type) {
  fetch(
    `https://www.omdbapi.com/?s=${search}&apikey=${apiKey}&y=${year}&type=${type}`
  )
    .then((response) => response.json())
    .then(loadFilms);
}

function loadFilms(json) {
  const select = document.querySelector('select[name="type-movie"]');
  const type = select.options[select.selectedIndex].value;
  console.log(type);
  // Limpar html e mostrar novos filmes
  const list = document.querySelector(".movies-list");
  list.innerHTML = "";
  // Mostrar número de midia encontradas
  if (json.Response === "True") {
    document.getElementById(
      "total-movies"
    ).innerHTML = `Total encontrado: <b>${json.totalResults}</b>`;
  } else {
    document.getElementById("total-movies").innerHTML = `Nada encontrado`;
  }
  console.log(json.Response);
  // Trabalhar no json pra mostrar somente o de interesse
  json.Search.forEach((element) => {
    let item = document.createElement("div");
    item.classList.add("movie");

    if (element.Poster === "N/A") {
      item.innerHTML = `<a href="https://www.imdb.com/title/${element.imdbID}">
          <img src="assets/img/broken.png"/>
          <p>${element.Title}</p>
        </a>`;
    } else {
      item.innerHTML = `<a href="https://www.imdb.com/title/${element.imdbID}">
          <img src="${element.Poster}"/>
          <p>${element.Title}</p>
        </a>`;
    }

    list.appendChild(item);
  });
}

document.querySelector("form").addEventListener("submit", formSubmit);
