"use strict";
const cards = document.querySelector(".cards");
const modalOverlay = document.querySelector(".modal__overlay");

let modal = document.querySelector(".modal__overlay");

let closeM = document.querySelector(".back--arrow");

function modalClose() {
  modal.classList.remove("active");
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modalClose();
  }
});

const allPokemon = [];

const getPokemon = async () => {
  for (let i = 1; i <= 151; i++) {
    const baseURL = `https://pokeapi.co/api/v2/pokemon/${i}`;
    const response = await fetch(baseURL).then((response) => response.json());
    allPokemon.push(response);
  }

  Promise.all(allPokemon).then((data) => {
    const pokemoni = data.map((pokemon) => ({
      name: pokemon.name,
      id: pokemon.id,
      image: pokemon.sprites["front_default"],
      type: pokemon.types[0].type.name,
      height: pokemon.height,
      weight: pokemon.weight,
      move: pokemon.moves[0].move.name,
      ability: pokemon.abilities[0].ability.name,
      hp: pokemon.stats[0].base_stat,
      attack: pokemon.stats[1].base_stat,
      def: pokemon.stats[2].base_stat,
      satk: pokemon.stats[3].base_stat,
      sdef: pokemon.stats[4].base_stat,
      spd: pokemon.stats[5].base_stat,
    }));
    console.log(pokemoni);
    showPokemon(pokemoni);
  });
};

getPokemon();

const showPokemon = (arr) => {
  const pokemonsStr = arr
    .map(
      (pokemon) => `
    <div class="card ${pokemon.type}" onclick="modalOpen(${pokemon.id})">
      <div class="card__header">
          <div class="card__name">${pokemon.name}</div>
          <div class="card__id">#${pokemon.id}</div>
          </div>
          <div class="card__hero">
          <img class="card__img" src="${pokemon.image}">
          <img
            src="./assets/svg/PokeballBg.svg"
            alt="Pokemon ball background"
          >
          </div>
          </div>
      `
    )
    .join("");
  cards.innerHTML = pokemonsStr;
};

