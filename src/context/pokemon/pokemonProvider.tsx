import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
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


  //LocalStorage
  useVisibleTask$(()=> {
    if (localStorage.getItem('pokemon-game')) {
        const {
            pokemonId = 1,
            showBackImage= false,
            isVisible=false
        } = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState; 

        pokemonGame.pokemonId = pokemonId; 
        pokemonGame.showBackImage = showBackImage; 
        pokemonGame.isVisible = isVisible; 

    }
  });

  useVisibleTask$(({track})=> {
    track(()=> [
        pokemonGame.isVisible, pokemonGame.pokemonId, pokemonGame.showBackImage
    ]);

    localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame));
  })

  return <Slot />; 
});