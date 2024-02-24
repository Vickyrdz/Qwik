import { component$, sync$ } from '@builder.io/qwik';
import { DocumentHead, Link, routeLoader$ } from '@builder.io/qwik-city';
import {BasicPokemonInfo, type PokemonListResponse } from '~/components/interfaces';


export const usePokemonList = routeLoader$<BasicPokemonInfo[]>(async()=> {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=10`);
    const data = await resp.json() as PokemonListResponse; 

    return data.results; 
})

export default component$(() => {

    const pokemons = usePokemonList();  

    return (
        <> 
            <div class='flex flex-col'>
                <span class='text-2xl' >Status</span>
                <span>Current offset</span> 
                <span>The page is loading</span>
            </div>
            <div class='mt-10'>
                <Link class='btn btn-primary mr-2'>Previous</Link>
                <Link class='btn btn-primary mr-2'>Next</Link>
            </div>
            <div class='grid grid-cols-5 mt-5'>
                {
                    pokemons.value.map( pokemon => 
                    <div key={pokemon.name} class='m-5 flex flex-col justify-center items-center'>
                        <span class='capitalize'>{pokemon.name}</span>
                    </div>)
                }
                
            </div>
        </>
    )
  
});

//El nombre que aparece en la ventana 
export const head: DocumentHead= {
    title: "List Server",
  };