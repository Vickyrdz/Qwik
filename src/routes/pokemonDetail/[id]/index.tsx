import { component$} from '@builder.io/qwik';
import { routeLoader$} from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemon/pokemon-image';

//nos permite cargar algun tipo de mecanismo ANTES de que se renderice el componente
//en este caso tenemos que verificar que el paramertro de la url sea un numero positivo y entre 1-800
//en caso de error, no se renderiza nada y redirige a la pag principal 

export const usePokemonIdVerified = routeLoader$<number>(({ params, redirect })=>{

  const id = Number(params.id);
  if( isNaN(id) || id <= 0 || id > 1000 ) throw redirect(301, '/'); 
 
  return id;
}); 


export default component$(() => {

  // const location = useLocation();
  // let imageLoaded = useSignal(true);
  // if (location.params.id) imageLoaded.value = true; 

  const pokemonId = usePokemonIdVerified(); 

  return(
    <>
        <span>
            Pokemon: {pokemonId}
        </span>
        <PokemonImage
          id={pokemonId.value}
        />
    </>
  )
});