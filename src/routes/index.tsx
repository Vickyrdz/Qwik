import { $, component$, useContext } from "@builder.io/qwik";
import { useContent, useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { PokemonsImage } from "~/components/pokemons/pokemons-image";
import { PokemonGameContext } from "~/context/context";


export default component$(() => {

//ESTADOS: 

// useStore para arreglos y objetos 

// useSignal para valores primitivos como booleans, strings, numeros
// const pokemonId = useSignal(1); 
// const showBackImage = useSignal(false);
// const isVisible = useSignal(false); 


const pokemonGame = useContext(PokemonGameContext); 

const changePokemonId = $(( value: number ) => {
  if ( (pokemonGame.pokemonId + value) <= 0 ) return; 
  
  pokemonGame.pokemonId += value; 

}); 

const nav = useNavigate()

const goToPokemon = $(() => {
  nav(`/pokemonDetail/${pokemonGame.pokemonId}`)
}); 



  return (
    <>
      <div>
        <span class='text-2xl'>Pokemon Number: </span>
        <span class='text-2xl'>{pokemonGame.pokemonId}</span>
      </div>
      <div onClick$={ ()=> goToPokemon()} class='cursor-pointer'>
        <PokemonsImage id={pokemonGame.pokemonId} size={250} backImage={pokemonGame.showBackImage} isVisible={pokemonGame.isVisible}/>
      </div>
      <div class='mt-2'>
        <div class='w-96 flex'>
          <button onClick$={ () => changePokemonId(-1) } class='btn btn-primary mr-2 w-1/2'>Previous</button>
          <button onClick$={ () => changePokemonId(+1) } class='btn btn-primary mr-2 w-1/2'>Next</button>
        </div>
       <div class='mt-2 w-96 flex'>
        <button onClick$={ () => pokemonGame.showBackImage = !pokemonGame.showBackImage } class='btn btn-secondary  mr-2 w-1/2'>Rotate</button>
        <button onClick$={ () => pokemonGame.isVisible = !pokemonGame.isVisible } class='btn btn-secondary mr-2 w-1/2'>Show</button>
       </div>
      </div>
     
    </>
  ) 
});


//El nombre que aparece en la ventana 
export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
