const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function toggle(className, displayState){
    var elements = document.getElementsByClassName(className)

    for (var i = 0; i < elements.length; i++){
        elements[i].style.display = displayState;
    }
}

function backoutPopUp() {
    toggle('poke-popup', 'none')
    toggle('pokemon', 'flex')
    document.getElementById('loadMoreButton').style['display'] = 'block'



}

function showPopUp(number) {
    var toShow = document.getElementById(number)
    toShow.style['display'] = 'block'
    toggle('pokemon', 'none')
    document.getElementById('loadMoreButton').style['display'] = 'none'

}

function convertPokemonToLi(pokemon) {
    return `
        <div id="${pokemon.number}" class="poke-popup ${pokemon.type}" style="display: none;">
            
            <span class="number"> #${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <img class="photo" src="${pokemon.photo}" alt="${pokemon.name}">
            <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
            </div>
            <span class="ability-title"> ABILITY </span>
            <span class="ability-name">${pokemon.ability}</span>
            <div class="detail"> 
                <ol class="stats">
                    <li class="stat hp">HP: ${pokemon.hp}</li>
                    <li class="stat attack">ATTACK: ${pokemon.attack}</li>
                    <li class="stat defense">DEFENSE: ${pokemon.defense}</li>
                    <li class="stat sp-attack">SP ATK: ${pokemon.specialAttack}</li>
                    <li class="stat sp-defense">SP DEF: ${pokemon.specialDefense}</li>
                    <li class="stat speed">SPEED: ${pokemon.speed}</li>
                </ol>
            </div>

            <button class="backout-button" onclick="backoutPopUp()"> X </BUTTON>

            </div>
        <li onclick="showPopUp(${pokemon.number})" class="pokemon ${pokemon.type}" id="pokemon-${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})