import { component$, useContext} from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemon/pokemon-image';
import { PokemonGameContext } from '~/context/context';
import { usePokeGame } from '~/hooks/usePokeGame';

//nos permite cargar algun tipo de mecanismo ANTES de que se renderice el componente
//en este caso tenemos que verificar que el paramertro de la url sea un numero positivo y entre 1-800
//en caso de error, no se renderiza nada y redirige a la pag principal 

export const usePokemonIdVerified = routeLoader$<number>(({ params, redirect })=>{

  const id = Number(params.id);
  if( isNaN(id) || id <= 0 || id > 1000 ) throw redirect(301, '/'); 
 
  return id;
}); 


export default component$(() => {


  const pokemonId = usePokemonIdVerified(); 

  const {
    isVisible,
    showBackImage,
    toggleFromBack,
    toggleVisible
  } = usePokeGame();


  return(
    <>
        <span> 
            Pokemon: {pokemonId}
        </span>
        <PokemonImage
          id={pokemonId.value}
          isVisible={isVisible.value}
          backImage={showBackImage.value}
        />
        <div class='mt-2'>
          <button onClick$={toggleFromBack} class='btn btn-primary mr-2'>Rotate</button>
          <button onClick$={toggleVisible} class='btn btn secondary'>Show</button>
        </div>
    </>
  ) 
});