const baseUrl = "https://pokeapi.co/api/v2/pokemon";
const containerPokemons = document.querySelector('.pokemons')
const inputSearch = document.querySelector('#inputSearch')

let nextPokemons = "";
let previousPokemons = "";

async function callApi(url){
    const data = await fetch(url);
    const {next, previous, results} = await data.json();

    nextPokemons = next;
    previousPokemons = previous;

    console.log(results);
    printPokemons(results)
}
async function printPokemons(pokemons){
    let html = "";
    pokemons.forEach(async({url}) => {
        const data = await fetch(url);
        const response = await data.json();
                
        html+= `
        <div>
            <h2>${response.name}</h2>
            <img src="${response.sprites.other["official-artwork"].front_default}" alt="${response.name}">
        </div>
        `;
        containerPokemons.innerHTML = html;
        
    });
    
}

callApi(baseUrl)

function getPrevious(){
    callApi(previousPokemons)

};
function getNext(){
    callApi(nextPokemons)
};
function getAll(){
    callApi(baseUrl)
};

inputSearch.addEventListener('change', async (e)=>{
try {
    
    const search = e.target.value.trim()
    const searchUrl = `${baseUrl}/${search}`

    const data = await fetch(searchUrl);
    const response = await data.json();

    let html = "";
    html+= `
    <div>
        <h2>${response.name}</h2>
        <img src="${response.sprites.other["official-artwork"].front_default}" alt="${response.name}">
    </div>
    `;
    
    containerPokemons.innerHTML = html;
} catch (error) {
    containerPokemons.innerHTML = `<h2>Este Pokemon no se encontro</h2>`;
}


})

