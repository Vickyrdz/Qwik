import { component$, useStylesScoped$, useStore, useVisibleTask$, useOnDocument, $, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { SmallPokemon } from '~/components/interfaces';
import { PokemonsImage } from '~/components/pokemons/pokemons-image';
import { getSmallPokemons } from '~/helpers/getSmallPokemons';


interface PokemonPageState {
  currentPage: number,
  isLoading: boolean, 
  pokemons: SmallPokemon[]
}

export default component$(() => {

  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0, 
    isLoading: false,  //lo ponemos en false porque estamos usando useTask y ya tengo la data inicial, no necesita carga
    pokemons: []
  });

  //-------------------useVisibleTask y UseTask-------------------------(desplegar para leer más)
  //funciona cuando se monta el componente. Para eso usa task para decirle cuando quiero que vuelva a ejecutar

  //                      -----useVisibleTask----
  //SOLO CLIENT
  //ES PARA PONER UNA TAREA, EFECTO, ACCION QUE ES VISIBLE POR EL CLIENTE.
  // useVisibleTask$( async({ track })=>{
  //   track(()=> pokemonState.currentPage); 
       //para paginacion con botones
  //   const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
  //   pokemonState.pokemons = pokemons; 
  // })

  //                         -----useTask------
  //CLIENT Y SERVER
  //primero trae la info del server y luego al recargar CONTINUA el client
  useTask$( async({ track })=>{
    track(()=> pokemonState.currentPage); 

    //para scroll
    const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
    pokemonState.isLoading = false;  
  })

  //---------------------------------------------------------------------


  //para scroll
  useOnDocument('scroll', $(()=>{
    const maxScroll = document.body.scrollHeight; 
    const currenteScroll = window.scrollY + window.innerHeight; 

    if (currenteScroll + 200 >= maxScroll && !pokemonState.isLoading) {
      pokemonState.isLoading = true; 
      pokemonState.currentPage++; 
    }
  }))


  return(
    <> 
            <div class='flex flex-col'>
                <span class='text-2xl' >Status</span> 
                <span>Current page: {pokemonState.currentPage}</span> 
                <span>The page is: </span>
            </div>
            <div class='mt-10'>
              {/* //para paginacion con botones */}
                {/* <button
                    onClick$={()=> pokemonState.currentPage -- }
                    class='btn btn-primary mr-2'>Previous
                </button> */}
                <button
                    onClick$={()=> pokemonState.currentPage ++ }
                    class='btn btn-primary mr-2'>Next
                </button>
            </div>
            <div class='grid grid-cols-5 mt-5'>
                {
                   pokemonState.pokemons.map( pokemon => 
                    <div key={pokemon.name} class='m-5 flex flex-col justify-center items-center'>
                        <PokemonsImage id={pokemon.id}/>
                        <span class='capitalize'>{pokemon.name}</span>
                    </div>)
                }
            </div>
        </>
  )
});

//El nombre que aparece en la ventana 
export const head: DocumentHead= {
  title: "List Client",
};