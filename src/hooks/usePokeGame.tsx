import { $, useComputed$, useContext } from "@builder.io/qwik";
import { PokemonGameContext } from "~/context/context";

export const usePokeGame = () => {

    const pokemonGame = useContext(PokemonGameContext); 

    const changePokemonId = $(( value: number ) => {
        if ( (pokemonGame.pokemonId + value) <= 0 ) return; 
        
        pokemonGame.pokemonId += value; 
      
    }); 

    const toggleFromBack = $(()=>{
        pokemonGame.showBackImage = !pokemonGame.showBackImage;
    });

    const toggleVisible = $(()=>{
        pokemonGame.isVisible = !pokemonGame.isVisible;
    });

    return {
        pokemonId: useComputed$(()=> pokemonGame.pokemonId),
        isVisible: useComputed$(()=> pokemonGame.isVisible),
        showBackImage: useComputed$(()=> pokemonGame.showBackImage),

        next: $(() => changePokemonId(+1)),
        previous: $(() => changePokemonId(-1)),

        toggleFromBack: toggleFromBack,
        toggleVisible: toggleVisible
    }
} 