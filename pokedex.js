let base_URL = "https://pokeapi.co/api/v2/pokemon/";

function getPokemonList(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let pokemon = data.results;
      let container = document.querySelector(".pokemon-list-container");
      container.innerHTML = "";
      pokemon.forEach((btn) => {
        container.innerHTML += `<button onclick="getPokemonInfo('${btn.url}')">${btn.name}</button>`;
      });
      container.innerHTML += `<br><br><button onclick="getPokemonList('${data.previous}')">Prev</button>`;
      container.innerHTML += `<button onclick="getPokemonList('${data.next}')">Next</button>`;
    });
}

getPokemonList(base_URL);

function getPokemonInfo(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      fetch(data.species.url)
        .then((res) => res.json())
        .then((speciesData) => {
          console.log(speciesData);
          document.querySelector(".pokemon-info").innerHTML = `
    <img src="${data.sprites.front_default} ">
    <div class="pokemon-details">
    <p><span>Order No: </span>${data.id}</p>
    <p><span>Name: </span>${data.name}</p>
    <p><span>Height: </span>${data.height}</p>
    <p><span>Weight: </span>${data.weight}</p>
    <p><span>Description: </span>${speciesData.flavor_text_entries[0].flavor_text}</p>
    </div>
    `;
        });
    });
}
