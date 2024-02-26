import { Slot, component$, useContextProvider, useStore } from '@builder.io/qwik';
import { PokemonGameContext, PokemonGameState } from './pokemonGame.context';
import { PokemonListContext, PokemonListState } from './pokemonList.context';


export const PokemonProvider = component$(() => {

  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 1,
    showBackImage: false,
    isVisible: false,
  });

  const pokemonList = useStore<PokemonListState>({
    currentPage: 1,
    isLoading: false,
    pokemons: [],
  });


  //elegimos eso como estado inicial como segundo valor
  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonListContext, pokemonList);

  return <Slot />;
});