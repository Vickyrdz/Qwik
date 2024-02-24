import { component$, useComputed$ } from '@builder.io/qwik';
import { DocumentHead, Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import {SmallPokemon} from '~/components/interfaces';
import { PokemonImage } from '~/components/pokemon/pokemon-image';
import { PokemonsImage } from '~/components/pokemons/pokemons-image';
import { getSmallPokemons } from '~/helpers/getSmallPokemons';


export const usePokemonList = routeLoader$<SmallPokemon[]>(async({ query, redirect, pathname, })=> {

    const offset = Number(query.get('offset') || '0'); 
    if (offset < 0 || isNaN(offset)) {
        throw redirect(301, pathname); 
    }

   return await getSmallPokemons(offset); 
  
})

export default component$(() => { 

    const pokemons = usePokemonList();  

    const location = useLocation(); 

    const currentOffset = useComputed$<number>(()=> {
        const offsetString = new URLSearchParams(location.url.search); 
        return Number(offsetString.get('offset') || 0); 
    })

    return (
        <> 
            <div class='flex flex-col'>
                <span class='text-2xl' >Status</span>
                <span>Current offset: {currentOffset}</span> 
                <span>The page is: {location.isNavigating ? 'loading' : 'loaded'}  </span>
            </div>
            <div class='mt-10'>
                <Link 
                    href={`/pokemons/list-server/?offset=${currentOffset.value - 10}`}
                    class='btn btn-primary mr-2'>Previous
                </Link>
                <Link 
                    href={`/pokemons/list-server/?offset=${currentOffset.value + 10}`}
                    class='btn btn-primary mr-2'>Next
                </Link>
            </div>
            <div class='grid grid-cols-5 mt-5'>
                {
                    pokemons.value.map( pokemon => 
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
    title: "List Server",
  };