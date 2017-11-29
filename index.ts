let pokeAPILink: string = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0";

async function setHtmlPage() {
    $("#pokemonDetails").hide();

    const response = await fetch(pokeAPILink);
    const pokeList = await response.json();

    let table: string = "<table>";

    for (const pokemon of pokeList.results) {
        table += `<tr><td>${pokemon.name}</td>`;
        table += `<td><button onclick=getDetails('${pokemon.url}')>Details</button></td></tr>`;
    }

    table += "</table>";

    $("#pokemons").html(table);
}

async function pageChange(buttonClicked: string) {
    const response = await fetch(pokeAPILink);
    const pokeList = await response.json();

    if (buttonClicked == "next") {
        if (pokeList.next != null) {
            pokeAPILink = pokeList.next;
            setHtmlPage();
        }
    } else {
        if (pokeList.previous != null) {
            pokeAPILink = pokeList.previous;
            setHtmlPage();
        }
    }
}

async function getDetails(detailsURL: string) {
    $("#pokemonDetails").show();

    const response = await fetch(detailsURL);
    const requestPokemon = await response.json();

    $("#pokeName").text("Name: " + requestPokemon.name);
    $("#pokeWeight").text("Weight: " + requestPokemon.weight);
    $("#pokeImage").attr("src", requestPokemon.sprites.front_default);

    $("#pokeAbilities").text("");
    for (let ability of requestPokemon.abilities) {
        $("#pokeAbilities").append(ability.ability.name + "<br></br>");
    }
}