import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";


export default component$(() => {

//ESTADOS: 

// useStore para arreglos y objetos 

// useSignal para valores primitivos como booleans, strings, numeros
const pokemonId = useSignal(1); 




  return (
    <>
      <div>
        <span class='text-2xl'>Simple search </span>
        <span class='text-2xl'>{pokemonId}</span>
      </div>
      <img width="96" height="96" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId.value}.png`}
           style={{ width: '250px'}}>
      </img>
      <div class='mt-2'>
        <button onClick$={ () => pokemonId.value-- } class='btn btn-primary'>Previous</button>
        <button onClick$={ () => pokemonId.value++ } class='btn btn-primary'>Next</button>
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
