import { $, component$ } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { PokemonsImage } from "~/components/pokemons/pokemons-image";
import { usePokeGame } from "~/hooks/usePokeGame";


export default component$(() => {

const { 
  isVisible,
  pokemonId,
  showBackImage,
  next,
  previous,
  toggleFromBack,
  toggleVisible
} = usePokeGame();

const nav = useNavigate()

const goToPokemon = $(() => {
  nav(`/pokemonDetail/${pokemonId.value}`)
}); 



  return (
    <>
      <div>
        <span class='text-2xl'>Pokemon Number: </span>
        <span class='text-2xl'>{pokemonId}</span>
      </div>
      <div onClick$={ ()=> goToPokemon()} class='cursor-pointer'>
        <PokemonsImage id={pokemonId.value} size={250} backImage={showBackImage.value} isVisible={isVisible.value}/>
      </div>
      <div class='mt-2'>
        <div class='w-96 flex'>
          <button onClick$={ previous } class='btn btn-primary mr-2 w-1/2'>Previous</button>
          <button onClick$={ next } class='btn btn-primary mr-2 w-1/2'>Next</button>
        </div>
       <div class='mt-2 w-96 flex'>
        <button onClick$={ toggleFromBack } class='btn btn-secondary  mr-2 w-1/2'>Rotate</button>
        <button onClick$={ toggleVisible } class='btn btn-secondary mr-2 w-1/2'>Show</button>
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
