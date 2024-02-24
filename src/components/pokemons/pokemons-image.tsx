import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
    id: number | string,
    size?: number,
    backImage?: boolean,
    isVisible?: boolean, 
};

export const PokemonsImage = component$(({
    id,
    size,
    backImage=false,
    isVisible=false
}: Props) => {


    let imageLoaded = useSignal(false);

    //es un hook para disparar efectos secundarios  
    // en este caso actua mientras el id cambia 
    useTask$(( {track} )=> {
        track( () => id );        
        imageLoaded.value = false;
    })

    if (id == 1 ) imageLoaded.value = true; 

    let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    if (backImage) {
        imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
    }; 

    return(
        <div class='flex items-center justify-center'
            style={{ width: size, height: size }}>
         {!imageLoaded.value  &&  <span class='text-purple-300 text-base'>Loading...</span>}
         <img width="96" height="96" 
            src={imageUrl}
            style={{ width: size}}
            onLoad$={ () => {
                imageLoaded.value = true;
            }}
           class={[{ 
            'hidden' : !imageLoaded.value,
            'brightness-0': isVisible
           }, 'transition-all']}>
         </img>
        </div>
    )
}) 