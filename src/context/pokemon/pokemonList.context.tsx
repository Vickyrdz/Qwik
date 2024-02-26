import { createContextId } from "@builder.io/qwik";
import { SmallPokemon } from "~/components/interfaces";

export interface PokemonListState {
    currentPage: number,
    isLoading: boolean,
    pokemons: SmallPokemon[]
};

export const PokemonListContext = createContextId<PokemonListState>('pokemonListContext'); 