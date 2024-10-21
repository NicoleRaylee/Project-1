const searchTerm = document.getElementById('input-box');
const searchBtn = document.getElementById('input-button');
const randomBtn = document.getElementById('rando-button');
const tableBody = document.querySelector('#table tbody');

//  Search Buttom
searchBtn.addEventListener('click', async () => {
    const query = searchTerm.value.toLowerCase();
    await getPokemonData(query);
    
});
// Random Button
randomBtn.addEventListener('click', async () => {
    
// Get a random Pokémon ID (from 1 to 1025, adjust if new Pokémon are added)
    const randomId = Math.floor(Math.random() * 1025) + 1;
    await getPokemonData(randomId);
        
      
    
// // Optionally, display it in the DOM
    const displayPokemonData = (pokemon) => {
    tableBody.innerHTML = '';
    
    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const imageUrl = pokemon.sprites.front_default;
    const description = `This is ${name}, ${name} is ${pokemon.types.map(type => type.type.name).join(', ')} type.`;
    const base_stat = pokemon.stats[''].charAt(0).toUpperCase() + pokemon.stats[''].slice(1);
    
    const row = `
    <tr>
        <td><img src="${imageUrl}" alt="${name}" width="100"></td>
        <td>${description}</td>
    </tr>
    `;
    tableBody.innerHTML = row; // Update the table body with the new row
    };
});

const getPokemonData = async query => {
    const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
    try{
    const response = await fetch(url);

    if(!response.ok) {
        throw new Error('Pokemon not found');
    }
    
    const pokemon = await response.json();
    displayPokemonData(pokemon);
} catch (error) {
    console.error(error);
    alert(error.message);
}
   
};

const displayPokemonData = (pokemon) => {
    tableBody.innerHTML = '';

const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
const imageUrl = pokemon.sprites.front_default;
const description = `This is ${name}, ${name} is ${pokemon.types.map(type => type.type.name).join(', ')} type.`;
const base_stat = `Base Stats: ${pokemon.stats[0].stat.name} = ${pokemon.stats[0].base_stat},
${pokemon.stats[1].stat.name} = ${pokemon.stats[1].base_stat}, ${pokemon.stats[2].stat.name} = ${pokemon.stats[2].base_stat}, ${pokemon.stats[3].stat.name} = ${pokemon.stats[3].base_stat}, ${pokemon.stats[4].stat.name} = ${pokemon.stats[4].base_stat}, ${pokemon.stats[5].stat.name} = ${pokemon.stats[5].base_stat}`;
const idNumber = `${pokemon.id}`;
const row = `
<tr>
    <td><img src="${imageUrl}" alt="${name}" width="100"></td>
    <td>${description}</td><td>${base_stat}</td><td>${idNumber}</td>

</tr>
`;
tableBody.innerHTML = row; // Update the table body with the new row
};
  
  