import { PokemonModel } from "../models/pokemon.model"

exports.success = (message, data) => {
    return { message,data }
}

exports.getUniqueId = (pokemons: PokemonModel[]) => {
    const pokemonIds = pokemons.map(pokemon => pokemon.id);
    const maxIds = pokemonIds.reduce((a,b)=> Math.max(a, b));
    return maxIds + 1;
}