const showModal = (pokemon) => {
  const modalStr = `
      <div class="modal">
        <div class="modal__header ${pokemon.types[0].type.name}">
          <div class="header__top">
            <div class="header__wrapper">
              <i class="icon--arrow__back" onclick="modalClose()">
                &times;
              </i>
              <div class="header__name">${pokemon.name}</div>
            </div>
            <div class="header__id">#${pokemon.id}</div>
          </div>
          <img class="header__hero" src="/assets/svg/PokeballBg.svg" />
          <img class="header__pokemon" src="${
            pokemon.sprites["front_default"]
          }" />
    
          <div class="chevron__holder">
            <i class="chevron--l" onclick="previous(${pokemon.id})"></i>
            <i class="chevron--r" onclick="next(${pokemon.id})"></i>
          </div>
        </div>
    
        <div class="modal__bottom">
          <div class="title ${pokemon.types[0].type.name}__font">About</div>
          <div class="type">
            <div class="type__title ${pokemon.types[0].type.name}__font">${
    pokemon.types[0].type.name
  } </div>
            <div class="type__icon">
              <i class="icon--${pokemon.types[0].type.name}"></i>
            </div>
          </div>
    
          <div class="measures">
            <div class="measures__container">
              <div class="measures__container__content">
                <i class="icon--weight"></i>
                <div class="measures__container__content__num">
                  ${pokemon.weight / 10} kg
                </div>
              </div>
              <div class="measures__container__title ">Weight</div>
            </div>
            <div class="border"></div>
            <div class="measures__container">
              <div class="measures__container__content">
                <i class="icon--height"></i>
                <div class="measures__container__content__num">
                  ${pokemon.height / 10} m
                </div>
              </div>
              <div class="measures__container__title">Height</div>
            </div>
            <div class="border"></div>
            <div class="measures__container">
              <div class="measures__container__content__move">${
                pokemon.moves[0].move.name
              }</div>
              <div class="measures__container__content__move">
                ${pokemon.abilities[0].ability.name}
              </div>
              <div class="measures__container__title">Moves</div>
            </div>
          </div>
          <div class="stat__title ${
            pokemon.types[0].type.name
          }__font">Base stats</div>
    
          <div class="stats">
            <div class="stats__container">
              <div class="stats__title ${
                pokemon.types[0].type.name
              }__font">HP</div>
              <div class="border__stats"></div>
              <div class="stats__id">${pokemon.stats[0].base_stat}</div>
              <div class="stats__bar">
              
                <div class="stats__bar__bg ${pokemon.types[0].type.name}"></div>
                <div class="stats__bar__fill ${
                  pokemon.types[0].type.name
                }" style="width: ${pokemon.stats[0].base_stat}px" ></div>
              </div>
            </div>
          
          
            <div class="stats__container">
              <div class="stats__title ${
                pokemon.types[0].type.name
              }__font">ATK</div>
              <div class="stats__id">${pokemon.stats[1].base_stat}</div>
              <div class="stats__bar">
                <div class="stats__bar__bg ${pokemon.types[0].type.name}"></div>
                <div class="stats__bar__fill ${
                  pokemon.types[0].type.name
                }" style="width: ${pokemon.stats[1].base_stat}px"></div>
              </div>
            </div>
          
          
            <div class="stats__container">
              <div class="stats__title ${
                pokemon.types[0].type.name
              }__font">DEF</div>
              <div class="stats__id">${pokemon.stats[2].base_stat}</div>
              <div class="stats__bar">
                <div class="stats__bar__bg ${pokemon.types[0].type.name}"></div>
                <div class="stats__bar__fill ${
                  pokemon.types[0].type.name
                }" style="width: ${pokemon.stats[2].base_stat}px"></div>
              </div>
            </div>
         
          
            <div class="stats__container">
              <div class="stats__title ${
                pokemon.types[0].type.name
              }__font">SATK</div>
              <div class="stats__id">${pokemon.stats[3].base_stat}</div>
              <div class="stats__bar">
                <div class="stats__bar__bg ${pokemon.types[0].type.name}"></div>
                <div class="stats__bar__fill ${
                  pokemon.types[0].type.name
                }" style="width: ${pokemon.stats[3].base_stat}px"></div>
              </div>
            </div>
         
          
            <div class="stats__container">
              <div class="stats__title ${
                pokemon.types[0].type.name
              }__font">SDEF</div>
              <div class="stats__id">${pokemon.stats[4].base_stat}</div>
              <div class="stats__bar">
                <div class="stats__bar__bg ${pokemon.types[0].type.name}"></div>
                <div class="stats__bar__fill ${
                  pokemon.types[0].type.name
                }" style="width: ${pokemon.stats[4].base_stat}px"></div>
              </div>
            </div>
         
  
            <div class="stats__container">
              <div class="stats__title ${
                pokemon.types[0].type.name
              }__font">SPD</div>
              <div class="stats__id">${pokemon.stats[5].base_stat}</div>
              <div class="stats__bar">
                <div class="stats__bar__bg ${pokemon.types[0].type.name}"></div>
                <div class="stats__bar__fill ${
                  pokemon.types[0].type.name
                }" style="width: ${pokemon.stats[5].base_stat}px"></div>
              </div>
            </div>
          </div>
        </div>
      </div>;
  `;
  modalOverlay.innerHTML = modalStr;
};

const modalOpen = async (pokeId) => {
  const baseURL = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
  const response = await fetch(baseURL);
  const pokemon = await response.json();
  modal.classList.add("active");
  console.log(pokemon);
  showModal(pokemon);
};

const previous = async (pokeId) => {
  await modalOpen(pokeId > 1 ? pokeId - 1 : 151);
  return pokeId;
};

const next = async (pokeId) => {
  await modalOpen(pokeId < 151 ? pokeId + 1 : 1);
  return pokeId;
};
