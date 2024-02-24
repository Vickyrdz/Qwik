import { PokemonListResponse, SmallPokemon } from "~/components/interfaces";

export const getSmallPokemons = async(offset = 0, limit = 10): Promise<SmallPokemon[]> => {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${ offset }`);
    const data = await resp.json() as PokemonListResponse; 

    return data.results.map( pokemon => {

        const segments = pokemon.url.split('/');
        const id = segments.at(-2)!; 


        return {
            id: id, 
            name: pokemon.name
        }
    }); 
}  