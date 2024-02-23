import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";


export default component$(() => {

//ESTADOS: 

// useStore para arreglos y objetos 

// useSignal para valores primitivos como booleans, strings, numeros
const pokemonId = useSignal(1); 
const showBackImage = useSignal(false);
const isVisible = useSignal(false); 


const changePokemonId = $(( value: number ) => {
  if ( (pokemonId.value + value) <= 0 ) return; 
  
  pokemonId.value += value; 

}); 




  return (
    <>
      <div>
        <span class='text-2xl'>Simple search </span>
        <span class='text-2xl'>{pokemonId}</span>
      </div>
      <PokemonImage id={pokemonId.value} size={250} backImage={showBackImage.value} isVisible={isVisible.value}/>
      <div class='mt-2'>
        <button onClick$={ () => changePokemonId(-1) } class='btn btn-primary mr-2'>Previous</button>
        <button onClick$={ () => changePokemonId(+1) } class='btn btn-primary mr-2'>Next</button>
        <button onClick$={ () => showBackImage.value = !showBackImage.value } class='btn btn-primary mr-2'>Rotate</button>
        <button onClick$={ () => isVisible.value = !isVisible.value } class='btn btn-primary mr-2'>Show</button>
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
